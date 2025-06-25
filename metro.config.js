const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// Add web-specific module resolution
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.platforms = ['web', 'ios', 'android'];

// Web-specific aliases and mocks
config.resolver.alias = {
  'react-native$': 'react-native-web',
  'react-native-web$': 'react-native-web',
  'better-sqlite3': path.resolve(__dirname, 'better-sqlite3.js'),
  // Add more specific component mocks
  'react-native-svg': 'react-native-svg/lib/commonjs/ReactNativeSVG.web.js',
  'react-native-linear-gradient': path.resolve(__dirname, 'app/WebSafeComponents.tsx'),
};

// Ensure proper web resolution
config.resolver.platforms = ['web', 'ios', 'android'];

module.exports = config;
