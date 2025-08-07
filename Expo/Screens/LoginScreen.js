import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ActivityIndicator, Keyboard, 
  Alert, ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Utilities/ThemeContext';
import { authApi } from '../Utilities/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_ID } from "../Utilities/operations";

export default function LoginScreen({ setIsAuth }) {
  const navigation = useNavigation();
  const {darkMode, colors, textSizes, textSize} = useTheme();
  const [formData, setFormData] = useState({email: '', password: APP_ID()});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({text: '', type: ''});

  const handleChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      const response = await authApi.post('/login', formData);
      const {success, data, message: responseMessage} = response.data;

      if (success) {
        if (data.user.role === 'student') {
          await AsyncStorage.setItem('response', JSON.stringify(data));
          setIsAuth(true);
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
        } else {
          setMessage({text: 'You need student privileges to access this app', type: 'error'});
        }
      } else {
        setMessage({text: responseMessage, type: 'error'});
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setMessage({text: errorMessage, type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({email: '', password: APP_ID()});
    setMessage({text: '', type: ''});
  };

//}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    title: {
      fontSize: textSizes[textSize] + 8,
      fontWeight: 'bold',
      marginBottom: 24,
      color: colors.primary,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      height: 56,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: textSizes[textSize],
      backgroundColor: colors.card,
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    buttonText: {
      color: '#FFF',
      fontSize: textSizes[textSize] + 2,
      fontWeight: '600',
    },
    clearText: {
      color: colors.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    footerText: {
      // fontSize: textSizes[textSize],
      // color: colors.text,
      // textAlign: 'center',
      // marginTop: 24,
      // opacity: 0.8,

      fontSize: 16,
      color: '#666',
      opacity: 0.8,
    },
    linkText: {
      color: colors.primary,
      // fontWeight: '600',

      fontSize: 16,
      // color: '#007BFF',
      fontWeight: '600',
      marginLeft: 8,
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
      marginBottom: 16,
      fontSize: textSizes[textSize],
    },
    successText: {
      color: colors.success,
      textAlign: 'center',
      marginBottom: 16,
      fontSize: textSizes[textSize],
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 32,
    },
  });


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {message.text && (
        <Text style={message.type === 'error' ? styles.errorText : styles.successText}>
          {message.text}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={colors.text + '80'}
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <Text style={styles.footerText}>
        Password is securely managed by the app
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary}/>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={!formData.email.trim()}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{
              backgroundColor: '#007BFF',
              borderRadius: 12,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              marginTop: 16,
            }, {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#ccc',
            }]}
            onPress={resetForm}
          >
            <Text style={styles.clearText}>Clear Form</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}