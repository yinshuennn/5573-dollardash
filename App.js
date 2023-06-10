import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from './screens/Launch';
import LoginScreen from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import SignUpScreen from './screens/SignUp';
import Home from './screens/Home';
import AddNewExpense from './screens/AddNewExpense';
import Profile from './screens/Profile';
import EditEmail from './screens/EditEmail';
import ChangePassword from './screens/ChangePassword';
import Notifications from './screens/Notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Launch" component={LaunchScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="AddNewExpense" component={AddNewExpense} />
        <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
        <Stack.Screen options={{ headerShown: false }} name="EditEmail" component={EditEmail} />
        <Stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePassword} />
        <Stack.Screen options={{ headerShown: false }} name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
