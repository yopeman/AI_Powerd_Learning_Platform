import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { ask_about_topic, get_topic_content, get_topic_interactions } from '../Utilities/operations';
import Markdown from 'react-native-markdown-display';

export default function TopicScreen({ navigation, route }) {
  const { topicId } = route.params;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interactions, setInteractions] = useState(null);
  const [ask, setAsk] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await get_topic_content(topicId);
        setContent(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [topicId]);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const interactionResponse = await get_topic_interactions(topicId);
        setInteractions(interactionResponse.data);
        console.log(interactionResponse);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    if (topicId) {
      fetchInteractions();
    }
  }, [topicId]);

  const handleSend = async () => {
    if (ask.trim()) {
      try {
        await ask_about_topic(topicId, ask);
        setAsk(''); // Clear the input after sending
        const interactionResponse = await get_topic_interactions(topicId);
        setInteractions(interactionResponse.data);
        console.log(interactionResponse);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Topic</Text>
      <Text>.</Text>
      {content && <Markdown>{content}</Markdown>}

      <Text>.</Text><Text>.</Text>
      <Text>interactions</Text>

      {interactions && interactions.map((interaction, index) => (
        <View key={index}>
          <Text>You: {interaction.questions}</Text>
          <Text>AiPLP: {interaction.response}</Text>
        </View>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Your question here ..."
        value={ask}
        onChangeText={setAsk}
        autoCorrect={true}
      />
      <Button title="Send" onPress={handleSend} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginVertical: 16,
  },
});