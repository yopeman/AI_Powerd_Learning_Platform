import React from 'react';
import { View, Text, Button } from 'react-native';

export default function AboutScreen({navigation}) {
  return (
    <View>
      <Text>AboutScreen</Text>
      <Button
        title='Home'
        onPress={()=> navigation.navigate('Main', { screen: 'Home' })}
      />
    </View>
  )
}
