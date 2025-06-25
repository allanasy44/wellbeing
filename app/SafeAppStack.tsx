import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useMMKVString } from './services/web-mocks';

// Create a safe version of AppStack that works on web
const Stack = createNativeStackNavigator();

// Safe Home Navigator replacement
function SafeHomeNavigator() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: '#fff', 
        padding: 20, 
        paddingTop: Platform.OS === 'web' ? 20 : 50,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef'
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2c3e50' }}>
          🌟 Wellbeing
        </Text>
        <Text style={{ fontSize: 14, color: '#6c757d', marginTop: 4 }}>
          Your Personal Health Companion
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Health Dashboard */}
        <View style={{ backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#2c3e50', marginBottom: 15 }}>
            📊 Health Dashboard
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#27ae60', marginBottom: 4 }}>7</Text>
              <Text style={{ fontSize: 12, color: '#7f8c8d' }}>Days Active</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#27ae60', marginBottom: 4 }}>85%</Text>
              <Text style={{ fontSize: 12, color: '#7f8c8d' }}>Health Score</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#27ae60', marginBottom: 4 }}>12</Text>
              <Text style={{ fontSize: 12, color: '#7f8c8d' }}>Checkups</Text>
            </View>
          </View>
        </View>

        {/* AI Health Assistant */}
        <View style={{ backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#2c3e50', marginBottom: 15 }}>
            🤖 AI Health Assistant
          </Text>
          <TouchableOpacity style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 8, marginVertical: 5, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Analyze Symptoms</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginVertical: 5, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Get Health Insights</Text>
          </TouchableOpacity>
        </View>

        {/* Doctor Discovery */}
        <View style={{ backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#2c3e50', marginBottom: 15 }}>
            👨‍⚕️ Discover Doctors
          </Text>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#2c3e50', marginBottom: 4 }}>Dr. Sarah Johnson</Text>
            <Text style={{ fontSize: 14, color: '#6c757d', marginBottom: 4 }}>Cardiologist</Text>
            <Text style={{ fontSize: 12, color: '#28a745' }}>⭐ 4.9 (127 reviews)</Text>
          </View>
          <TouchableOpacity style={{ backgroundColor: '#17a2b8', padding: 15, borderRadius: 8, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Book Appointment</Text>
          </TouchableOpacity>
        </View>

        {/* Video Consultation */}
        <View style={{ backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#2c3e50', marginBottom: 15 }}>
            🎥 Video Consultation
          </Text>
          <Text style={{ fontSize: 14, color: '#6c757d', marginBottom: 15 }}>
            Skip the wait and get expert healthcare consultations with a quick video visit
          </Text>
          <TouchableOpacity style={{ backgroundColor: '#dc3545', padding: 15, borderRadius: 8, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Start Video Call</Text>
          </TouchableOpacity>
        </View>

        {/* Health Analytics */}
        <View style={{ backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#2c3e50', marginBottom: 15 }}>
            📈 Health Analytics
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, color: '#495057', marginBottom: 8 }}>Sleep Quality</Text>
            <View style={{ height: 6, backgroundColor: '#e9ecef', borderRadius: 3, marginBottom: 4 }}>
              <View style={{ height: '100%', width: '72%', backgroundColor: '#28a745', borderRadius: 3 }} />
            </View>
            <Text style={{ fontSize: 12, color: '#6c757d', textAlign: 'right' }}>72%</Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, color: '#495057', marginBottom: 8 }}>Activity Level</Text>
            <View style={{ height: 6, backgroundColor: '#e9ecef', borderRadius: 3, marginBottom: 4 }}>
              <View style={{ height: '100%', width: '91%', backgroundColor: '#28a745', borderRadius: 3 }} />
            </View>
            <Text style={{ fontSize: 12, color: '#6c757d', textAlign: 'right' }}>91%</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{ backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#2c3e50', marginBottom: 15 }}>
            📅 Recent Activity
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f3f4' }}>
            <Text style={{ fontSize: 14, color: '#2c3e50' }}>✅ Completed health checkup</Text>
            <Text style={{ fontSize: 12, color: '#7f8c8d' }}>2 hours ago</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f3f4' }}>
            <Text style={{ fontSize: 14, color: '#2c3e50' }}>📝 Logged symptoms</Text>
            <Text style={{ fontSize: 12, color: '#7f8c8d' }}>Yesterday</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
            <Text style={{ fontSize: 14, color: '#2c3e50' }}>👨‍⚕️ Scheduled appointment</Text>
            <Text style={{ fontSize: 12, color: '#7f8c8d' }}>3 days ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Safe Onboarding Screen
function SafeOnboardingScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' }}>
        🌟 Welcome to Wellbeing
      </Text>
      <Text style={{ fontSize: 18, color: '#fff', marginBottom: 40, textAlign: 'center', lineHeight: 26 }}>
        Your personal health companion powered by AI
      </Text>
      <TouchableOpacity 
        style={{ backgroundColor: '#fff', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25 }}
        onPress={() => navigation.navigate('HomeNavigator')}
      >
        <Text style={{ color: '#007bff', fontSize: 18, fontWeight: '600' }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

export function SafeAppStack() {
  const [user] = useMMKVString('user');
  
  console.log('🚀 SafeAppStack rendering...');

  return (
    <Stack.Navigator 
      initialRouteName={user ? "HomeNavigator" : "OnboardingScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OnboardingScreen" component={SafeOnboardingScreen} />
      <Stack.Screen name="HomeNavigator" component={SafeHomeNavigator} />
    </Stack.Navigator>
  );
}
