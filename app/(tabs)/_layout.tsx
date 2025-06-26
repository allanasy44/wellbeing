import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Home, Calendar, MessageCircle, User, Heart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F1F4E9',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: Platform.OS === 'web' ? 60 : 83,
          paddingBottom: Platform.OS === 'web' ? 8 : 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#39683A',
        tabBarInactiveTintColor: '#181D17',
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <Home 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ size, color, focused }) => (
            <Heart 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ size, color, focused }) => (
            <Calendar 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ size, color, focused }) => (
            <MessageCircle 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <User 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
    </Tabs>
  );
}