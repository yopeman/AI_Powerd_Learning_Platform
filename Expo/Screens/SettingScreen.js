import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';

export default function SettingScreen({navigation}) {
  return (
    <ScrollView>
      <Text>SettingScreen</Text>
      <Button
        title='Home'
        onPress={() => navigation.navigate('Main', { screen: 'Home' })}
      />
    </ScrollView>
  )
}
