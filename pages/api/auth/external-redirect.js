import { getSession } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';

export default async function externalRedirectHandler(req, res) {
  try {
    const session = await getSession(req, res);

    if (!session?.user) {
      return res.redirect('/login');
    }

    // Dynamically determine the base URL based on the request
    let baseUrl;
    if (process.env.NODE_ENV === 'development') {
      baseUrl = 'http://localhost:3001';
    } else {
      // Get the protocol and host from the request
      const protocol =
        req.headers['x-forwarded-proto'] ||
        req.headers['x-forwarded-ssl'] === 'on'
          ? 'https'
          : 'http';
      const host = req.headers.host;
      baseUrl = `${protocol}://${host}`;
    }

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

      // Get the actual returnTo URL from query parameter
      const actualReturnTo =
        req.query.returnTo || 'https://learn.packagingschool.com';

      // Store the returnTo in a cookie or pass it through so we can recover it if token expires
      // The returnTo will be included in the SSO URL's return_to parameter, but we'll also
      // store it in case Thinkific redirects back with an error
      res.setHeader(
        'Set-Cookie',
        `pendingReturnTo=${encodeURIComponent(
          actualReturnTo
        )}; Path=/; Max-Age=900; SameSite=Lax`
      );

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

        // Store the returnTo in a cookie so we can recover it if token expires
        res.setHeader(
          'Set-Cookie',
          `pendingReturnTo=${encodeURIComponent(
            actualReturnTo
          )}; Path=/; Max-Age=900; SameSite=Lax`
        );

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
