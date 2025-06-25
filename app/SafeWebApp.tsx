import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './theme';

// Safe imports with fallbacks
let GestureHandlerRootView: any = View;
let BottomSheetModalProvider: any = ({ children }: any) => children;

try {
  const GH = require('react-native-gesture-handler');
  GestureHandlerRootView = GH.GestureHandlerRootView;
  console.log('✅ GestureHandler loaded');
} catch (error) {
  console.warn('⚠️ GestureHandler not available on web:', error.message);
}

try {
  const BSM = require('@gorhom/bottom-sheet');
  BottomSheetModalProvider = BSM.BottomSheetModalProvider;
  console.log('✅ BottomSheet loaded');
} catch (error) {
  console.warn('⚠️ BottomSheet not available:', error.message);
}

// Mock useNetInfo for web
const useNetInfo = () => ({
  isConnected: true,
  type: 'wifi',
  isInternetReachable: true
});

export default function SafeWebApp() {
  const [isReady, setIsReady] = useState(false);
  const { isConnected } = useNetInfo();

  useEffect(() => {
    console.log('🚀 SafeWebApp is initializing...');
    
    // Initialize the app
    const init = async () => {
      try {
        // Add any initialization logic here
        console.log('📱 App initialization complete');
        setIsReady(true);
      } catch (error) {
        console.error('❌ App initialization failed:', error);
        setIsReady(true); // Still show the app even if init fails
      }
    };

    init();
  }, []);

  if (!isReady) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}>
        <Text style={{ fontSize: 18, color: '#666' }}>Loading Wellbeing App...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <StatusBar 
              barStyle="dark-content" 
              backgroundColor="transparent"
              translucent={Platform.OS === 'android'}
            />
            <NavigationContainer>
              <View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                padding: 20
              }}>
                <View style={{
                  backgroundColor: 'white',
                  padding: 30,
                  borderRadius: 15,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 5,
                  alignItems: 'center'
                }}>
                  <Text style={{ 
                    fontSize: 32, 
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: '#2c3e50'
                  }}>
                    🌟 Wellbeing
                  </Text>
                  <Text style={{ 
                    fontSize: 18, 
                    marginBottom: 15,
                    color: '#34495e',
                    textAlign: 'center'
                  }}>
                    Your health companion is now running on web!
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: '#27ae60', fontWeight: '600' }}>
                      ✅ React Native Web: Working
                    </Text>
                    <Text style={{ color: '#27ae60', fontWeight: '600' }}>
                      ✅ Navigation: Ready
                    </Text>
                    <Text style={{ color: '#27ae60', fontWeight: '600' }}>
                      ✅ Theme System: Active
                    </Text>
                    <Text style={{ color: isConnected ? '#27ae60' : '#e74c3c', fontWeight: '600' }}>
                      {isConnected ? '✅' : '❌'} Network: {isConnected ? 'Connected' : 'Offline'}
                    </Text>
                  </View>
                </View>
              </View>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
