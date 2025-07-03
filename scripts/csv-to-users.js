const fs = require('fs');
const csv = require('csv-parser');
const crypto = require('crypto');

// Function to generate a secure password
function generateSecurePassword(length = 12) {
  const charset = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  };

  // Ensure at least one character from each category
  let password = '';
  password +=
    charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)];
  password +=
    charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)];
  password +=
    charset.numbers[Math.floor(Math.random() * charset.numbers.length)];
  password +=
    charset.symbols[Math.floor(Math.random() * charset.symbols.length)];

  // Fill the rest with random characters from all categories
  const allChars =
    charset.lowercase + charset.uppercase + charset.numbers + charset.symbols;
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to avoid predictable patterns
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

// Function to process CSV and convert to JSON
function processCSVToUsers(inputCSVPath, outputJSONPath) {
  const users = [];
  let processedCount = 0;

  console.log('Starting CSV processing...');

  fs.createReadStream(inputCSVPath)
    .pipe(csv())
    .on('data', (row) => {
      // Map CSV columns to user object structure
      // Adjust these field mappings based on your CSV structure
      const user = {
        email: row.email || row.Email || row.EMAIL || '',
        user_metadata: {},
        given_name:
          row.given_name ||
          row.first_name ||
          row.firstName ||
          row.FirstName ||
          row['First Name'] ||
          '',
        family_name:
          row.family_name ||
          row.last_name ||
          row.lastName ||
          row.LastName ||
          row['Last Name'] ||
          '',
        name:
          row.name ||
          row.Name ||
          row.full_name ||
          row.fullName ||
          row['Full Name'] ||
          '',
        password: generateSecurePassword(),
        verify_email: false,
      };

      // Only add user if email is present
      if (user.email && user.email.trim() !== '') {
        users.push(user);
        processedCount++;

        if (processedCount % 1000 === 0) {
          console.log(`Processed ${processedCount} users...`);
        }
      }
    })
    .on('end', () => {
      console.log(`Finished processing ${processedCount} users`);

      // Write to JSON file
      const jsonOutput = `const users = ${JSON.stringify(
        users,
        null,
        2
      )};\n\nmodule.exports = users;`;

      fs.writeFileSync(outputJSONPath, jsonOutput);
      console.log(`JSON file written to: ${outputJSONPath}`);

      // Also create a passwords file for reference (optional)
      const passwordsOutput = users.map((user) => ({
        email: user.email,
        password: user.password,
      }));

      fs.writeFileSync(
        outputJSONPath.replace('.js', '_passwords.json'),
        JSON.stringify(passwordsOutput, null, 2)
      );
      console.log('Passwords file created for reference');
    })
    .on('error', (error) => {
      console.error('Error processing CSV:', error);
    });
}

// Usage
const inputCSVPath = process.argv[2];
const outputJSONPath = process.argv[3] || 'data/users.js';

if (!inputCSVPath) {
  console.log(
    'Usage: node csv-to-users.js <input-csv-file> [output-json-file]'
  );
  console.log('Example: node csv-to-users.js users.csv data/users.js');
  process.exit(1);
}

if (!fs.existsSync(inputCSVPath)) {
  console.error(`Error: CSV file not found: ${inputCSVPath}`);
  process.exit(1);
}

processCSVToUsers(inputCSVPath, outputJSONPath);
