# Wellbeing App - Agent Instructions

## Commands
- **Build/Start**: `yarn start` (Expo), `yarn android/ios/web` for platform-specific
- **Lint**: `yarn lint` (ESLint with @react-native rules, no-console: error)
- **Test**: `yarn test` (Jest with react-native preset)
- **Single Test**: `yarn test App.test.tsx` or `jest path/to/test.js`

## Architecture
- **Platform**: React Native + Expo (~52.0.0) with TypeScript, New Architecture enabled
- **Navigation**: React Navigation (stack + bottom tabs)
- **State/Data**: WatermelonDB (local SQLite), Firebase (Auth/Firestore/Storage), MMKV (storage)
- **Real-time**: Socket.IO for offline-first messaging, WebRTC for video calls
- **UI**: Restyle theming, Bottom Sheet, Reanimated, Flash components
- **Structure**: `/app` contains all source (screens, components, services, db, theme, utils)

## Code Style
- **Imports**: Use absolute imports from `app/` directory
- **Formatting**: Prettier (single quotes, no bracket spacing, trailing commas, arrow parens avoid)
- **Types**: Strict TypeScript, extend expo/tsconfig.base
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Errors**: No console.log (lint error), use proper error handling
- **Files**: .tsx for components, .ts for utilities, barrel exports common
