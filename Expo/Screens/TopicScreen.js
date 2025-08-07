import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet, Keyboard 
} from 'react-native';
import { useTheme } from '../Utilities/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { /* preventScreenCapture, */ allowScreenCaptureAsync } from 'expo-screen-capture';
import { get_topic_content, get_topic_interactions, ask_about_topic } from '../Utilities/operations';
import Markdown from 'react-native-markdown-display';

const TopicScreen = ({ navigation, route }) => {
  const { topicId } = route.params;
  const { colors, textSizes, textSize } = useTheme();
  
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [ask, setAsk] = useState('');
  const [sending, setSending] = useState(false);

  // Prevent screenshots for educational content
  // useEffect(() => {
  //   // preventScreenCapture();
  //   return () => allowScreenCaptureAsync();
  // }, []);

  // Fetch topic content
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await get_topic_content(topicId);
        setContent(response.data);
        fetchInteractions();
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [topicId]);

  // Fetch interactions
  const fetchInteractions = async () => {
    try {
      const interactionResponse = await get_topic_interactions(topicId);
      setInteractions(interactionResponse?.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleSend = useCallback(async () => {
    if (ask.trim()) {
      try {
        setSending(true);
        Keyboard.dismiss();
        
        await ask_about_topic(topicId, ask);
        setAsk(''); // Clear the input after sending
        fetchInteractions(); // Refresh interactions
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to send question');
      } finally {
        setSending(false);
      }
    }
  }, [ask, topicId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
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
      <View style={styles.contentCard}>
        {content && <Markdown>{content}</Markdown>}
      </View>

      <Text style={styles.sectionHeader}>Topic Discussion</Text>

      {interactions && interactions.length > 0 ? (
        interactions.map((interaction, index) => (
          <View key={index} style={styles.interactionCard}>
            <View style={styles.interactionHeader}>
              <MaterialIcons name="person" size={20} color={colors.primary} />
              <Text style={styles.questionText}> {interaction.questions}</Text>
            </View>
            <View style={styles.interactionResponse}>
              <MaterialIcons name="smart-toy" size={20} color={colors.primary} />
              <Text style={styles.responseText}> {interaction.response}</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="forum" size={48} color={colors.text + '50'} />
          <Text style={styles.emptyText}>No discussions yet. Be the first to ask a question!</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask something about this topic..."
          placeholderTextColor={colors.text + '80'}
          value={ask}
          onChangeText={setAsk}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!ask.trim() || sending}
        >
          <MaterialIcons 
            name={sending ? "hourglass-top" : "send"} 
            size={24} 
            color={ask.trim() ? colors.primary : colors.text + '50'} 
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  contentCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  interactionCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  interactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  interactionResponse: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  responseText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    padding: 10,
  },
});

export default TopicScreen;