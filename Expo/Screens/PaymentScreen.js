import React, { useEffect, useState } from 'react';
import { 
  View, Text, Button, ActivityIndicator, 
  ScrollView, StyleSheet, Picker, TouchableOpacity, 
  Alert, Linking 
} from 'react-native';
import { useTheme } from '../Utilities/ThemeContext';
import { get_my_fields, payment_init } from '../Utilities/operations';
import CustomAlert from "../Components/CustomAlert";
import { MaterialIcons } from '@expo/vector-icons';

export default function PaymentScreen({ navigation }) {
  const { colors, textSizes, textSize } = useTheme();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({ fieldId: '', year: 1, semester: 1 });
  const [modalVisible, setModalVisible] = useState(false);
  const [payment, setPayment] = useState({});
  
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
          <MaterialIcons name="lock" size={24} color="#FFF" />
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
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    flex: 1,
    marginRight: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});