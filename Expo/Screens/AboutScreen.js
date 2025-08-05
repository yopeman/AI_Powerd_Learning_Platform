import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../Utilities/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

export default function About() {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('3'); // Default rating
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const rsp = await AsyncStorage.getItem('response');
      const response = await api(JSON.parse(rsp).token).post('/feedbacks', { content, rating });
      if (response.data.success) {
        setSuccess('Feedback successfully submitted');
        setContent('');
        setRating('3'); // Reset to default rating
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Feedback submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setContent('');
    setRating('3');
    setError('');
    setSuccess('');
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text>This is the AiPLP learning platform.</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}
      <TextInput
        style={styles.textInput}
        value={content}
        onChangeText={setContent}
        placeholder="Enter your feedback"
        multiline
        required
      />
      <Text style={styles.label}>Rate (1-5):</Text>
      <Picker
        selectedValue={rating}
        style={styles.picker}
        onValueChange={(itemValue) => setRating(itemValue)}
      >
        <Picker.Item label="1 Star" value="1" />
        <Picker.Item label="2 Stars" value="2" />
        <Picker.Item label="3 Stars" value="3" />
        <Picker.Item label="4 Stars" value="4" />
        <Picker.Item label="5 Stars" value="5" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
      <Text>.</Text>
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
});