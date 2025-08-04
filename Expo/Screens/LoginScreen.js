import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  Alert, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authApi } from '../Utilities/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ setIsAuth }) {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    
    try {
      const response = await authApi.post('/login', formData);
      const { success, data, message: responseMessage } = response.data;

      if (success) {
        if (data.user.role === 'student') {
          await AsyncStorage.setItem('response', JSON.stringify(data));
          setIsAuth(true);
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
          });
        } else {
          setMessage({ text: 'You need student privileges to access this app', type: 'error' });
        }
      } else {
        setMessage({ text: responseMessage, type: 'error' });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    setMessage({ text: '', type: '' }); // Clear message on reset
  };

  const toggleSecureEntry = () => {
    setSecureEntry(prev => !prev);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      {message.text && (
        <Text style={message.type === 'error' ? styles.error : styles.success}>
          {message.text}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          testID="emailInput"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry={secureEntry}
          testID="passwordInput"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={toggleSecureEntry}>
          <Text>{secureEntry ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => Alert.alert('Forgot Password?', 'Feature coming soon!')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
          <Button title="Login" onPress={handleSubmit} disabled={loading} />
          <View style={styles.buttonSpacer} />
          <Button title="Clear Form" onPress={resetForm} color="#999" />
        </>
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
  buttonSpacer: {
    height: 15,
  },
  forgotPassword: {
    color: '#007bff',
    textAlign: 'right',
    marginBottom: 25,
    fontSize: 16,
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
  },
});