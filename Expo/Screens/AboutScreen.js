import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';

export default function AboutScreen({navigation}) {
  return (
    <ScrollView>
      <Text>AboutScreen</Text>
      <Button
        title='Home'
        onPress={()=> navigation.navigate('Main', { screen: 'Home' })}
      />
    </ScrollView>
  )
}
