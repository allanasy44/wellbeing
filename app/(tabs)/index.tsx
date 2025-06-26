import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Brain, 
  Stethoscope, 
  Calendar, 
  Video, 
  Activity,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react-native';

export default function HomeScreen() {
  const mockUser = {
    name: 'Sarah Johnson',
    healthScore: 85,
    daysActive: 7,
    checkups: 12
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello 👋🏼,</Text>
            <Text style={styles.userName}>{mockUser.name}</Text>
          </View>
          <View style={styles.avatar}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }}
              style={styles.avatarImage}
            />
          </View>
        </View>

        {/* Health Dashboard */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Health Dashboard</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{mockUser.daysActive}</Text>
              <Text style={styles.statLabel}>Days Active</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{mockUser.healthScore}%</Text>
              <Text style={styles.statLabel}>Health Score</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{mockUser.checkups}</Text>
              <Text style={styles.statLabel}>Checkups</Text>
            </View>
          </View>
        </View>

        {/* AI Health Assistant */}
        <View style={[styles.card, styles.aiCard]}>
          <View style={styles.aiHeader}>
            <Brain size={24} color="#39683A" />
            <Text style={styles.aiTitle}>AI Health Assistant</Text>
          </View>
          <Text style={styles.aiDescription}>
            Try our AI-powered symptom analysis tool to get quick insights and identify potential medical conditions.
          </Text>
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>Get Insights</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🩺 Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Stethoscope size={20} color="#39683A" />
              </View>
              <Text style={styles.actionText}>Find Doctors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Calendar size={20} color="#39683A" />
              </View>
              <Text style={styles.actionText}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Video size={20} color="#39683A" />
              </View>
              <Text style={styles.actionText}>Video Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Activity size={20} color="#39683A" />
              </View>
              <Text style={styles.actionText}>Log Symptoms</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>📅 Upcoming Schedule</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentDate}>
                <Calendar size={16} color="#39683A" />
                <Text style={styles.appointmentDateText}>Today, 2:30 PM</Text>
              </View>
              <View style={styles.appointmentTime}>
                <Clock size={16} color="#39683A" />
                <Text style={styles.appointmentTimeText}>30 min</Text>
              </View>
            </View>
            <View style={styles.doctorInfo}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' }}
                style={styles.doctorAvatar}
              />
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>Dr. Michael Chen</Text>
                <Text style={styles.doctorSpecialty}>Cardiologist</Text>
                <View style={styles.doctorRating}>
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.videoCallButton}>
                <Video size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Health Analytics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Health Analytics</Text>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsLabel}>Sleep Quality</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '72%' }]} />
            </View>
            <Text style={styles.analyticsValue}>72%</Text>
          </View>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsLabel}>Activity Level</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '91%' }]} />
            </View>
            <Text style={styles.analyticsValue}>91%</Text>
          </View>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsLabel}>Nutrition Score</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '68%' }]} />
            </View>
            <Text style={styles.analyticsValue}>68%</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={[styles.card, { marginBottom: 20 }]}>
          <Text style={styles.cardTitle}>📋 Recent Activity</Text>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <TrendingUp size={16} color="#27ae60" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Completed health checkup</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Activity size={16} color="#3498db" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Logged symptoms</Text>
              <Text style={styles.activityTime}>Yesterday</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Calendar size={16} color="#e74c3c" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Scheduled appointment</Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBF2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#8A98A1',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181D17',
    marginTop: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181D17',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#39683A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8A98A1',
  },
  aiCard: {
    backgroundColor: '#C1EFAF',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#181D17',
    marginLeft: 8,
  },
  aiDescription: {
    fontSize: 14,
    color: '#181D17',
    lineHeight: 20,
    marginBottom: 16,
  },
  aiButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  aiButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181D17',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: '#F8FBF2',
    borderRadius: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F9DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#181D17',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#39683A',
    fontWeight: '500',
  },
  appointmentCard: {
    backgroundColor: '#F8FBF2',
    padding: 16,
    borderRadius: 12,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  appointmentDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDateText: {
    fontSize: 13,
    color: '#181D17',
    marginLeft: 6,
    fontWeight: '500',
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentTimeText: {
    fontSize: 13,
    color: '#181D17',
    marginLeft: 6,
    fontWeight: '500',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181D17',
  },
  doctorSpecialty: {
    fontSize: 12,
    color: '#8A98A1',
    marginTop: 2,
  },
  doctorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#8A98A1',
    marginLeft: 4,
  },
  videoCallButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F68F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyticsItem: {
    marginBottom: 16,
  },
  analyticsLabel: {
    fontSize: 14,
    color: '#181D17',
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#39683A',
    borderRadius: 3,
  },
  analyticsValue: {
    fontSize: 12,
    color: '#8A98A1',
    textAlign: 'right',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FBF2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#181D17',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#8A98A1',
    marginTop: 2,
  },
});