import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useMMKVString } from './services/web-mocks';

// Create working screens for the Wellbeing app
function WelcomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌟 Wellbeing</Text>
        <Text style={styles.subtitle}>Your Personal Health Companion</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Health Dashboard</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Health Score</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Checkups</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🩺 Quick Actions</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Symptoms')}
        >
          <Text style={styles.actionText}>Log Symptoms</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Doctors')}
        >
          <Text style={styles.actionText}>Find Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Analysis')}
        >
          <Text style={styles.actionText}>View Analysis</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>✅ Completed health checkup</Text>
          <Text style={styles.activityTime}>2 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>📝 Logged symptoms</Text>
          <Text style={styles.activityTime}>Yesterday</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>👨‍⚕️ Scheduled appointment</Text>
          <Text style={styles.activityTime}>3 days ago</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function SymptomsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Log Symptoms</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🤒 How are you feeling today?</Text>
          <TouchableOpacity style={styles.symptomButton}>
            <Text style={styles.symptomText}>😷 Cold symptoms</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.symptomButton}>
            <Text style={styles.symptomText}>🤕 Headache</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.symptomButton}>
            <Text style={styles.symptomText}>😴 Fatigue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.symptomButton}>
            <Text style={styles.symptomText}>🤢 Nausea</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function DoctorsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Find Doctors</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👨‍⚕️ Available Specialists</Text>
          <View style={styles.doctorItem}>
            <Text style={styles.doctorName}>Dr. Sarah Johnson</Text>
            <Text style={styles.doctorSpecialty}>Cardiologist</Text>
            <Text style={styles.doctorRating}>⭐ 4.9 (127 reviews)</Text>
          </View>
          <View style={styles.doctorItem}>
            <Text style={styles.doctorName}>Dr. Michael Chen</Text>
            <Text style={styles.doctorSpecialty}>Neurologist</Text>
            <Text style={styles.doctorRating}>⭐ 4.8 (95 reviews)</Text>
          </View>
          <View style={styles.doctorItem}>
            <Text style={styles.doctorName}>Dr. Emily Rodriguez</Text>
            <Text style={styles.doctorSpecialty}>Dermatologist</Text>
            <Text style={styles.doctorRating}>⭐ 4.9 (203 reviews)</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function AnalysisScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Health Analysis</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Health Trends</Text>
          <View style={styles.trendItem}>
            <Text style={styles.trendLabel}>Overall Health</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '85%' }]} />
            </View>
            <Text style={styles.trendValue}>85%</Text>
          </View>
          <View style={styles.trendItem}>
            <Text style={styles.trendLabel}>Sleep Quality</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '72%' }]} />
            </View>
            <Text style={styles.trendValue}>72%</Text>
          </View>
          <View style={styles.trendItem}>
            <Text style={styles.trendLabel}>Activity Level</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '91%' }]} />
            </View>
            <Text style={styles.trendValue}>91%</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    marginRight: 15,
  },
  backText: {
    fontSize: 16,
    color: '#007bff',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  activityText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  activityTime: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  symptomButton: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  symptomText: {
    fontSize: 16,
    color: '#495057',
  },
  doctorItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  doctorRating: {
    fontSize: 12,
    color: '#28a745',
  },
  trendItem: {
    marginVertical: 10,
  },
  trendLabel: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: 3,
  },
  trendValue: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'right',
  },
});

export function WorkingAppStack() {
  const Stack = createNativeStackNavigator();
  const [user] = useMMKVString('user');

  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Symptoms" component={SymptomsScreen} />
      <Stack.Screen name="Doctors" component={DoctorsScreen} />
      <Stack.Screen name="Analysis" component={AnalysisScreen} />
    </Stack.Navigator>
  );
}
