import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { useTheme } from '../Utilities/ThemeContext';
import { get_courses, get_field_by_id } from '../Utilities/operations';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FieldScreen = ({ navigation, route }) => {
  if (!route.params) {
    navigation.goBack();
  }


  const { fieldId } = route.params;
  const { colors, textSizes, textSize } = useTheme();
  
  const [field, setField] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [fieldResponse, coursesResponse] = await Promise.all([
          get_field_by_id(fieldId),
          get_courses(fieldId),
        ]);
        setField(fieldResponse.data);
        setCourses(coursesResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fieldId]);

  const maxYearLength = Math.max(...courses.map(c => c.year), 0);
  const maxSemesterLength = Math.max(...courses.map(c => c.semester), 0);

  const filterCoursesByYearAndSemester = (year, semester) => {
    return courses.filter(course => course.year === year && course.semester === semester);
  };

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{field.title}</Text>
        <Text style={styles.description}>{field.description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaPill}>
            <MaterialCommunityIcons name="clock" size={16} color={colors.primary} />
            <Text style={styles.metaText}>{field.years_length} years</Text>
          </View>
          <View style={styles.metaPill}>
            <MaterialCommunityIcons 
              name={field.isFree ? "lock-open" : "lock"} 
              size={16} 
              color={colors.primary} 
            />
            <Text style={styles.metaText}>
              {field.isFree ? 'Free' : `${field.number_of_free_topics} free topics`}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Curriculum</Text>

      {Array.from({ length: maxYearLength }, (_, yearIndex) => (
        <View key={yearIndex} style={styles.yearContainer}>
          <Text style={styles.yearHeader}>Year {yearIndex + 1}</Text>
          {Array.from({ length: maxSemesterLength }, (_, semesterIndex) => {
            const semesterCourses = filterCoursesByYearAndSemester(yearIndex + 1, semesterIndex + 1);
            return semesterCourses.length > 0 ? (
              <View key={semesterIndex} style={styles.semesterContainer}>
                <Text style={styles.semesterHeader}>Semester {semesterIndex + 1}</Text>
                {semesterCourses.map(course => (
                  <TouchableOpacity
                    key={course.id}
                    style={styles.courseCard}
                    onPress={() => navigation.navigate('Course', { courseId: course.id })}
                  >
                    <MaterialCommunityIcons 
                      name="book-open-page-variant" 
                      size={24} 
                      color={colors.primary} 
                    />
                    <View style={styles.courseText}>
                      <Text style={styles.courseTitle}>{course.title}</Text>
                      <Text style={styles.courseDesc}>{course.description}</Text>
                    </View>
                    <MaterialCommunityIcons 
                      name="chevron-right" 
                      size={24} 
                      color={colors.text + '80'} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ) : null;
          })}
        </View>
      ))}

      <View style={styles.certificateCard}>
        <MaterialCommunityIcons 
          name="certificate" 
          size={48} 
          color={colors.primary} 
          style={{ marginBottom: 16 }}
        />
        <Text style={styles.certificateText}>
          Complete this field to earn a certificate
        </Text>
        <TouchableOpacity 
          style={styles.certificateButton}
          onPress={() => navigation.navigate('Certificate', { fieldId: field.id })}
        >
          <Text style={styles.certificateButtonText}>
            View Certificate Requirements
          </Text>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    opacity: 0.8,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  metaPill: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  yearContainer: {
    marginBottom: 32,
  },
  yearHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  semesterContainer: {
    marginBottom: 24,
  },
  semesterHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  courseCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseText: {
    flex: 1,
    marginLeft: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  courseDesc: {
    fontSize: 14,
    color: '#666',
    opacity: 0.7,
    marginTop: 4,
  },
  certificateCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  certificateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  certificateButton: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  certificateButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default FieldScreen;