import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
import { get_my_fields, unsubscribe_fields } from "../Utilities/operations";

const HomeScreen = ({ navigation }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await get_my_fields();
        setFields(response.data.fields);
        setSubscriptions(response.data.subscriptions);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);

  const handleLearn = (fieldId) => {
    navigation.navigate('Learn', { screen: 'Field', params: { fieldId } });
  };

  const handleUnsubscribe = async (fieldId) => {
    setLoading(true);
    setError(null);
    try {
      const subsToUnsubscribe = subscriptions.filter(sub => sub.fieldId === fieldId);
      await Promise.all(subsToUnsubscribe.map(s => unsubscribe_fields(s.id))); // Unsubscribe all at once
      navigation.navigate('Home'); // Reload the page
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Subscribed Fields</Text>
      <Text style={{ marginBottom: 20 }}>Select a field to learn</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {fields.length > 0 ? (
        fields.map(field => (
          <View key={field.id} style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ fontWeight: 'bold' }}>Title: {field.title}</Text>
            <Text>Description: {field.description}</Text>
            <Text>Years Length: {field.years_length}</Text>
            <Text>Is Free: {field.isFree ? 'Yes' : 'No'}</Text>
            <Text>Number Of Free Topics: {field.number_of_free_topics}</Text>
            <Text>Created At: {new Date(field.createdAt).toLocaleString()}</Text>
            <Text>Updated At: {new Date(field.updatedAt).toLocaleString()}</Text>
            <Button onPress={() => handleLearn(field.id)} title='Learn Now' />
            <Button onPress={() => handleUnsubscribe(field.id)} title='Unsubscribe' />
          </View>
        ))
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text>No subscribed fields found.</Text>
          <Button title='Subscribe now' onPress={() => navigation.navigate('Subscription')} />
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;