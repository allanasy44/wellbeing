import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

// Let's try loading screens one by one to see which one fails
console.log('🔍 Starting AppStack debug loading...');

// First, test a simple screen
function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>🎉 Wellbeing App</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Navigation is working!</Text>
      <Text style={{ fontSize: 14, color: '#666' }}>This is the actual app interface</Text>
    </View>
  );
}

// Try to load some basic screens
let HomeNavigator = TestScreen;
let OnboardingScreen = TestScreen;
let Permission = TestScreen;

try {
  console.log('🔍 Loading HomeNavigator...');
  const Home = require('./navigators/HomeNavigator');
  HomeNavigator = Home.HomeNavigator;
  console.log('✅ HomeNavigator loaded');
} catch (error) {
  console.error('❌ HomeNavigator failed:', error.message);
}

try {
  console.log('🔍 Loading Onboarding...');
  const Onboarding = require('./screens/Onboarding');
  OnboardingScreen = Onboarding.OnboardingScreen;
  console.log('✅ Onboarding loaded');
} catch (error) {
  console.error('❌ Onboarding failed:', error.message);
}

try {
  console.log('🔍 Loading Permission...');
  const PermissionModule = require('./screens/Permission');
  Permission = PermissionModule.Permission;
  console.log('✅ Permission loaded');
} catch (error) {
  console.error('❌ Permission failed:', error.message);
}

// Mock auth and storage
const useMMKVString = (key: string) => ['test-user', () => {}];
const auth = { currentUser: { uid: 'test-user' } };

export function DebugAppStack() {
  console.log('🚀 DebugAppStack rendering...');
  
  const Stack = createNativeStackNavigator();
  const [user] = useMMKVString('user');

  return (
    <Stack.Navigator 
      initialRouteName={user ? "HomeNavigator" : "OnboardingScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="Permission" component={Permission} />
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
    </Stack.Navigator>
  );
}
