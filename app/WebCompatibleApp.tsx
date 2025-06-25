import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './theme';

// Simple web-compatible version of the app
export default function WebCompatibleApp() {
  console.log('🚀 WebCompatibleApp is rendering...');

  useEffect(() => {
    console.log('✅ WebCompatibleApp mounted successfully');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            padding: 20
          }}>
            <Text style={{ 
              fontSize: 28, 
              fontWeight: 'bold',
              marginBottom: 20,
              textAlign: 'center'
            }}>
              🎉 Wellbeing App
            </Text>
            <Text style={{ 
              fontSize: 18, 
              marginBottom: 10,
              textAlign: 'center',
              color: '#666'
            }}>
              Successfully running on Web!
            </Text>
            <Text style={{ 
              fontSize: 14, 
              textAlign: 'center',
              color: '#999',
              marginTop: 20
            }}>
              React Native → Expo Web Conversion Complete ✅
            </Text>
          </View>
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
}
