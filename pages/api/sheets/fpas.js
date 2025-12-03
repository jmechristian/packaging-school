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
      return res.status(200).json({ data: [], headers: [], message: 'No data found' });
    }

    // Check if row 1 (index 0) has meaningful headers or if they're in row 2 (index 1)
    // If row 1 is mostly empty, use row 2 as headers
    const row1 = rows[0] || [];
    const row2 = rows[1] || [];
    
    // Count non-empty cells in each row
    const row1NonEmpty = row1.filter(cell => cell && cell.toString().trim() !== '').length;
    const row2NonEmpty = row2.filter(cell => cell && cell.toString().trim() !== '').length;
    
    // Use row 2 as headers if it has significantly more content than row 1
    const headerRowIndex = row2NonEmpty > row1NonEmpty * 2 ? 1 : 0;
    const dataStartIndex = headerRowIndex + 1;
    
    // Get headers from the appropriate row
    const rawHeaders = rows[headerRowIndex] || [];
    
    // Log the first few rows to debug header structure
    console.log('Header row index:', headerRowIndex);
    console.log('First 3 rows from sheet:', rows.slice(0, 3));
    console.log('Raw headers:', rawHeaders);

    // Build a list of unique, non-empty header keys for the JSON structure.
    // This avoids collapsing data when headers are duplicated or blank.
    const headerCounts = {};
    const headers = rawHeaders.map((header, index) => {
      // Preserve the original header value, even if empty
      const originalHeader = header ? header.toString().trim() : '';
      
      // For the key, use original if it exists, otherwise create a unique column name
      const base = originalHeader !== '' ? originalHeader : `Column ${index + 1}`;

      headerCounts[base] = (headerCounts[base] || 0) + 1;
      const count = headerCounts[base];

      // First occurrence uses the base name, subsequent ones get a suffix
      if (count === 1) {
        return base;
      }

      return `${base} (${count})`;
    });
    
    console.log('Processed headers:', headers);

    // Map each row to an object using the unique headers, starting from after the header row
    const data = rows.slice(dataStartIndex).map((row) => {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index] ?? '';
      });
      return rowData;
    });

    // Return both raw and processed headers for debugging
    res.status(200).json({ 
      data, 
      headers,
      rawHeaders: rawHeaders, // Include original headers for debugging
      debug: {
        headerRowIndex,
        dataStartIndex,
        firstRow: rows[0],
        secondRow: rows[1],
        thirdRow: rows[2],
        totalRows: rows.length,
        totalColumns: rawHeaders.length
      }
    });
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

