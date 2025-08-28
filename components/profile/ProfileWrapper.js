import React, { useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateAWSUser } from '../../helpers/api';

const LEVELS_CONFIG = [
  {
    level: 1,
    xpNeeded: 100,
    totalXPRequired: 100,
  },
  {
    level: 2,
    xpNeeded: 283,
    totalXPRequired: 383,
  },
  {
    level: 3,
    xpNeeded: 520,
    totalXPRequired: 903,
  },
  {
    level: 4,
    xpNeeded: 800,
    totalXPRequired: 1703,
  },
  {
    level: 5,
    xpNeeded: 1118,
    totalXPRequired: 2821,
  },
  {
    level: 6,
    xpNeeded: 1470,
    totalXPRequired: 4291,
  },
  {
    level: 7,
    xpNeeded: 1852,
    totalXPRequired: 6143,
  },
  {
    level: 8,
    xpNeeded: 2263,
    totalXPRequired: 8406,
  },
  {
    level: 9,
    xpNeeded: 2700,
    totalXPRequired: 11106,
  },
  {
    level: 10,
    xpNeeded: 3162,
    totalXPRequired: 14268,
  },
  {
    level: 11,
    xpNeeded: 3648,
    totalXPRequired: 17916,
  },
  {
    level: 12,
    xpNeeded: 4157,
    totalXPRequired: 22073,
  },
  {
    level: 13,
    xpNeeded: 4687,
    totalXPRequired: 26760,
  },
  {
    level: 14,
    xpNeeded: 5238,
    totalXPRequired: 31998,
  },
  {
    level: 15,
    xpNeeded: 5809,
    totalXPRequired: 37807,
  },
  {
    level: 16,
    xpNeeded: 6400,
    totalXPRequired: 44207,
  },
  {
    level: 17,
    xpNeeded: 7009,
    totalXPRequired: 51216,
  },
  {
    level: 18,
    xpNeeded: 7637,
    totalXPRequired: 58853,
  },
  {
    level: 19,
    xpNeeded: 8282,
    totalXPRequired: 67135,
  },
  {
    level: 20,
    xpNeeded: 8944,
    totalXPRequired: 76079,
  },
  {
    level: 21,
    xpNeeded: 10733,
    totalXPRequired: 86812,
  },
  {
    level: 22,
    xpNeeded: 12880,
    totalXPRequired: 99692,
  },
  {
    level: 23,
    xpNeeded: 15456,
    totalXPRequired: 115148,
  },
  {
    level: 24,
    xpNeeded: 18547,
    totalXPRequired: 133695,
  },
  {
    level: 25,
    xpNeeded: 22256,
    totalXPRequired: 155951,
  },
  {
    level: 26,
    xpNeeded: 26707,
    totalXPRequired: 182658,
  },
  {
    level: 27,
    xpNeeded: 32049,
    totalXPRequired: 214707,
  },
  {
    level: 28,
    xpNeeded: 38459,
    totalXPRequired: 253166,
  },
  {
    level: 29,
    xpNeeded: 46150,
    totalXPRequired: 299316,
  },
  {
    level: 30,
    xpNeeded: 55381,
    totalXPRequired: 354697,
  },
  // ... add more levels as needed
];

const ProfileWrapper = ({ children }) => {
  const { awsUser, thinkificUser, user } = useSelector((state) => state.auth);
  const { userXp } = useSelector((state) => state.auth);

  const calculateLevelProgress = (xp) => {
    let currentLevel = 1;
    let nextLevelXP = 100;
    let previousLevelXP = 0;

    for (const levelData of LEVELS_CONFIG) {
      if (xp >= levelData.xpNeeded) {
        currentLevel = levelData.level + 1;
        previousLevelXP = levelData.xpNeeded;
        nextLevelXP =
          LEVELS_CONFIG[levelData.level]?.xpNeeded ?? levelData.xpNeeded;
      } else {
        nextLevelXP = levelData.xpNeeded;
        break;
      }
    }

    const xpForNextLevel = nextLevelXP - previousLevelXP;
    const currentLevelXP = xp - previousLevelXP;
    const progress = (currentLevelXP / xpForNextLevel) * 100;
    console.log('xpNeeded', nextLevelXP - xp);
    return {
      level: currentLevel,
      progress,
      xpNeeded: nextLevelXP - xp,
    };
  };

  const calculateCourseXP = useCallback((price) => {
    if (price > 0) {
      // Tiered multiplier system
      if (price <= 50) {
        return Math.round(price * 0.5);
      } else if (price <= 150) {
        return Math.round(price * 0.6);
      } else {
        return Math.round(price * 0.7);
      }
    } else {
      return Math.round(15);
    }
  }, []);

  const calculateLessonXP = (price) => {
    if (price > 0) {
      return Math.round(price * 0.5); // 0.5 XP per $1 for lessons
    } else {
      return Math.round(5); // Use base XP for free lessons
    }
  };

  const thinkificXp = useMemo(() => {
    if (!thinkificUser?.courses?.nodes) return 0;

    return thinkificUser.courses.nodes.reduce((total, course) => {
      const price = course.product?.primaryPrice?.price || 0;
      return total + calculateCourseXP(price);
    }, 0);
  }, [thinkificUser, calculateCourseXP]);

  const userLevel = useMemo(() => {
    if (!awsUser) return { level: 1, progress: 0, xpNeeded: 100 };
    return calculateLevelProgress(thinkificXp + (awsUser.psXp || 0));
  }, [thinkificXp, awsUser]);

  useEffect(() => {
    const updateUserXP = async () => {
      if (awsUser.totalXp !== thinkificXp + (awsUser.psXp || 0)) {
        await updateAWSUser({
          id: awsUser.id,
          totalXp: thinkificXp + (awsUser.psXp || 0),
          psXp: awsUser.psXp || 0,
          thinkificXp: thinkificXp,
          level: userLevel.level,
          xpToNextLevel: userLevel.xpNeeded,
        });
      }
    };

    awsUser && thinkificUser && updateUserXP();
  }, [thinkificUser, thinkificXp, userLevel, awsUser]);

  return React.cloneElement(children, {
    awsUser,
    thinkificUser,
    calculateLevelProgress,
    calculateCourseXP,
    calculateLessonXP,
    userLevel,
    thinkificXp,
    user,
  });
};

export default ProfileWrapper;
