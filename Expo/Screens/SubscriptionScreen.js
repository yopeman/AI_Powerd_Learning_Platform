import React, {useState, useEffect} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {get_all_fields, subscribe_field} from "../Utilities/operations";

export default function SubscriptionScreen({navigation}) {
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
        const flds = await get_all_fields();
        setFields(flds.data);
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

  const handleSubscribe = async (fieldId) => {
    console.log(fieldId);
    setLoading(true);
    try {
      const subscribe = await subscribe_field(fieldId);
      setSuccess(subscribe);
      setError(null);
      console.log(subscribe);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <View><Text>Loading ...</Text></View>;
  return (
    <ScrollView>
      <Text>Subscribe New Fields</Text>
      <Text>Select field to subscribe</Text>
      {error && (<Text>{error}</Text>)}
      {success && (<Text>{success}</Text>)}

      <Text>.</Text><Text>.</Text><Text>.</Text>

      {fields.map((field) => (
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
            onPress={() => handleSubscribe(field.id)}
            title='Subscribe Now'
          />
        </>
      ))}
    </ScrollView>
  )
}
