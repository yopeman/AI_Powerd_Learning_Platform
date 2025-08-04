import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';

export default function CertificateScreen({navigation}) {
  return (
    <ScrollView>
      <Text>CertificateScreen</Text>
      <Button
        title='Home'
        onPress={()=> navigation.navigate('Main', { screen: 'Home' })}
      />
    </ScrollView>
  )
}
