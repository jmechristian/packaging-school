import {
  getAWSUser,
  createAWSUser,
  createNewUserXp,
  updateAWSUser,
  updateLastLogin,
} from './api';
import { getUserLevel } from './api';

class AuthService {
  constructor() {
    this.setupPromise = null;
    this.userData = null;
  }

  // Centralized user setup - only runs once per session
  async setupUser(auth0User) {
    // If setup is already in progress, return the existing promise
    if (this.setupPromise) {
      return this.setupPromise;
    }

    // If we already have user data, return it
    if (this.userData) {
      return this.userData;
    }

    console.log('AuthService: Starting user setup for', auth0User.email);

    this.setupPromise = this._performSetup(auth0User);

    try {
      this.userData = await this.setupPromise;
      return this.userData;
    } catch (error) {
      console.error('AuthService: Setup failed', error);
      this.setupPromise = null; // Reset on error
      throw error;
    }
  }

  async _performSetup(auth0User) {
    const email = auth0User.email;

    // Step 1: Get or create AWS user
    let awsUser = await this._getOrCreateAWSUser(auth0User);

    // Step 2: Get Thinkific user (with retry logic)
    let thinkificUser = await this._getThinkificUserWithRetry(email);

    // Step 3: Update user XP and level
    await this._updateUserStats(awsUser, thinkificUser);

    return {
      awsUser,
      thinkificUser,
      setupComplete: true,
    };
  }

  async _getOrCreateAWSUser(auth0User) {
    try {
      let awsUser = await getAWSUser(auth0User.email);

      if (!awsUser) {
        console.log('AuthService: Creating new AWS user');
        const newUser = await createAWSUser({
          email: auth0User.email,
          name: auth0User.name || '',
          lastLogin: new Date().toISOString(),
        });

        const newUserXp = await createNewUserXp(newUser.id, newUser.lastLogin);
        await updateAWSUser({
          id: newUser.id,
          userUserXpId: newUserXp.id,
        });

        awsUser = { ...newUser, userXp: newUserXp };
      } else if (awsUser && !awsUser.userUserXpId) {
        console.log('AuthService: Found existing AWS user but no userUserXpId');
        // Create new userXp
        const newUserXp = await createNewUserXp(awsUser.id, awsUser.lastLogin);
        await updateAWSUser({
          id: awsUser.id,
          userUserXpId: newUserXp.id,
        });
        awsUser.userXp = newUserXp;
      } else {
        console.log('AuthService: Found existing AWS user');
        // Update last login and level
        const level = getUserLevel(awsUser.userXp?.totalXp || 0, awsUser);
        // const updatedUserXp = await updateLastLogin(
        //   awsUser.userUserXpId,
        //   parseInt(level.level, 10),
        //   parseInt(level.xpNeeded, 10),
        //   parseFloat(level.progress.toFixed(1))
        // );
        // awsUser.userXp = updatedUserXp;
      }

      return awsUser;
    } catch (error) {
      console.error('AuthService: AWS user setup failed', error);
      throw error;
    }
  }

  async _getThinkificUserWithRetry(email, maxRetries = 3) {
    // Check if we've already determined this user doesn't exist in Thinkific
    if (this.userData && this.userData.thinkificUser === null) {
      console.log(
        'AuthService: Thinkific user already checked and not found, skipping'
      );
      return null;
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(
          `AuthService: Fetching Thinkific user (attempt ${attempt})`
        );

        const response = await fetch(
          `/api/thinkific/get-user?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data?.data?.data?.userByEmail) {
          console.log('AuthService: Thinkific user found');
          return data.data.data.userByEmail;
        } else {
          console.log('AuthService: No Thinkific user found');
          return null;
        }
      } catch (error) {
        console.error(
          `AuthService: Thinkific API attempt ${attempt} failed:`,
          error
        );

        if (attempt === maxRetries) {
          console.warn(
            'AuthService: All Thinkific API attempts failed, returning null'
          );
          return null;
        }

        // Wait before retry (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }

  async _updateUserStats(awsUser, thinkificUser) {
    try {
      // Calculate Thinkific XP
      const thinkificXp = this._calculateThinkificXp(thinkificUser);

      // Calculate total XP
      const totalXp = thinkificXp + (awsUser.psXp || 0);

      // Get user level
      const level = getUserLevel(totalXp, awsUser);

      // Update user if needed
      if (awsUser.totalXp !== totalXp) {
        await updateAWSUser({
          id: awsUser.id,
          totalXp,
          psXp: awsUser.psXp || 0,
          thinkificXp,
          level: level.level,
          xpToNextLevel: level.xpNeeded,
        });
      }
    } catch (error) {
      console.error('AuthService: Failed to update user stats', error);
      // Don't throw - this is not critical
    }
  }

  _calculateThinkificXp(thinkificUser) {
    if (!thinkificUser?.courses?.nodes) return 0;

    return thinkificUser.courses.nodes.reduce((total, course) => {
      const price = course.product?.primaryPrice?.price || 0;
      return total + this._calculateCourseXP(price);
    }, 0);
  }

  _calculateCourseXP(price) {
    if (price > 0) {
      if (price <= 50) return Math.round(price * 0.5);
      if (price <= 150) return Math.round(price * 0.6);
      return Math.round(price * 0.7);
    }
    return 15;
  }

  // Reset for logout
  reset() {
    this.setupPromise = null;
    this.userData = null;
  }

  // Get cached user data
  getUserData() {
    return this.userData;
  }
}

// Export singleton instance
export const authService = new AuthService();
