// Next.js API route for fetching Google Sheets data
import { google } from 'googleapis';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sheetId, range } = req.query;

  // Validate required parameters
  if (!sheetId) {
    return res.status(400).json({ error: 'sheetId is required' });
  }

  try {
    // Check if required environment variables exist
    const requiredVars = [
      'GOOGLE_CLIENT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_PROJECT_ID',
    ];

    const missingVars = requiredVars.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
      return res.status(500).json({
        error: `Missing required environment variables: ${missingVars.join(
          ', '
        )}`,
      });
    }

    // Build credentials object from individual environment variables
    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
        process.env.GOOGLE_CLIENT_EMAIL
      )}`,
      universe_domain: 'googleapis.com',
    };

    // Initialize the Google Sheets client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Default range to get all data if not specified
    const sheetRange = range || 'Sheet1';

    // Fetch data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: sheetRange,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res.status(200).json({ data: [], message: 'No data found' });
    }

    // Convert rows to objects (first row as headers)
    const headers = rows[0];
    const data = rows.slice(1).map((row) => {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index] || '';
      });
      return rowData;
    });

    res.status(200).json({ data, headers });
  } catch (error) {
    console.error('Google Sheets API Error:', error);

    if (error.code === 403) {
      return res.status(403).json({
        error:
          'Permission denied. Please check that the service account has access to the Google Sheet.',
      });
    }

    if (error.code === 404) {
      return res.status(404).json({
        error: 'Sheet not found. Please check the sheet ID.',
      });
    }

    res.status(500).json({
      error: 'Failed to fetch sheet data',
      message: error.message,
    });
  }
}

