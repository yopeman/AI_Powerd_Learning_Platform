import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, ScrollView, StyleSheet, Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { /* preventScreenCapture, */ allowScreenCaptureAsync } from 'expo-screen-capture';
import { get_topic_content, get_topic_interactions, ask_about_topic } from '../Utilities/operations';
import Markdown from 'react-native-markdown-display';
import * as Speech from 'expo-speech';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/TopicStyle";

const TopicScreen = ({ navigation, route }) => {
  const { topicId } = route.params;

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [ask, setAsk] = useState('');
  const [sending, setSending] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const {colors, textSize} = useTheme();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

  // Prevent screenshots for educational content
  // useEffect(() => {
  //   // preventScreenCapture();
  //   return () => allowScreenCaptureAsync();
  // }, []);

  // useEffect(() => {
  //   Speech.speak(text);
  // }, [text])

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
        {playingIndex !== 'content' ? (
          <TouchableOpacity onPress={() => {
            Speech.speak(content, { onDone: () => setPlayingIndex(null) });
            setPlayingIndex('content');
          }}>
            <MaterialIcons name="play-circle" size={36} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={async () => {
            await Speech.stop();
            setPlayingIndex(null);
          }}>
            <MaterialIcons name="pause" size={36} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionHeader}>Topic Discussion</Text>

      {interactions && interactions.length > 0 ? (
        interactions.map((interaction, index) => (
          <View key={index} style={styles.interactionCard}>
            {/*| Person |*/}
            <View style={styles.interactionHeader}>
              <MaterialIcons name="person" size={20} color={colors.primary} />
              <Text style={styles.questionText}> {interaction.question}</Text>
            </View>
            {/*| Bot |*/}
            <View style={styles.interactionResponse}>
              <MaterialIcons name="smart-toy" size={20} color={colors.primary} />
              <Text style={styles.responseText}> {interaction.response}</Text>
            </View>
            {/*| Speech |*/}
            {playingIndex !== index ? (
              <TouchableOpacity onPress={() => {
                Speech.speak(interaction.response, { onDone: () => setPlayingIndex(null) });
                setPlayingIndex(index);
              }}>
                <MaterialIcons name="play-circle" size={36} color={colors.primary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={async () => {
                await Speech.stop();
                setPlayingIndex(null);
              }}>
                <MaterialIcons name="pause" size={36} color={colors.primary} />
              </TouchableOpacity>
            )}
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

export default TopicScreen;