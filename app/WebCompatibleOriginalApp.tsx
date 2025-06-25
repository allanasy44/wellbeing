import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect} from 'react';
import {LogBox, StatusBar, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Safe imports
let enableFreeze = () => {}; // Mock for web
try {
  const screens = require('react-native-screens');
  enableFreeze = screens.enableFreeze;
} catch (error) {
  console.warn('⚠️ react-native-screens not available on web');
}

// Mock useNetInfo for web
const useNetInfo = () => ({
  isConnected: true,
  type: 'wifi',
  isInternetReachable: true
});

// Import the database functions
import {
  addChannel,
  channelCollection,
  offlineMessages,
  sendMessage,
  updateAllDeliveryStatus,
  updateDeliveryStatus,
} from './db/webMock';

import {useFirestore, useUser} from './hooks';

// Safe import of i18n
try {
  require('./i18n');
  console.log('✅ i18n loaded');
} catch (error) {
  console.warn('⚠️ i18n not available:', error.message);
}

import {AppStack} from './navigators/AppStack';

// Mock socket for web
const socket = {
  emit: () => {},
  on: () => {},
  off: () => {},
  connect: () => {},
  disconnect: () => {},
};

import {colors, theme} from './theme';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App(): React.JSX.Element {
  try {
    enableFreeze(true);
  } catch (error) {
    console.warn('⚠️ enableFreeze not available on web');
  }

  const {uid: UID} = useUser();
  const {getUser} = useFirestore();
  const {isConnected} = useNetInfo();
  const navigationRef = createNavigationContainerRef<any>();

  useEffect(() => {
    const init = async () => {
      try {
        console.log('🚀 Initializing Wellbeing app...');
        console.log('👤 User ID:', UID);
        console.log('🌐 Connected:', isConnected);
        
        // Initialize offline messages if needed
        if (offlineMessages && offlineMessages.length > 0) {
          console.log('📱 Processing offline messages...');
          // Process offline messages
        }
        
        console.log('✅ App initialization complete');
      } catch (error) {
        console.error('❌ App initialization error:', error);
      }
    };

    init().finally(async () => {
      console.log('🎉 App ready!');
    });
  }, [UID, isConnected]);

  useEffect(() => {
    try {
      if (UID && isConnected) {
        console.log('🔌 Setting up real-time connections...');
        
        // Mock socket connections for web
        socket.emit('user-online', {uid: UID});
        
        socket.on('new-message', (data: any) => {
          console.log('📨 New message received:', data);
          if (data?.channelId && data?.message) {
            addChannel(data.channelId, data.message);
          }
        });

        socket.on('message-delivered', (data: any) => {
          console.log('✅ Message delivered:', data);
          if (data?.messageId) {
            updateDeliveryStatus(data.messageId, 'delivered');
          }
        });
      }
    } catch (error) {
      console.error('❌ Socket connection error:', error);
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

  return (
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
  );
}

export default App;
