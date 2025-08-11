import React, { useEffect, useState } from 'react';
import { 
  View, Text, Button, ActivityIndicator, 
  ScrollView, StyleSheet, Picker, TouchableOpacity, 
  Alert, Linking 
} from 'react-native';
import { get_my_fields, payment_init } from '../Utilities/operations';
import CustomAlert from "../Components/CustomAlert";
import { MaterialIcons } from '@expo/vector-icons';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/PaymentStyle";

export default function PaymentScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({ fieldId: '', year: 1, semester: 1 });
  const [modalVisible, setModalVisible] = useState(false);
  const [payment, setPayment] = useState({});
  const {colors, textSize} = useTheme();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

  useEffect(() => {
    const fetchMyFields = async () => {
      setLoading(true);
      try {
        const response = await get_my_fields();
        const fetchedFields = response.data.fields;
        setFields(fetchedFields);

        if (fetchedFields.length > 0) {
          setFormData({
            fieldId: fetchedFields[0].id, // Default to the first field
            year: 1,
            semester: 1,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyFields();
  }, []);

  const handleFieldChange = (fieldId) => {
    setFormData((prevData) => ({ ...prevData, fieldId }));
  };

  const handleYearChange = (year) => {
    setFormData((prevData) => ({ ...prevData, year: parseInt(year, 10) }));
  };

  const handleSemesterChange = (semester) => {
    setFormData((prevData) => ({ ...prevData, semester: parseInt(semester, 10) }));
  };

  const initiatePayment = async () => {
    try {
      setLoading(true);
      return await payment_init(formData);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const pymnt = await initiatePayment();
    if (pymnt) {
      setPayment(pymnt);
      setModalVisible(true);
    }
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

  const selectedField = fields.find(field => field.id === formData.fieldId);
  const yearsLength = selectedField ? selectedField.years_length : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Select Field</Text>
        <Picker
          selectedValue={formData.fieldId}
          onValueChange={handleFieldChange}
          style={styles.picker}
        >
          {fields.map((field) => (
            <Picker.Item key={field.id} label={field.title} value={field.id} />
          ))}
        </Picker>

        <Text style={styles.sectionTitle}>Academic Period</Text>
        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Year</Text>
            <Picker
              selectedValue={formData.year}
              onValueChange={handleYearChange}
              style={styles.picker}
            >
              {Array.from({ length: yearsLength }, (_, i) => (
                <Picker.Item key={i + 1} label={`Year - ${i + 1}`} value={i + 1} />
              ))}
            </Picker>
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Semester</Text>
            <Picker
              selectedValue={formData.semester}
              onValueChange={handleSemesterChange}
              style={styles.picker}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Picker.Item key={i + 1} label={`Semester - ${i + 1}`} value={i + 1} />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <MaterialIcons name="lock" size={24} color={`${colors.btnText}`} />
          <Text style={styles.buttonText}>Pay Securely</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={modalVisible}
        onConfirm={() => {
          Linking.openURL(payment.data.checkout_url);
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}
