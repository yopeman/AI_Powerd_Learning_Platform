import React, { useEffect, useState } from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { get_my_fields, unsubscribe_fields } from "../Utilities/operations";
import { useTheme } from '../Utilities/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { colors, textSizes, textSize } = useTheme();
  const [fields, setFields] = useState([]);
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await get_my_fields();
        setFields(response.data.fields);
        setSubscriptions(response.data.subscriptions);
        console.log(response.data);
        
        // Simulate progress data - in a real app, this would come from the API
        const progress = {};
        response.data.fields.forEach(field => {
          progress[field.id] = {
            completed: Math.floor(Math.random() * field.number_of_free_topics),
            total: field.number_of_free_topics
          };
        });
        setProgressData(progress);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);

  const handleLearn = (fieldId) => {
    navigation.navigate('Learn', { screen: 'Field', params: { fieldId } });
  };

  const handleUnsubscribe = async (fieldId) => {
    setLoading(true);
    setError(null);
    try {
      const subsToUnsubscribe = subscriptions.filter(sub => sub.fieldId === fieldId);
      await Promise.all(subsToUnsubscribe.map(s => unsubscribe_fields(s.id))); // Unsubscribe all at once
      setFields(fields.filter(field => field.id !== fieldId)); // Remove field from state
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.background,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: textSizes[textSize] + 10,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: textSizes[textSize],
      color: colors.text,
      opacity: 0.8,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    fieldHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    fieldIcon: {
      backgroundColor: colors.primary + '20',
      borderRadius: 12,
      padding: 8,
      marginRight: 16,
    },
    fieldTitle: {
      fontSize: textSizes[textSize] + 4,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    progressContainer: {
      marginBottom: 16,
    },
    progressText: {
      fontSize: textSizes[textSize] - 2,
      color: colors.text,
      opacity: 0.8,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.background,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    primaryButton: {
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonText: {
      fontSize: textSizes[textSize],
      fontWeight: '500',
    },
    primaryButtonText: {
      color: '#FFF',
    },
    secondaryButtonText: {
      color: colors.text,
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
    },
    emptyIcon: {
      marginBottom: 24,
    },
    emptyText: {
      fontSize: textSizes[textSize],
      color: colors.text,
      opacity: 0.7,
      textAlign: 'center',
      marginBottom: 24,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Learning</Text>
        <Text style={styles.subtitle}>Continue your educational journey</Text>
      </View>

      {error && (
        <View style={styles.card}>
          <Text style={{ color: colors.error, textAlign: 'center' }}>{error}</Text>
        </View>
      )}

      {fields.length > 0 ? (
        fields.map(field => {
          const progress = progressData[field.id] || { completed: 0, total: 1 };
          const progressPercent = (progress.completed / progress.total) * 100;
          
          return (
            <View key={field.id} style={styles.card}>
              <View style={styles.fieldHeader}>
                <View style={styles.fieldIcon}>
                  <MaterialCommunityIcons 
                    name="book-open-page-variant" 
                    size={24} 
                    color={colors.primary} 
                  />
                </View>
                <Text style={styles.fieldTitle}>{field.title}</Text>
              </View>
              
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>Your progress: {progress.completed}/{progress.total} topics</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.primaryButton]}
                  onPress={() => handleLearn(field.id)}
                >
                  <Text style={[styles.buttonText, styles.primaryButtonText]}>
                    {progressPercent > 0 ? 'Continue' : 'Start Learning'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => handleUnsubscribe(field.id)}
                >
                  <Text style={[styles.buttonText, styles.secondaryButtonText]}>Unsubscribe</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons 
            name="book-open-blank-variant" 
            size={64} 
            color={colors.text + '30'} 
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>
            You haven't subscribed to any fields yet. Explore our catalog to find courses that interest you.
          </Text>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Browse Fields</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;