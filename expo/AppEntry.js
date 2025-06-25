console.log('🚀 AppEntry.js is executing...');

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('🚨 Global error:', event.error);
  console.error('🚨 Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
});

try {
  console.log('📦 Loading dependencies...');
  
  // Import React and related dependencies
  const { registerRootComponent } = require('expo');
  const React = require('react');
  
  console.log('✅ Basic dependencies loaded');
  
  // Import the actual app
  console.log('📱 Loading main app...');
  const App = require('../App').default;
  
  console.log('✅ App component loaded:', typeof App);
  
  // Register the app component
  console.log('🔗 Registering app component...');
  registerRootComponent(App);
  
  console.log('✅ App registration complete!');
  
} catch (error) {
  console.error('❌ Failed to load app:', error);
  console.error('❌ Error stack:', error.stack);
  
  // Fallback: show error message
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #ff5252; color: white; font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <div>
          <h2>❌ App Loading Error</h2>
          <p>Error: ${error.message}</p>
          <p><small>Check browser console for details</small></p>
        </div>
      </div>
    `;
  }
}
