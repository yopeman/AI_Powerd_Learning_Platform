import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TopicScreen({navigation}) {
  return (
    <View>
      <Text>TopicScreen</Text>
      <Button
        title='Detail'
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  )
}
