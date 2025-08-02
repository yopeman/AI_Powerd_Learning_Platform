import React from 'react';
import { View, Text, Button } from 'react-native';

export default function CertificateScreen({navigation}) {
  return (
    <View>
      <Text>CertificateScreen</Text>
      <Button
        title='Home'
        onPress={()=> navigation.navigate('Main', { screen: 'Home' })}
      />
    </View>
  )
}
