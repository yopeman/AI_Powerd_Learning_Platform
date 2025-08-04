import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
import { get_courses, get_field_by_id } from '../Utilities/operations';

export default function FieldScreen({ navigation, route }) {
  const { fieldId } = route.params;
  const [field, setField] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxYearLength, setMaxYearLength] = useState(0);
  const [maxSemesterLength, setMaxSemesterLength] = useState(0);

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

  useEffect(() => {
    if (courses.length) {
      setMaxYearLength(Math.max(...courses.map(c => c.year)));
      setMaxSemesterLength(Math.max(...courses.map(c => c.semester)));
    }
  }, [courses]);

  const filterCoursesByYearAndSemester = (year, semester) => {
    return courses.filter(course => course.year === year && course.semester === semester);
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
      <View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Field Description</Text>
      <View key={field.id} style={styles.fieldContainer}>
        <Text>Title: {field.title}</Text>
        <Text>Description: {field.description}</Text>
        <Text>Years Length: {field.years_length}</Text>
        <Text>Is Free: {field.isFree ? 'Yes' : 'No'}</Text>
        <Text>Number Of Free Topics: {field.number_of_free_topics}</Text>
        <Text>Created At: {new Date(field.createdAt).toLocaleString()}</Text>
        <Text>Updated At: {new Date(field.updatedAt).toLocaleString()}</Text>
      </View>

      {Array.from({ length: maxYearLength }, (_, yearIndex) => (
        <View key={yearIndex}>
          <Text>Year - {yearIndex + 1}</Text>
          {Array.from({ length: maxSemesterLength }, (_, semesterIndex) => {
            const filteredCourses = filterCoursesByYearAndSemester(yearIndex + 1, semesterIndex + 1);
            return (
              <View key={semesterIndex}>
                <Text>Semester {semesterIndex + 1}</Text>
                {filteredCourses.map(course => (
                  <View key={course.id} style={styles.courseContainer}>
                    <Text>Title: {course.title}</Text>
                    <Text>Description: {course.description}</Text>
                    <Button
                      title="View Course"
                      onPress={() => navigation.navigate('Course', { courseId: course.id })}
                    />
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      ))}

      <Text>Certificate</Text>
      <Button
        title='Get Certificate Now'
        onPress={() => console.log(0)}
      />
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  courseContainer: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
};