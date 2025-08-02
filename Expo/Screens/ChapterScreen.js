import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ChapterScreen({navigation}) {
  return (
    <View>
      <Text>ChapterScreen</Text>
      <Button
        title='Topic'
        onPress={() => navigation.navigate('Topic')}
      />
    </View>
  )
}
