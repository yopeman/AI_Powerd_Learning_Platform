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
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/ProfileStyle";

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);
  
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
  const {colors, textSize} = useTheme();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

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
      <ScrollView contentContainerStyle={[styles.scrollContainer, styles.container]}>
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
            <TouchableOpacity style={[styles.button, { backgroundColor: 'transparent', colors: colors.title, borderColor: colors.border, borderWidth: 2 }]} onPress={resetForm} color={`${colors.subBgTitle}`} >
              <Text style={[styles.buttonText, { color: colors.subtitle }]}>Reset Form</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.logoutBgColor }]} onPress={handleLogout}>
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
