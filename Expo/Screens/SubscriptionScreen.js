import React, { useEffect, useState } from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { useTheme } from '../Utilities/ThemeContext';
import { get_all_fields, subscribe_field } from "../Utilities/operations";

const SubscriptionScreen = ({ navigation }) => {
  const { colors, textSizes, textSize } = useTheme();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      try {
        const response = await get_all_fields();
        setFields(response.data);
        setError(null);
        setSuccess(response.data.message);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setSuccess(null);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);

  const handleSubscribe = async (fieldId) => {
    setLoading(true);
    try {
      const result = await subscribe_field(fieldId);
      console.log(result);
      setSuccess(result.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setSuccess(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Fields</Text>
        <Text style={styles.subtitle}>Subscribe to new learning paths</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && <Text style={styles.successText}>{success}</Text>}

      {fields.map((field) => (
        <View key={field.id} style={styles.card}>
          <Text style={styles.fieldTitle}>{field.title}</Text>
          <Text style={styles.fieldDescription}>{field.description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{field.years_length} years</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Free Content</Text>
              <Text style={styles.metaValue}>
                {field.isFree ? 'Full access' : `${field.number_of_free_topics} topics`}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleSubscribe(field.id)}
          >
            <Text style={styles.buttonText}>
              {field.isFree ? 'Get Started' : 'Subscribe Now'}
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    opacity: 0.8,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  fieldTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  fieldDescription: {
    fontSize: 16,
    color: '#666',
    opacity: 0.8,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 14,
    color: '#666',
    opacity: 0.6,
  },
  metaValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
  },
  successText: {
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default SubscriptionScreen;