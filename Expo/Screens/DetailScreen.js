import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailScreen({navigation}) {
  return (
    <View>
      <Text>DetailScreen</Text>
      <Button
        title='Certificate'
        onPress={() => navigation.navigate('Certificate')}
      />
    </View>
  )
}
