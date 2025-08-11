import React, { useEffect, useState } from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { get_all_fields, subscribe_field } from "../Utilities/operations";
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/SubscriptionStyle";

const SubscriptionScreen = ({ navigation }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {colors, textSize} = useTheme();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

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
      setSuccess(result.message);
      setError(null);
      navigation.navigate('Home', { fId: result.data.id });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setSuccess(null);
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

export default SubscriptionScreen;