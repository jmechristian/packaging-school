# CSV to Users JSON Converter

This script converts a CSV file containing user data into a JSON file with the required structure for the packaging school project.

## Features

- Converts CSV user data to JSON format
- Generates secure passwords with:
  - Lowercase letters (a-z)
  - Uppercase letters (A-Z)
  - Numbers (0-9)
  - Special characters (!@#$%^&\*()\_+-=[]{}|;:,.<>?)
- Handles large CSV files (12K+ users) efficiently
- Creates a separate passwords file for reference
- Flexible column mapping for different CSV formats

## Installation

1. Navigate to the scripts directory:

   ```bash
   cd scripts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Basic Usage

```bash
node csv-to-users.js <input-csv-file> [output-json-file]
```

### Examples

```bash
# Convert users.csv to data/users.js
node csv-to-users.js users.csv data/users.js

# Convert with default output location
node csv-to-users.js users.csv

# Using npm script
npm run convert-users users.csv data/users.js
```

## CSV Format Requirements

Your CSV file should have columns that can be mapped to the following fields:

- **email**: Required field (user's email address)
- **given_name**: First name (optional)
- **family_name**: Last name (optional)
- **name**: Full name (optional)

### Supported Column Names

The script automatically maps common column name variations:

| Field       | Supported Column Names                                             |
| ----------- | ------------------------------------------------------------------ |
| email       | `email`, `Email`, `EMAIL`                                          |
| given_name  | `given_name`, `first_name`, `firstName`, `FirstName`, `First Name` |
| family_name | `family_name`, `last_name`, `lastName`, `LastName`, `Last Name`    |
| name        | `name`, `Name`, `full_name`, `fullName`, `Full Name`               |

## Output Files

The script generates two files:

1. **Main JSON file** (e.g., `data/users.js`):

   ```javascript
   const users = [
     {
       email: 'user@example.com',
       user_metadata: {},
       given_name: 'John',
       family_name: 'Doe',
       name: 'John Doe',
       password: 'Kj9#mN2$pL5',
       verify_email: false,
     },
     // ... more users
   ];

   module.exports = users;
   ```

2. **Passwords reference file** (e.g., `data/users_passwords.json`):
   ```json
   [
     {
       "email": "user@example.com",
       "password": "Kj9#mN2$pL5"
     }
   ]
   ```

## Password Security

Each generated password:

- Is 12 characters long by default
- Contains at least one character from each category (lowercase, uppercase, numbers, symbols)
- Is randomly shuffled to avoid predictable patterns
- Meets standard password security requirements

## Error Handling

- The script skips rows without valid email addresses
- Progress is logged every 1000 processed users
- Detailed error messages for file not found or processing issues

## Performance

- Streams CSV data for memory efficiency
- Suitable for large files (12K+ users)
- Progress tracking for long-running conversions
