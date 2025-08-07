import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, ActivityIndicator,
  StyleSheet, Button, Linking, TouchableOpacity, Alert
} from 'react-native';
import { useTheme } from '../Utilities/ThemeContext';
import { /* preventScreenCapture, */ allowScreenCaptureAsync } from 'expo-screen-capture';
import {
  get_certification_document,
  get_certification_questions,
  submit_certification_answer_results
} from "../Utilities/operations";
import CustomAlert from "../Components/CustomAlert";
import { RadioButton, Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const CertificateScreen = ({ navigation, route }) => {
  const { fieldId } = route.params;
  const { colors, textSizes, textSize } = useTheme();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docLink, setDocLink] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const link = await get_certification_document(fieldId);
        if (link) {
          setDocLink(link);
          setModalVisible(true);
        } else {
          const response = await get_certification_questions(fieldId);
          setQuestions(response.data);
          setAnswers(Array(response.data.length).fill(null));
        }
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // preventScreenCapture();
    return () => allowScreenCaptureAsync();
  }, [fieldId, submitted]);

  const handleRetry = () => {
    setError(null);
    fetchData();
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] && answers[index].split('.')[0] === question.correct) {
        score++;
      }
    });
    return (score / questions.length) * 100;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const calculatedScore = calculateScore().toFixed(2);
      await submit_certification_answer_results(fieldId, calculatedScore);
      setScore(calculatedScore);
      setSubmitted(true);
      // navigation.navigate('CertificateScreen', { fieldId });
      // Alert.alert('Congratulations!');
      // navigation.goBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title='Retry' onPress={handleRetry} />
      </View>
    );
  }

  if (modalVisible) {
    return (
      <CustomAlert
        visible={modalVisible}
        onConfirm={() => {
          Linking.openURL(docLink);
          setModalVisible(false);
          navigation.goBack();
        }}
        onCancel={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    );
  }

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Quiz</Text>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text>{question.question}</Text>
              <RadioButton.Group
                onValueChange={value => handleAnswerChange(index, value)}
                value={answers[index]}
              >
                {question.options.map(option => (
                  <RadioButton.Item
                    label={option}
                    value={option}
                    key={option}
                  />
                ))}
              </RadioButton.Group>
            </View>
          ))}
          <Button title="Submit" style={styles.button} onPress={handleSubmit} />
          {submitted && (
            <Text style={styles.result}>Your Score: {score}%</Text>
          )}
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 12,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default CertificateScreen;