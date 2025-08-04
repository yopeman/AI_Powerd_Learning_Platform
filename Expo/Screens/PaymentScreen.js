import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator, Picker, Alert, Linking } from 'react-native';
import { get_my_fields, payment_init } from '../Utilities/operations';
import CustomAlert from "../Components/CustomAlert";

export default function PaymentScreen({ navigation }) {
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
      console.log(pymnt);
    }
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

      <Text>Field</Text>
      <Picker
        selectedValue={formData.fieldId}
        onValueChange={handleFieldChange}
      >
        {fields.map((field) => (
          <Picker.Item key={field.id} label={field.title} value={field.id} />
        ))}
      </Picker>

      <Text>Year</Text>
      <Picker
        selectedValue={formData.year}
        onValueChange={handleYearChange}
      >
        {Array.from({ length: yearsLength }, (_, i) => (
          <Picker.Item key={i + 1} label={`Year - ${i + 1}`} value={i + 1} />
        ))}
      </Picker>

      <Text>Semester</Text>
      <Picker
        selectedValue={formData.semester}
        onValueChange={handleSemesterChange}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Picker.Item key={i + 1} label={`Semester - ${i + 1}`} value={i + 1} />
        ))}
      </Picker>

      <Button title="Pay" onPress={handleSubmit} />

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

const styles = {
  container: {
    padding: 16,
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
  },
};