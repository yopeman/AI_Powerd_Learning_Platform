import React, { useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { useTheme } from '../Utilities/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { get_chapters, get_course_by_id } from '../Utilities/operations';

export default function CourseScreen({ navigation, route }) {
  const { courseId } = route.params;
  const [course, setCourse] = React.useState(null);
  const [chapters, setChapters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { colors, textSizes, textSize } = useTheme();

  useEffect(() => {
    const fetchCourseAndChapters = async () => {
      setLoading(true);
      try {
        const [courseResponse, chapterResponse] = await Promise.all([
          get_course_by_id(courseId),
          get_chapters(courseId)
        ]);

        setCourse(courseResponse.data);
        const sortedChapters = chapterResponse.data.sort((a, b) => a.order - b.order);
        setChapters(sortedChapters);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndChapters();
  }, [courseId]);




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
    },
    header: {
      padding: 16,
      borderRadius: 16,
      backgroundColor: colors.card,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    title: {
      fontSize: textSizes[textSize] + 6,
      fontWeight: 'bold',
      marginBottom: 8,
      color: colors.text,
    },
    subtitle: {
      fontSize: textSizes[textSize],
      color: colors.text,
      opacity: 0.8,
      marginBottom: 4,
    },
    courseInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    sectionTitle: {
      fontSize: textSizes[textSize] + 4,
      fontWeight: '600',
      marginBottom: 16,
      color: colors.text,
    },
    chapterCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    chapterText: {
      flex: 1,
      marginLeft: 16,
    },
    chapterTitle: {
      fontSize: textSizes[textSize] + 2,
      fontWeight: '600',
      color: colors.text,
    },
    chapterDesc: {
      fontSize: textSizes[textSize] - 2,
      color: colors.text,
      opacity: 0.7,
      marginTop: 4,
    },
  });





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
        <Text style={styles.title}>{course?.title}</Text>
        <Text style={styles.subtitle}>{course?.description}</Text>
        
        <View style={styles.courseInfo}>
          <Text style={styles.subtitle}>Year: {course?.year}</Text>
          <Text style={styles.subtitle}>Semester: {course?.semester}</Text>
          <Text style={styles.subtitle}>Chapters: {course?.chapters_length}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Course Content</Text>

      {chapters.map((chapter) => (
        <TouchableOpacity
          key={chapter.id}
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter', { chapterId: chapter.id })}
        >
          <MaterialCommunityIcons 
            name="book-variant" 
            size={32} 
            color={colors.primary} 
          />
          <View style={styles.chapterText}>
            <Text style={styles.chapterTitle}>
              Chapter {chapter.order}: {chapter.title}
            </Text>
            <Text style={styles.chapterDesc}>
              {chapter.description}
            </Text>
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
}
