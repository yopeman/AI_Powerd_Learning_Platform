import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {get_my_fields} from "../Utilities/operations";

export default function HomeScreen({navigation}) {
  const [fields, setFields] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const getFields = async () => {
      try {
        const flds = await get_my_fields();
        setFields(flds.data.fields);
        setError(null);
        setSuccess(null);
        console.log(flds);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setSuccess(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getFields();
  }, []);

  const handleLearn = (fieldId) => {
    navigation.navigate('Learn', { screen: 'Field', params: { fieldId } });
  }

  if (loading) return <View><Text>Loading ...</Text></View>;
  return (
    <ScrollView>
      <Text>Subscribed Fields</Text>
      <Text>Select field to learn</Text>
      {error && (<Text>{error}</Text>)}
      {success && (<Text>{success}</Text>)}

      <Text>.</Text><Text>.</Text><Text>.</Text>
      {fields ? fields.map((field) => (
        <>
          <View key={field.id}>
            <Text>Title: {field.title}</Text>
            <Text>Description: {field.description}</Text>
            <Text>Years Length: {field.years_length}</Text>
            <Text>Is Free: {field.isFree ? 'Yes' : 'No'}</Text>
            <Text>Number Of Free Topics: {field.number_of_free_topics}</Text>
            <Text>Created At: {new Date(field.createdAt).toLocaleString()}</Text>
            <Text>Updated At: {new Date(field.updatedAt).toLocaleString()}</Text>
          </View>
          <Button
            key={field.id}
            onPress={() => handleLearn(field.id)}
            title='Learn Now'
          />
        </>
      )) : (
        <>
          <Text>No subscribe field are found</Text>
          <Button title='Subscribe now' onPress={() => navigation.navigate('Subscription')} />
        </>
      )}
    </ScrollView>
  )
}
