import React from 'react';
import { View, Text } from 'react-native';

export default function WebDebugApp() {
  console.log('WebDebugApp is rendering...');
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
      <Text style={{ fontSize: 24, color: 'white' }}>
        Hello Web! App is working!
      </Text>
    </View>
  );
}
