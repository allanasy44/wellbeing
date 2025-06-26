import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MessageCircle, 
  Search, 
  Video,
  Phone,
  MoreVertical,
  Send
} from 'lucide-react-native';

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 1,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      lastMessage: 'Your test results look good. Let\'s schedule a follow-up.',
      timestamp: '2:30 PM',
      unreadCount: 2,
      isOnline: true,
      messages: [
        { id: 1, text: 'Hello Dr. Chen, how are my test results?', sender: 'patient', timestamp: '2:25 PM' },
        { id: 2, text: 'Your test results look good. Let\'s schedule a follow-up.', sender: 'doctor', timestamp: '2:30 PM' },
      ]
    },
    {
      id: 2,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Dermatologist',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      lastMessage: 'The medication should help with the symptoms.',
      timestamp: '11:45 AM',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: 1, text: 'I\'ve been experiencing some skin irritation', sender: 'patient', timestamp: '11:30 AM' },
        { id: 2, text: 'Can you describe the symptoms in more detail?', sender: 'doctor', timestamp: '11:35 AM' },
        { id: 3, text: 'It\'s red and itchy, mainly on my arms', sender: 'patient', timestamp: '11:40 AM' },
        { id: 4, text: 'The medication should help with the symptoms.', sender: 'doctor', timestamp: '11:45 AM' },
      ]
    },
    {
      id: 3,
      doctor: 'Dr. James Wilson',
      specialty: 'Neurologist',
      avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      lastMessage: 'Thank you for the update. See you next week.',
      timestamp: 'Yesterday',
      unreadCount: 0,
      isOnline: true,
      messages: [
        { id: 1, text: 'My headaches have been improving', sender: 'patient', timestamp: 'Yesterday 3:00 PM' },
        { id: 2, text: 'That\'s great to hear! Keep taking the medication as prescribed.', sender: 'doctor', timestamp: 'Yesterday 3:05 PM' },
        { id: 3, text: 'Thank you for the update. See you next week.', sender: 'doctor', timestamp: 'Yesterday 3:10 PM' },
      ]
    },
    {
      id: 4,
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'General Practitioner',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      lastMessage: 'Don\'t forget to take your vitamins daily.',
      timestamp: 'Dec 20',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: 1, text: 'Should I continue taking the vitamins?', sender: 'patient', timestamp: 'Dec 20 10:00 AM' },
        { id: 2, text: 'Yes, continue for another month and we\'ll reassess.', sender: 'doctor', timestamp: 'Dec 20 10:15 AM' },
        { id: 3, text: 'Don\'t forget to take your vitamins daily.', sender: 'doctor', timestamp: 'Dec 20 10:16 AM' },
      ]
    }
  ];

  const sendMessage = () => {
    if (messageText.trim() && selectedChat) {
      // Mock sending message
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const renderChatList = () => (
    <View style={styles.chatListContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Chat with your healthcare providers</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#8A98A1" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Conversations */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {conversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationItem}
            onPress={() => setSelectedChat(conversation)}
          >
            <View style={styles.avatarContainer}>
              <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
              {conversation.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={styles.doctorName}>{conversation.doctor}</Text>
                <Text style={styles.timestamp}>{conversation.timestamp}</Text>
              </View>
              <Text style={styles.specialty}>{conversation.specialty}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {conversation.lastMessage}
              </Text>
            </View>
            {conversation.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderChatView = () => (
    <View style={styles.chatViewContainer}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => setSelectedChat(null)}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.chatHeaderContent}>
          <Image source={{ uri: selectedChat.avatar }} style={styles.chatAvatar} />
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatDoctorName}>{selectedChat.doctor}</Text>
            <Text style={styles.chatSpecialty}>{selectedChat.specialty}</Text>
          </View>
        </View>
        <View style={styles.chatActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={20} color="#39683A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Video size={20} color="#39683A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MoreVertical size={20} color="#39683A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {selectedChat.messages.map((message: any) => (
          <View
            key={message.id}
            style={[
              styles.messageItem,
              message.sender === 'patient' ? styles.patientMessage : styles.doctorMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              message.sender === 'patient' ? styles.patientMessageText : styles.doctorMessageText
            ]}>
              {message.text}
            </Text>
            <Text style={[
              styles.messageTimestamp,
              message.sender === 'patient' ? styles.patientTimestamp : styles.doctorTimestamp
            ]}>
              {message.timestamp}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedChat ? renderChatView() : renderChatList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBF2',
  },
  chatListContainer: {
    flex: 1,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#181D17',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#27ae60',
    borderWidth: 2,
    borderColor: '#fff',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181D17',
  },
  timestamp: {
    fontSize: 12,
    color: '#8A98A1',
  },
  specialty: {
    fontSize: 12,
    color: '#8A98A1',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#181D17',
  },
  unreadBadge: {
    backgroundColor: '#39683A',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  chatViewContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    fontSize: 16,
    color: '#39683A',
    fontWeight: '500',
  },
  chatHeaderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatDoctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181D17',
  },
  chatSpecialty: {
    fontSize: 12,
    color: '#8A98A1',
  },
  chatActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageItem: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
  },
  patientMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#39683A',
  },
  doctorMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  patientMessageText: {
    color: '#fff',
  },
  doctorMessageText: {
    color: '#181D17',
  },
  messageTimestamp: {
    fontSize: 10,
  },
  patientTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  doctorTimestamp: {
    color: '#8A98A1',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#39683A',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});