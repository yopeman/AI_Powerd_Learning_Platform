import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, Text } from 'react-native';
import { AuthProvider, AuthContext } from './Utilities/AuthContext';

// Import screens
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SubscriptionScreen from './Screens/SubscriptionScreen';
import ProfileScreen from './Screens/ProfileScreen';
import FieldScreen from './Screens/FieldScreen';
import CourseScreen from './Screens/CourseScreen';
import ChapterScreen from './Screens/ChapterScreen';
import TopicScreen from './Screens/TopicScreen';
import PaymentScreen from './Screens/PaymentScreen';
import SettingScreen from './Screens/SettingScreen';
import AboutScreen from './Screens/AboutScreen';
import CertificateScreen from './Screens/CertificateScreen';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function LearningNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }} initialRouteName='Field'>
      <Stack.Screen name="Field" component={FieldScreen} />
      <Stack.Screen name="Course" component={CourseScreen} />
      <Stack.Screen name="Chapter" component={ChapterScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
      <Stack.Screen name="Certificate" component={CertificateScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelPosition: 'below-icon' }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({navigation}) => ({
          title: 'Home',
          headerRight: () => (
            <Button
              title="Setting"
              onPress={() => navigation.navigate('Setting')}
            />
          ),
        })}
      />
      <Tab.Screen 
        name="Subscription" 
        component={SubscriptionScreen} 
        options={({ navigation }) => ({
          title: 'Subscription',
          headerRight: () => (
            <Button
              title="Payment"
              onPress={() => navigation.navigate('Payment')}
            />
          ),
        })}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={({navigation}) => ({
          title: 'Profile',
          headerRight: () => (
            <Button
              title="About Us"
              onPress={() => navigation.navigate('About')}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen 
        name="Learn" 
        component={LearningNavigator} 
        options={{ drawerLabel: 'Learning' }}
      />
      {/*<Drawer.Screen */}
      {/*  name="Setting" */}
      {/*  component={SettingScreen} */}
      {/*  options={{ drawerLabel: 'Settings' }}*/}
      {/*/>*/}
      {/*<Drawer.Screen */}
      {/*  name="About" */}
      {/*  component={AboutScreen} */}
      {/*  options={{ drawerLabel: 'About Us' }}*/}
      {/*/>*/}
    </Drawer.Navigator>
  );
}

function RootNavigator(props) {
  const {
    isAuthenticated, 
    loading,
    signIn, 
    signOut
  } = useContext(AuthContext);

  return (
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen 
              name="MainApp" 
              component={MainDrawer} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login" 
              options={{ headerShown: false }}
            >
              {props => <LoginScreen {...props} setIsAuth={signIn} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              options={{ title: 'Create Account' }}
            >
              {props => <RegisterScreen {...props} setIsAuth={signIn} />}
            </Stack.Screen>
            {/*<Stack.Screen */}
            {/*  name="Register" */}
            {/*  component={RegisterScreen} */}
            {/*  options={{ title: 'Create Account' }}*/}
            {/*/>*/}
          </>
        )}
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}