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
import { useTheme } from '../Utilities/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);
  const { colors, textSizes, textSize } = useTheme();
  
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
  // const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await AsyncStorage.getItem('response');
      if (response) {
        const userData = JSON.parse(response).user;
        delete userData.password; // Remove password from user data
        setInitialValue({ ...userData });
        setFormData({ ...userData });
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
    try {
      const response = await api(token).put('/users/me', formData);
      const { success, message: responseMessage } = response.data;

      if (success) {
        setMessage({ text: 'Update successful!', type: 'success' });
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

  // const handleBiometricToggle = async () => {
  //   try {
  //     const current = await SecureStore.getItemAsync('useBiometrics');
  //     const newValue = current === 'true' ? 'false' : 'true';
  //     await SecureStore.setItemAsync('useBiometrics', newValue);
  //     setBiometricsEnabled(newValue === 'true');
  //   } catch (error) {
  //     console.error('Error toggling biometrics', error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      signOut();
    } catch (err) {
      console.error('Error during logout', err);
    }
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
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>
              {field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
            </Text>
            <TextInput
              style={styles.input}
              value={formData[field]}
              onChangeText={text => handleChange(field, text)}
              autoCapitalize={field === 'email' ? 'none' : 'words'}
              keyboardType={field === 'email' ? 'email-address' : field === 'phone' ? 'phone-pad' : 'default'}
            />
          </View>
        ))}

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity style={styles.button} onPress={resetForm} color="#999">
              <Text style={styles.buttonText}>Reset Form</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        )}

        {/*<View style={styles.section}>*/}
        {/*  <Text style={styles.sectionTitle}>Security</Text>*/}
        {/*  <TouchableOpacity */}
        {/*    style={styles.securityCard}*/}
        {/*    onPress={handleBiometricToggle}*/}
        {/*  >*/}
        {/*    <Text style={styles.securityText}>Enable Biometric Login</Text>*/}
        {/*    <MaterialIcons */}
        {/*      name={biometricsEnabled ? "toggle-on" : "toggle-off"} */}
        {/*      size={32} */}
        {/*      color={biometricsEnabled ? colors.primary : colors.text + '80'} */}
        {/*    />*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
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
  button: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginVertical: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  securityCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  securityText: {
    fontSize: 16,
    color: '#333',
  },
});