import React, { useEffect, useState } from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { useTheme } from '../Utilities/ThemeContext';
import { get_chapter_by_id, get_topics } from '../Utilities/operations';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChapterScreen = ({ navigation, route }) => {
  const { chapterId } = route.params;
  const { colors, textSizes, textSize } = useTheme();
  
  const [chapter, setChapter] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [chapterResponse, topicsResponse] = await Promise.all([
          get_chapter_by_id(chapterId),
          get_topics(chapterId),
        ]);
        setChapter(chapterResponse.data);
        setTopics(topicsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [chapterId]);

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
      <View style={styles.header}>
        <Text style={styles.chapterNumber}>Chapter {chapter.order}</Text>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
        <Text style={styles.description}>{chapter.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>Topics in this Chapter</Text>

      {topics.map((topic, index) => (
        <TouchableOpacity
          key={topic.id}
          style={styles.topicCard}
          onPress={() => navigation.navigate('Topic', { topicId: topic.id })}
        >
          <View style={styles.topicIndex}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
          <View style={styles.topicContent}>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>15 min read</Text>
            </View>
          </View>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={24} 
            color={colors.text + '80'} 
          />
        </TouchableOpacity>
      ))}
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
  header: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  chapterNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007BFF',
    marginBottom: 8,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  topicCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicIndex: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007BFF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  indexText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  durationBadge: {
    backgroundColor: '#007BFF20',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  durationText: {
    fontSize: 14,
    color: '#007BFF',
  },
});

export default ChapterScreen;