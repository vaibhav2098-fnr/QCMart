import React from 'react';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryScreen, HomeScreen, LoginScreen, MostPopularScreen, OTPScreen, ProductDetailScreen, SignUpScreen, CartScreen, CheckoutScreen, ShippingAddressScreen, ChooseShippingScreen, AddPromoScreen, NotificationScreen, ProductCategoriesScreen } from '../../screens';
import BottomTabNavigator from '../BottomTabNavigator';
import ComingSoonScreen from '../../screens/comingsoon-screen/comingsoon-screen';

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
      initialRouteName="MainTabs"
      screenOptions={
        {
          headerShown: false,
        } as NativeStackNavigationOptions
      }>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="category" component={CategoryScreen} />
      <Stack.Screen name="mostpopular" component={MostPopularScreen} />
      <Stack.Screen name="productDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen} />
      <Stack.Screen name="ChooseShipping" component={ChooseShippingScreen} />
      <Stack.Screen name="AddPromo" component={AddPromoScreen} />
      <Stack.Screen name="comingSoon" component={ComingSoonScreen} />
      <Stack.Screen name="notification" component={NotificationScreen} />
      <Stack.Screen name="productCategories" component={ProductCategoriesScreen} />
    </Stack.Navigator>
  );
};
