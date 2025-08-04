import React, {useEffect, useState} from 'react';
import {View, Text, Button, ActivityIndicator, ScrollView} from 'react-native';
import {get_chapter_by_id, get_topics} from "../Utilities/operations";

export default function ChapterScreen({navigation, route}) {
  const { chapterId } = route.params;
  const [chapter, setChapter] = useState(null);
  const [topics, setTopics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getChapterAndTopics = async () => {
      try {
        const [chapterRespnse, topicRespnse] = await Promise.all([
          get_chapter_by_id(chapterId),
          get_topics(chapterId)
        ]);

        setChapter(chapterRespnse.data);
        setTopics(topicRespnse.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    getChapterAndTopics();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>Chapter Description</Text>
      <View>
        <Text>Chapter - {chapter.order}</Text>
        <Text>Title: {chapter.title}</Text>
        <Text>Description: {chapter.description}</Text>
        <Text>Created At: {new Date(chapter.createdAt).toLocaleString()}</Text>
        <Text>Updated At: {new Date(chapter.updatedAt).toLocaleString()}</Text>
      </View>

      <View>.</View><View>.</View><View>.</View>

      {topics && topics.map((topic, index) => (
        <View key={index}>
          <Button title={topic.title} onPress={() => navigation.navigate('Topic', { topicId: topic.id })}/>
        </View>
      ))}
    </ScrollView>
  )
}
