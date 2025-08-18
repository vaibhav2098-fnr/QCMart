import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AddPromoScreen, CartScreen, CategoryScreen, CheckoutScreen, ChooseShippingScreen, ForgotPasswordScreen, HomeScreen, LoginScreen, MostPopularScreen, MyOrdersScreen, NotificationScreen, OTPScreen, ProductCategoriesScreen, ProductDetailScreen, ProfileScreen, ShippingAddressScreen, SignUpScreen, TrackOrderScreen, WebViewScreen } from '../../screens';
import ComingSoonScreen from '../../screens/comingsoon-screen/comingsoon-screen';
import BottomTabNavigator from '../BottomTabNavigator';

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
      <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
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
      <Stack.Screen name="webView" component={WebViewScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="myOrders" component={MyOrdersScreen} />
      <Stack.Screen name="trackOrder" component={TrackOrderScreen} />
    </Stack.Navigator>
  );
};
