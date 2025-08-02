import React from 'react';
import { View, Text, Button } from 'react-native';

export default function CourseScreen({navigation}) {
  return (
    <View>
      <Text>CourseScreen</Text>
      <Button
        title='Chapter'
        onPress={() => navigation.navigate('Chapter')}
      />
    </View>
  )
}
