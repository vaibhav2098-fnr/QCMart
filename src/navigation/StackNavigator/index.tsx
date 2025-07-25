import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../../screens/auth-module/sign-in-screen/sign-in-screen';

const Stack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={
        {
          headerShown: false,
        } as NativeStackNavigationOptions
      }>
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={
        {
          headerShown: false,
        } as NativeStackNavigationOptions
      }>
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
