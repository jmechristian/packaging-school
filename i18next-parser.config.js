module.exports = {
  locales: ['en', 'es', 'fr'], // Add your supported languages
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  defaultNamespace: 'common',
  createOldCatalogs: false, // Don't keep old files
  keySeparator: false, // Allows using keys with dots
  namespaceSeparator: false, // Allows using keys with colons
};
