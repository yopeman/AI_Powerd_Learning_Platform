import React from 'react';
import { View, Text, Button } from 'react-native';

export default function FieldScreen({navigation}) {
  return (
    <View>
      <Text>FieldScreen</Text>
      <Button
        title='Course'
        onPress={() => navigation.navigate('Course')}
      />
    </View>
  )
}
