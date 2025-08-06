import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '../Utilities/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../Utilities/api';
import {APP_ID} from "../Utilities/operations";

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState(null);
  const [token, setToken] = useState(null);
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await AsyncStorage.getItem('response');
      if (response) {
        const userData = JSON.parse(response).user;
        console.log(userData);
        delete userData.password; // Remove password from user data
        setInitialValue({...userData});
        setFormData({...userData});
        setToken(JSON.parse(response).token);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (formData.password !== formData.confirm_password) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await api(token).put('/users/me', formData);
      const { success, message: responseMessage } = response.data;

      if (success) {
        setMessage({ text: 'Update successful!', type: 'success' });
        delete formData.password;
        delete formData.confirm_password;
        await AsyncStorage.setItem('response', JSON.stringify(formData));
      } else {
        setMessage({ text: responseMessage, type: 'error' });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Update failed';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialValue);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Update Account</Text>
        
        {message.text && (
          <Text style={message.type === 'error' ? styles.error : styles.success}>
            {message.text}
          </Text>
        )}

        {['first_name', 'last_name', 'email', 'phone'].map((field, index) => (
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
            <Button title="Update" onPress={handleSubmit} disabled={loading} />
            <View style={styles.buttonSpacer} />
            <Button title="Reset Form" onPress={resetForm} color="#999" />
            <View style={styles.buttonSpacer} />
            <Button title="Logout" onPress={async () => {
              try {
                await AsyncStorage.clear();
              } catch (err) {}
              finally {
                const logout = () => signOut();
                logout();
              }
            }} disabled={loading} />
          </>
        )}
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
    padding: 20,
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