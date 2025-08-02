import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authApi } from '../Utilities/api';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Password confirmation check
    if (formData.password !== formData.confirm_password) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.post('/register', formData);
      const { success, message: responseMessage } = response.data;

      if (success) {
        setMessage({ text: 'Registration successful!', type: 'success' });
        navigation.navigate('Login');
      } else {
        setMessage({ text: responseMessage, type: 'error' });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
    });
    setMessage({ text: '', type: '' }); // Clear message on reset
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create Account</Text>
        
        {message.text && (
          <Text style={message.type === 'error' ? styles.error : styles.success}>
            {message.text}
          </Text>
        )}

        {['first_name', 'last_name', 'email', 'phone', 'password', 'confirm_password'].map((field, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
            value={formData[field]}
            onChangeText={text => handleChange(field, text)}
            secureTextEntry={field.includes('password')}
            autoCapitalize={field === 'email' ? 'none' : 'words'}
            keyboardType={field === 'email' ? 'email-address' : field === 'phone' ? 'phone-pad' : 'default'}
          />
        ))}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Register" onPress={handleSubmit} disabled={loading} />
            <View style={styles.buttonSpacer} />
            <Button title="Reset Form" onPress={resetForm} color="#999" />
          </>
        )}

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonSpacer: {
    height: 15,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});