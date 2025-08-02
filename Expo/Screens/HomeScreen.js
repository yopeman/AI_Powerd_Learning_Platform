import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title='Learn'
        onPress={() => navigation.navigate('Learn')}
      />
      <Button
        title='Subscription'
        onPress={() => navigation.navigate('Subscription')}
      />
      <Button
        title='Payment'
        onPress={() => navigation.navigate('Learn', { screen: 'Payment' })}
      />
    </View>
  )
}
