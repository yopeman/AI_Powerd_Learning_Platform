import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SettingScreen({navigation}) {
  return (
    <View>
      <Text>SettingScreen</Text>
      <Button
        title='Home'
        onPress={() => navigation.navigate('Main', { screen: 'Home' })}
      />
    </View>
  )
}
