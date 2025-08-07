import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Utilities/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { authApi } from '../Utilities/api';
import { APP_ID } from "../Utilities/operations";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ setIsAuth }) {
  const navigation = useNavigation();
  const { colors, textSizes, textSize } = useTheme();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: APP_ID(),
    confirm_password: APP_ID(),
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    // Password confirmation check
    if (formData.password !== formData.confirm_password) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.post('/register', formData);
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
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
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
      password: APP_ID(),
      confirm_password: APP_ID(),
    });
    setMessage({ text: '', type: '' });
  };

  const fields = [
    { name: 'first_name', label: 'First Name', icon: 'person' },
    { name: 'last_name', label: 'Last Name', icon: 'person' },
    { name: 'email', label: 'Email Address', icon: 'email', keyboardType: 'email-address' },
    { name: 'phone', label: 'Phone Number', icon: 'phone', keyboardType: 'phone-pad' },
    // { name: 'password', label: 'Password', icon: 'lock' },
    // { name: 'confirm_password', label: 'Confirm Password', icon: 'lock' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <MaterialIcons name="person-add" size={36} color={colors.primary} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us to start your learning journey</Text>
        </View>

        {message.text && (
          <View style={[styles.messageContainer, { backgroundColor: message.type === 'error' ? colors.error + '20' : '#4CAF50' + '20' }]}>
            <Text style={[styles.messageText, { color: message.type === 'error' ? colors.error : '#4CAF50' }]}>{message.text}</Text>
          </View>
        )}

        {fields.map((field) => (
          <View key={field.name} style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{field.label}</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons 
                name={field.icon} 
                size={20} 
                color={colors.text + '80'} 
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                placeholderTextColor={colors.text + '80'}
                value={formData[field.name]}
                onChangeText={text => handleChange(field.name, text)}
                secureTextEntry={field.name.includes('password') && !showPassword}
                autoCapitalize={field.name === 'email' ? 'none' : 'words'}
                keyboardType={field.keyboardType || 'default'}
                autoCorrect={false}
              />
              {field.name.includes('password') && (
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons 
                    name={showPassword ? "visibility-off" : "visibility"} 
                    size={20} 
                    color={colors.text + '80'} 
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <Text style={styles.securityNote}>
          Passwords are securely generated and managed by the app.
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            <TouchableOpacity 
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={resetForm}
            >
              <Text style={styles.secondaryButtonText}>Clear Form</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
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
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#333',
    paddingVertical: 16,
  },
  icon: {
    marginRight: 12,
  },
  passwordToggle: {
    padding: 8,
  },
  messageContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
  },
  securityNote: {
    fontSize: 14,
    color: '#666',
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  secondaryButtonText: {
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    opacity: 0.8,
  },
  footerLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});