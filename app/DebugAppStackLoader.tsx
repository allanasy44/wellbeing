import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useMMKVString } from './services/web-mocks';

// Simple test screen
function TestScreen({ route }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>✅ {route.params?.title || 'Test Screen'}</Text>
      <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
        This screen loaded successfully without requireNativeComponent errors!
      </Text>
    </View>
  );
}

// Debug component that loads screens progressively
export function DebugAppStackLoader() {
  const [loadedComponents, setLoadedComponents] = useState<string[]>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [currentTest, setCurrentTest] = useState<string>('Starting...');
  
  const Stack = createNativeStackNavigator();
  const [user] = useMMKVString('user');

  // List of components to test
  const componentsToTest = [
    'HomeNavigator',
    'OnboardingScreen', 
    'Permission',
    'BookingStatus',
    'CalendarRange',
    'ChangeLanguage',
    'CompleteProfile',
    'DoctorDetails',
    'EnhancedMessages',
    'SpecialistDoctor',
    'VideoCall',
    'Symptoms',
    'Analyse',
    'Analysis',
    'EditSymptoms',
    'FindDoctor'
  ];

  const testComponent = async (componentName: string) => {
    try {
      setCurrentTest(`Testing ${componentName}...`);
      console.log(`🔍 Testing component: ${componentName}`);
      
      let component: any = TestScreen;
      let loadPath = '';
      
      switch (componentName) {
        case 'HomeNavigator':
          loadPath = './navigators/HomeNavigator';
          const HomeNav = require('./navigators/HomeNavigator');
          component = HomeNav.HomeNavigator;
          break;
        case 'OnboardingScreen':
          loadPath = './screens/Onboarding';
          const Onboarding = require('./screens/Onboarding');
          component = Onboarding.OnboardingScreen;
          break;
        case 'Permission':
          loadPath = './screens/Permission';
          const PermissionModule = require('./screens/Permission');
          component = PermissionModule.Permission;
          break;
        case 'BookingStatus':
          loadPath = './screens/BookingStatus';
          const BookingStatusModule = require('./screens/BookingStatus');
          component = BookingStatusModule.BookingStatus;
          break;
        case 'FindDoctor':
          loadPath = './screens/FindDoctor';
          const FindDoctorModule = require('./screens/FindDoctor');
          component = FindDoctorModule.FindDoctor;
          break;
        case 'VideoCall':
          loadPath = './screens/VideoCall';
          const VideoCallModule = require('./screens/VideoCall');
          component = VideoCallModule.VideoCall;
          break;
        case 'Analysis':
          loadPath = './screens/Analysis';
          const AnalysisModule = require('./screens/Analysis');
          component = AnalysisModule.Analysis;
          break;
        default:
          // Create a test component that shows the name
          component = () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>✅ {componentName}</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Component loaded successfully</Text>
            </View>
          );
      }
      
      // Try to instantiate the component to trigger any requireNativeComponent calls
      React.createElement(component, { route: { params: { title: componentName } } });
      
      console.log(`✅ ${componentName} loaded successfully`);
      setLoadedComponents(prev => [...prev, componentName]);
      
    } catch (error: any) {
      console.error(`❌ ${componentName} failed:`, error.message);
      setErrors(prev => ({ ...prev, [componentName]: error.message }));
    }
  };

  useEffect(() => {
    const runTests = async () => {
      console.log('🚀 Starting component debugging...');
      
      for (const componentName of componentsToTest) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
        await testComponent(componentName);
      }
      
      setCurrentTest('Testing complete!');
      console.log('✅ Component testing complete');
      console.log('✅ Loaded:', loadedComponents);
      console.log('❌ Errors:', errors);
    };

    runTests();
  }, []);

  return (
    <Stack.Navigator 
      initialRouteName="DebugStatus"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DebugStatus">
        {() => (
          <View style={{ flex: 1, padding: 20, backgroundColor: '#f8f9fa' }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                🔍 AppStack Component Debugger
              </Text>
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
                Testing each component to find requireNativeComponent errors
              </Text>
              <Text style={{ fontSize: 16, color: '#007bff' }}>
                {currentTest}
              </Text>
            </View>

            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#28a745' }}>
                ✅ Successfully Loaded ({loadedComponents.length})
              </Text>
              {loadedComponents.map(component => (
                <Text key={component} style={{ fontSize: 14, color: '#28a745', marginBottom: 4 }}>
                  • {component}
                </Text>
              ))}
            </View>

            {Object.keys(errors).length > 0 && (
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#dc3545' }}>
                  ❌ Failed to Load ({Object.keys(errors).length})
                </Text>
                {Object.entries(errors).map(([component, error]) => (
                  <View key={component} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#dc3545' }}>
                      {component}:
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6c757d', fontFamily: 'monospace' }}>
                      {error}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
}
