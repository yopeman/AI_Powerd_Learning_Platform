import React, {useEffect} from 'react';
import {View, Text, Button, ActivityIndicator, ScrollView} from 'react-native';
import {get_chapters, get_course_by_id, get_courses, get_field_by_id} from "../Utilities/operations";

export default function CourseScreen({navigation, route}) {
  const { courseId } = route.params;
  const [course, setCourse] = React.useState(null);
  const [chapters, setChapters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    setLoading(true);
    const getCourseAndChapters = async () => {
      try {
        const [courseResponse, chapterResponse] = await Promise.all([
          get_course_by_id(courseId),
          get_chapters(courseId)
        ]);

        setCourse(courseResponse.data);
        let cptr = chapterResponse.data;
        cptr.sort((a, b) => a.order - b.order);
        setChapters(cptr);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    getCourseAndChapters();
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
      <Text>Course Description</Text>
      <View>
        <Text>Title: {course.title}</Text>
        <Text>Description: {course.description}</Text>
        <Text>Year: {course.year}</Text>
        <Text>Semester: {course.semester}</Text>
        <Text>Chapters Length: {course.chapters_length}</Text>
        <Text>Created At: {new Date(course.createdAt).toLocaleString()}</Text>
        <Text>Updated At: {new Date(course.updatedAt).toLocaleString()}</Text>
      </View>

      <View>.</View><View>.</View><View>.</View>

      {chapters && chapters.map((chapter, index) => (
        <View key={index}>
          <Text>Chapter - {chapter.order}</Text>
          <Text>Title - {chapter.title}</Text>
          <Text>Description - {chapter.description}</Text>
          <Button title='View Chapter' onPress={() => navigation.navigate('Chapter', {chapterId: chapter.id})}/>
        </View>
      ))}

    </ScrollView>
  )
}
