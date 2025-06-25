/**
 * @format
 */

// Add polyfills for web
if (typeof global === 'undefined') {
  global = globalThis;
}

try {
  // Import intl-pluralrules with error handling
  require('intl-pluralrules');
  console.log('✅ intl-pluralrules loaded');
} catch (error) {
  console.warn('⚠️ intl-pluralrules failed to load:', error.message);
}

// Import the web-native app (handles requireNativeComponent errors)
try {
  console.log('🚀 Loading WebNativeApp (fixes native component issues)...');
  const WebNativeApp = require('./app/WebNativeApp').default;
  module.exports.default = WebNativeApp;
  console.log('✅ WebNativeApp loaded successfully!');
} catch (error) {
  console.error('❌ WebNativeApp failed, using fallback:', error);
  const WebSafeApp = require('./app/WebSafeApp').default;
  module.exports.default = WebSafeApp;
}
