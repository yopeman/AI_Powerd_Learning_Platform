import React from 'react';
import { View, Text, Button } from 'react-native';

export default function PaymentScreen({navigation}) {
  return (
    <View>
      <Text>PaymentScreen</Text>
      <Button
        title='Home'
        onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
      />
    </View>
  )
}
