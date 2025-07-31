import React from 'react';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryScreen, HomeScreen, LoginScreen, MostPopularScreen, OTPScreen, ProductDetailScreen, SignUpScreen, CartScreen } from '../../screens';

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
      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="otp" component={OTPScreen} />
    </Stack.Navigator>
  );
};

export const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={
        {
          headerShown: false,
        } as NativeStackNavigationOptions
      }>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="category" component={CategoryScreen} />
      <Stack.Screen name="mostpopular" component={MostPopularScreen} />
      <Stack.Screen name="productDetail" component={ProductDetailScreen} />
      <Stack.Screen name="cart" component={CartScreen} />
    </Stack.Navigator>
  );
};
