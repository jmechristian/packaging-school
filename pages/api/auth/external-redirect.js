import { getSession } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';

export default async function externalRedirectHandler(req, res) {
  try {
    const session = await getSession(req, res);

    if (!session?.user) {
      return res.redirect('/login');
    }

    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://packagingschool.com';

    // Check if user exists in Thinkific
    const thinkificUser = await fetch(
      `${baseUrl}/api/thinkific/get-user?email=${session.user.email}`
    );
    const data = await thinkificUser.json();

    if (data?.data?.data?.userByEmail) {
      // User exists in Thinkific, handle SSO
      const firstName =
        session.user.given_name ||
        session.user.name?.split(' ')[0] ||
        data?.data?.data?.userByEmail?.firstName ||
        '';
      const lastName =
        session.user.family_name ||
        session.user.name?.split(' ').slice(1).join(' ') ||
        data?.data?.data?.userByEmail?.lastName ||
        '';

      console.log('User data for SSO:', {
        email: session.user.email,
        firstName,
        lastName,
        name: session.user.name,
      });

      // Get the actual returnTo URL from sessionStorage (we'll need to pass it through the URL)
      const actualReturnTo =
        req.query.returnTo || 'https://learn.packagingschool.com';

      const redirectUrl = await handleSSO({
        email: session.user.email,
        first_name: firstName,
        last_name: lastName,
        returnTo: actualReturnTo,
        baseUrl,
      });
      console.log('SSO redirect URL generated:', redirectUrl);
      return res.redirect(redirectUrl);
    } else {
      console.log('No user found in Thinkific, creating user...');

      const firstName =
        session.user.given_name || session.user.name?.split(' ')[0] || '';
      const lastName =
        session.user.family_name ||
        session.user.name?.split(' ').slice(1).join(' ') ||
        '';

      if (firstName && lastName) {
        // Create user in Thinkific
        const createUser = await fetch(`${baseUrl}/api/thinkific/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session.user.email,
            first_name: firstName,
            last_name: lastName,
          }),
        });
        const createUserResult = await createUser.json();
        console.log('User created in Thinkific:', createUserResult);

        // Handle SSO after user creation
        const actualReturnTo =
          req.query.returnTo || 'https://learn.packagingschool.com';

        const redirectUrl = await handleSSO({
          email: session.user.email,
          first_name: firstName,
          last_name: lastName,
          returnTo: actualReturnTo,
          baseUrl,
        });
        console.log(
          'SSO redirect URL generated after user creation:',
          redirectUrl
        );
        return res.redirect(redirectUrl);
      } else {
        console.log(
          'No first name or last name available, redirecting to profile'
        );
        return res.redirect('/profile?tab=courses');
      }
    }
  } catch (error) {
    console.error('External redirect error:', error);
    return res.redirect('/profile?tab=courses');
  }
}
