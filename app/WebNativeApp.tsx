import React, {useEffect} from 'react';
import {LogBox, StatusBar, Platform, View, Text} from 'react-native';
import {NavigationContainer, createNavigationContainerRef} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {ErrorBoundary} from './ErrorBoundary';

// Web-safe component imports with fallbacks
let SafeAreaProvider: any = ({ children }: any) => <View style={{ flex: 1 }}>{children}</View>;
let GestureHandlerRootView: any = View;
let BottomSheetModalProvider: any = ({ children }: any) => children;

// Try to import SafeAreaProvider with fallback
try {
  if (Platform.OS !== 'web') {
    const SafeArea = require('react-native-safe-area-context');
    SafeAreaProvider = SafeArea.SafeAreaProvider;
    console.log('✅ SafeAreaProvider loaded');
  } else {
    console.log('🌐 Using web fallback for SafeAreaProvider');
  }
} catch (error) {
  console.warn('⚠️ SafeAreaProvider not available:', error.message);
}

// Try to import GestureHandler with fallback
try {
  const GestureHandler = require('react-native-gesture-handler');
  GestureHandlerRootView = GestureHandler.GestureHandlerRootView || View;
  console.log('✅ GestureHandler loaded');
} catch (error) {
  console.warn('⚠️ GestureHandler not available:', error.message);
}

// Try to import BottomSheet with fallback
try {
  const BottomSheet = require('@gorhom/bottom-sheet');
  BottomSheetModalProvider = BottomSheet.BottomSheetModalProvider || (({ children }: any) => children);
  console.log('✅ BottomSheetModalProvider loaded');
} catch (error) {
  console.warn('⚠️ BottomSheetModalProvider not available:', error.message);
}

// Mock react-native-screens for web
let enableFreeze = () => {};
try {
  if (Platform.OS !== 'web') {
    const screens = require('react-native-screens');
    enableFreeze = screens.enableFreeze || (() => {});
  }
} catch (error) {
  console.warn('⚠️ react-native-screens not available:', error.message);
}

// Mock useNetInfo for web
const useNetInfo = () => ({
  isConnected: true,
  type: 'wifi',
  isInternetReachable: true
});

// Import database functions safely
import {
  addChannel,
  channelCollection,
  offlineMessages,
  sendMessage,
  updateAllDeliveryStatus,
  updateDeliveryStatus,
} from './db/webMock';

import {useFirestore, useUser} from './hooks';

// Safe i18n import
try {
  require('./i18n');
  console.log('✅ i18n loaded');
} catch (error) {
  console.warn('⚠️ i18n not available:', error.message);
}

// Import debug AppStack loader to identify problematic components
let AppStack: any = null;
try {
  console.log('🔍 Loading DebugAppStackLoader to identify problematic components...');
  const DebugLoader = require('./DebugAppStackLoader');
  AppStack = DebugLoader.DebugAppStackLoader;
  console.log('✅ DebugAppStackLoader loaded - will test each component');
} catch (error) {
  console.error('❌ DebugAppStackLoader failed to load:', error);
  
  // Create a fallback AppStack
  AppStack = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ 
        backgroundColor: '#fff3cd', 
        padding: 20, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#ffeaa7',
        maxWidth: 400
      }}>
        <Text style={{ fontSize: 18, color: '#856404', marginBottom: 10, textAlign: 'center' }}>
          🔧 Debug Loader Failed...
        </Text>
        <Text style={{ fontSize: 14, color: '#856404', textAlign: 'center' }}>
          Error: {error.message}
        </Text>
      </View>
    </View>
  );
}

// Mock socket for web
const socket = {
  emit: () => {},
  on: () => {},
  off: () => {},
  connect: () => {},
  disconnect: () => {},
};

import {theme} from './theme';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function WebNativeApp(): React.JSX.Element {
  console.log('🚀 WebNativeApp starting...');

  try {
    enableFreeze(true);
  } catch (error) {
    console.warn('⚠️ enableFreeze failed:', error.message);
  }

  const {uid: UID} = useUser();
  const {getUser} = useFirestore();
  const {isConnected} = useNetInfo();
  const navigationRef = createNavigationContainerRef<any>();

  useEffect(() => {
    const init = async () => {
      try {
        console.log('🔄 Initializing Wellbeing app...');
        console.log('👤 User ID:', UID);
        console.log('🌐 Network:', isConnected ? 'Connected' : 'Offline');
        
        // Initialize app services
        if (UID) {
          console.log('👤 User authenticated, setting up services...');
        }
        
        console.log('✅ App initialization complete');
      } catch (error) {
        console.error('❌ Initialization error:', error);
      }
    };

    init().finally(() => {
      console.log('🎉 App ready!');
    });
  }, [UID, isConnected]);

  useEffect(() => {
    try {
      if (UID && isConnected) {
        console.log('🔌 Setting up real-time connections...');
        
        // Set up socket connections
        socket.emit('user-online', {uid: UID});
        
        socket.on('new-message', (data: any) => {
          if (data?.channelId && data?.message) {
            addChannel(data.channelId, data.message);
          }
        });

        socket.on('message-delivered', (data: any) => {
          if (data?.messageId) {
            updateDeliveryStatus(data.messageId, 'delivered');
          }
        });
      }
    } catch (error) {
      console.error('❌ Real-time setup error:', error);
    }

    return () => {
      try {
        socket.off('new-message');
        socket.off('message-delivered');
      } catch (error) {
        console.warn('⚠️ Socket cleanup error:', error);
      }
    };
  }, [UID, isConnected]);

  console.log('🎨 Rendering WebNativeApp...');

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent"
                translucent={Platform.OS === 'android'}
              />
              <NavigationContainer ref={navigationRef}>
                <AppStack />
              </NavigationContainer>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default WebNativeApp;
