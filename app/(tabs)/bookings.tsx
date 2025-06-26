import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Calendar, 
  Clock, 
  Video, 
  MessageCircle,
  Star,
  MapPin,
  ChevronRight
} from 'lucide-react-native';

export default function BookingsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:30 PM - 3:30 PM',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      rating: 4.9,
      location: 'Heart Care Center',
      type: 'Video Call'
    },
    {
      id: 2,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Dermatologist',
      date: 'Tomorrow',
      time: '10:00 AM - 11:00 AM',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      rating: 4.8,
      location: 'Skin Health Clinic',
      type: 'In-Person'
    },
    {
      id: 3,
      doctor: 'Dr. James Wilson',
      specialty: 'Neurologist',
      date: 'Dec 28',
      time: '3:00 PM - 4:00 PM',
      avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      rating: 4.9,
      location: 'Brain & Spine Center',
      type: 'Video Call'
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'General Practitioner',
      date: 'Dec 20',
      time: '11:00 AM',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      rating: 4.7,
      status: 'Completed'
    },
    {
      id: 5,
      doctor: 'Dr. Robert Kim',
      specialty: 'Orthopedist',
      date: 'Dec 15',
      time: '2:00 PM',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      rating: 4.6,
      status: 'Completed'
    }
  ];

  const renderAppointmentCard = (appointment: any, isUpcoming = true) => (
    <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Calendar size={16} color="#39683A" />
            <Text style={styles.dateText}>{appointment.date}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={16} color="#39683A" />
            <Text style={styles.timeText}>{appointment.time}</Text>
          </View>
        </View>
        {appointment.type && (
          <View style={[styles.typeTag, appointment.type === 'Video Call' ? styles.videoTag : styles.inPersonTag]}>
            <Text style={[styles.typeText, appointment.type === 'Video Call' ? styles.videoText : styles.inPersonText]}>
              {appointment.type}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.doctorSection}>
        <Image source={{ uri: appointment.avatar }} style={styles.doctorAvatar} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{appointment.doctor}</Text>
          <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
          <View style={styles.doctorMeta}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{appointment.rating}</Text>
            </View>
            {appointment.location && (
              <>
                <Text style={styles.separator}>•</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={12} color="#8A98A1" />
                  <Text style={styles.locationText}>{appointment.location}</Text>
                </View>
              </>
            )}
          </View>
        </View>
        <ChevronRight size={20} color="#8A98A1" />
      </View>

      {isUpcoming && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.chatButton}>
            <MessageCircle size={16} color="#39683A" />
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.videoButton}>
            <Video size={16} color="#fff" />
            <Text style={styles.videoButtonText}>Join Call</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isUpcoming && appointment.status && (
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{appointment.status}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Bookings</Text>
          <Text style={styles.subtitle}>Manage your appointments</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Cancelled</Text>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📅 Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingAppointments.map(appointment => renderAppointmentCard(appointment, true))}
        </View>

        {/* Past Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Past Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {pastAppointments.map(appointment => renderAppointmentCard(appointment, false))}
        </View>

        {/* Book New Appointment */}
        <TouchableOpacity style={styles.bookNewButton}>
          <Text style={styles.bookNewText}>+ Book New Appointment</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#181D17',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A98A1',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39683A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8A98A1',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181D17',
  },
  seeAllText: {
    fontSize: 14,
    color: '#39683A',
    fontWeight: '500',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateTimeContainer: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#181D17',
    marginLeft: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    color: '#8A98A1',
    marginLeft: 6,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  videoTag: {
    backgroundColor: '#E3F2FD',
  },
  inPersonTag: {
    backgroundColor: '#E8F5E8',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  videoText: {
    color: '#1976D2',
  },
  inPersonText: {
    color: '#388E3C',
  },
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181D17',
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#8A98A1',
    marginBottom: 4,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#8A98A1',
    marginLeft: 4,
  },
  separator: {
    fontSize: 12,
    color: '#8A98A1',
    marginHorizontal: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#8A98A1',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#39683A',
    backgroundColor: 'transparent',
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#39683A',
    marginLeft: 6,
  },
  videoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 25,
    backgroundColor: '#0F68F0',
  },
  videoButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 6,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#388E3C',
  },
  bookNewButton: {
    backgroundColor: '#39683A',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  bookNewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});