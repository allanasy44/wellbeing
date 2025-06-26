import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Settings, 
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  Heart,
  Activity,
  Calendar,
  FileText
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const userProfile = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: 'March 15, 1990',
    bloodType: 'O+',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  };

  const healthStats = [
    { label: 'Height', value: '5\'6"', icon: Activity },
    { label: 'Weight', value: '140 lbs', icon: Heart },
    { label: 'Blood Type', value: 'O+', icon: FileText },
    { label: 'Age', value: '33 years', icon: Calendar },
  ];

  const menuItems = [
    { 
      title: 'Personal Information', 
      icon: User, 
      color: '#39683A',
      onPress: () => console.log('Personal Info') 
    },
    { 
      title: 'Medical History', 
      icon: FileText, 
      color: '#3498db',
      onPress: () => console.log('Medical History') 
    },
    { 
      title: 'Notifications', 
      icon: Bell, 
      color: '#f39c12',
      onPress: () => console.log('Notifications'),
      hasSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled
    },
    { 
      title: 'Privacy & Security', 
      icon: Shield, 
      color: '#e74c3c',
      onPress: () => console.log('Privacy') 
    },
    { 
      title: 'Settings', 
      icon: Settings, 
      color: '#9b59b6',
      onPress: () => console.log('Settings') 
    },
    { 
      title: 'Help & Support', 
      icon: HelpCircle, 
      color: '#1abc9c',
      onPress: () => console.log('Help') 
    },
    { 
      title: 'Sign Out', 
      icon: LogOut, 
      color: '#e74c3c',
      onPress: () => console.log('Sign Out'),
      isDestructive: true
    },
  ];

  const renderMenuItem = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.menuItem, item.isDestructive && styles.destructiveItem]}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
          <item.icon size={20} color={item.color} />
        </View>
        <Text style={[styles.menuItemText, item.isDestructive && styles.destructiveText]}>
          {item.title}
        </Text>
      </View>
      <View style={styles.menuItemRight}>
        {item.hasSwitch ? (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            trackColor={{ false: '#EEEEEE', true: '#39683A' }}
            thumbColor="#fff"
          />
        ) : (
          <ChevronRight size={20} color="#8A98A1" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#39683A" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              <Text style={styles.profileEmail}>{userProfile.email}</Text>
              <Text style={styles.profilePhone}>{userProfile.phone}</Text>
            </View>
          </View>
          
          <View style={styles.profileDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date of Birth</Text>
              <Text style={styles.detailValue}>{userProfile.dateOfBirth}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Blood Type</Text>
              <Text style={styles.detailValue}>{userProfile.bloodType}</Text>
            </View>
          </View>
        </View>

        {/* Health Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Health Overview</Text>
          <View style={styles.statsGrid}>
            {healthStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={styles.statIcon}>
                  <stat.icon size={20} color="#39683A" />
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Calendar size={20} color="#39683A" />
              </View>
              <Text style={styles.quickActionText}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <FileText size={20} color="#39683A" />
              </View>
              <Text style={styles.quickActionText}>View Records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Heart size={20} color="#39683A" />
              </View>
              <Text style={styles.quickActionText}>Health Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚙️ Account Settings</Text>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Wellbeing App v1.0.0</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#181D17',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F9DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181D17',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8A98A1',
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    color: '#8A98A1',
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#8A98A1',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181D17',
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: '#F8FBF2',
    borderRadius: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F9DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#8A98A1',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181D17',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 4,
    backgroundColor: '#F8FBF2',
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F9DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#181D17',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  destructiveItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#181D17',
  },
  destructiveText: {
    color: '#e74c3c',
  },
  menuItemRight: {
    alignItems: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#8A98A1',
  },
});