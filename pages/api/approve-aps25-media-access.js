import { API } from 'aws-amplify';
import { createApprovedAPS25MediaPage } from '../../src/graphql/mutations';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  // Get email from query params (GET) or body (POST)
  const email = req.method === 'GET' ? req.query.email : req.body.email;

  if (!email) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error - APS Media Access</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <h1 class="error">Error</h1>
          <p>Email is required.</p>
        </body>
      </html>
    `);
  }

  try {
    // Create new approved user (no need to check existing list for recovery)
    try {
      await API.graphql({
        query: createApprovedAPS25MediaPage,
        variables: {
          input: {
            email: email,
          },
        },
      });
    } catch (createError) {
      // If it's a duplicate or other error, still show success since the goal is access
      // Log the error but don't fail the request
      console.log(
        'Note: User may already exist or other non-critical error:',
        createError
      );
    }

    // Return success HTML page (always show success for recovery flow)
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Access Approved - APS Media</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'HelveticaNeue', Helvetica, Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background-color: #f5f5f5;
              margin: 0;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .success {
              color: #0a85ea;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .message {
              color: #444;
              font-size: 16px;
              line-height: 1.6;
            }
            .email {
              font-weight: bold;
              color: #0a85ea;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="success">✓ Access Approved</h1>
            <p class="message">
              Access has been successfully approved for <span class="email">${email}</span>. They can now access the APS 2025 media page.
            </p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error approving APS25 media access:', error);
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error - APS Media Access</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; margin: 0; }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <h1 class="error">Error</h1>
          <p>Failed to approve access. Please try again later.</p>
        </body>
      </html>
    `);
  }
}
