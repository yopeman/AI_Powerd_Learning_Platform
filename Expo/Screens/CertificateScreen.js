import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, Linking, StyleSheet, ActivityIndicator } from 'react-native';
import {
  get_certification_document,
  get_certification_questions,
  submit_certification_answer_results
} from "../Utilities/operations";
import CustomAlert from "../Components/CustomAlert";
import { RadioButton, Provider as PaperProvider } from 'react-native-paper';

const CertificateScreen = ({ navigation, route }) => {
  const { fieldId } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docLink, setDocLink] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [questions, setQuestions] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let link = await get_certification_document(fieldId);
      console.log(link);

      if (link) {
        setDocLink(link);
        setModalVisible(true);
      } else {
        const response = await get_certification_questions(fieldId);
        setQuestions(response.data);
        console.log(response);
      }
    } catch (err) {
      setError('Failed to load data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [fieldId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetry = () => {
    setError(null);
    fetchData();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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
    <ScrollView>
      <Text style={styles.headerText}>Certificate Screen</Text>
      {questions.length && (<Quiz questions={questions} fieldId={fieldId} navigation={navigation}/>)}
    </ScrollView>
  );
};

const Quiz = ({ questions, fieldId, navigation }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [docLink, setDocLink] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    console.log(calculateScore());
  };

  const calculateScore = () => {
    let score = 0;
    for(let i in answers){
      // console.log(i, answers[i]);
      if (answers[i]) {
        let c = questions[i].correct;
        let a = answers[i].split('.')[0];

        if (a === c) {
         score++;
        }
      }
    }

    return (score / questions.length) * 100;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const value = calculateScore().toFixed(2);
      console.log(value);

      await submit_certification_answer_results(fieldId, value);
      setSubmitted(true); // Mark as submitted after successful submission

      const link = await submit_certification_answer_results(fieldId);
      if (link) {
        setDocLink(link);
      }
      navigation.navigate('Certificate', { fieldId })
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (<View><Text>Loading...</Text></View>);
  }

  if (error) {
    return (<View><Text>{error}</Text></View>);
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
      <View style={styles.container}>
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
        <Button title="Submit" onPress={handleSubmit} />
        {submitted && (
          <Text style={styles.result}>
            Your Score: {calculateScore().toFixed(2)}%
          </Text>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CertificateScreen;