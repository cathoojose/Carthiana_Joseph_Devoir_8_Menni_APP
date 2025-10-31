import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeAuthScreen from '../screens/Auth/WelcomeAuthScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import AppNavigator from './AppNavigator';
import ServiceOptionsScreen from '../screens/Client/ServiceOptionsScreen';
import TrackingScreen from '../screens/Client/TrackingScreen';
import RideConfirmationScreen from '../screens/Client/RideConfirmationScreen';
import RestaurantListScreen from '../screens/Restaurant/RestaurantListScreen';
import RestaurantDetailScreen from '../screens/Restaurant/RestaurantDetailScreen';
import OrderConfirmationScreen from '../screens/Restaurant/OrderConfirmationScreen';
import PaymentMethodScreen from '../screens/Client/PaymentMethodScreen';
import CashPaymentScreen from '../screens/Client/CashPaymentScreen';
import MonCashPaymentScreen from '../screens/Client/MonCashPaymentScreen';
import NatCashPaymentScreen from '../screens/Client/NatCashPaymentScreen';
import OrderSuccessScreen from '../screens/Client/OrderSuccessScreen';  
import LiveTrackingScreen from '../screens/Client/LiveTrackingScreen';
import PackageTrackingScreen from '../screens/Client/PackageTrackingScreen';
import PackageDetailsScreen from '../screens/Client/PackageDetailsScreen';
import LiveTrackingPackageScreen from '../screens/Client/LiveTrackingPackageScreen';
import EditProfileScreen from '../screens/Client/EditProfileScreen';
import ChangePasswordScreen from '../screens/Client/ChangePasswordScreen';
import LanguageSelectionScreen from '../screens/Auth/LanguageSelectionScreen';

// import PaymentSuccessScreen from '../screens/Client/PaymentSuccessScreen';
// import PaymentErrorScreen from '../screens/Client/PaymentErrorScreen';




// Utilisez le type local ou importez-le
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  AppTabs: undefined;
  ServiceOptions: { 
  departure: string; 
  destination: string;
  };
  Tracking: any;
  RideConfirmation: any;

    // Ajoutez dans RootStackParamList :
  RestaurantList: undefined;
  RestaurantDetail: { restaurant: any };
  OrderConfirmation: { item: any; restaurant: any };

  PaymentMethod: { total: number; restaurant?: any; serviceType?: string };
  CashPayment: { total: number };
  MonCashPayment: { total: number };
  NatCashPayment: { total: number };
  PaymentSuccess: undefined;
  PaymentError: { error: string };

  LiveTracking: { order: any };
  OrderSuccess: undefined;

  PackageTracking: undefined;
  PackageDetails: { package: any };
  LiveTrackingPackage: { package: any }; 
  
  EditProfileScreen: undefined;        // ✅ Ajouté
  ChangePasswordScreen: undefined;     // ✅ Ajouté
  LanguageSelectionScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeAuthScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AppTabs" component={AppNavigator} />
      <Stack.Screen name="ServiceOptions" component={ServiceOptionsScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="RideConfirmation" component={RideConfirmationScreen} />
      <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} /> 
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="CashPayment" component={CashPaymentScreen} />
      <Stack.Screen name="MonCashPayment" component={MonCashPaymentScreen} />
      <Stack.Screen name="NatCashPayment" component={NatCashPaymentScreen} />
      {/* <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="PaymentError" component={PaymentErrorScreen} /> */}
      <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />


      <Stack.Screen name="PackageTracking" component={PackageTrackingScreen} />
      <Stack.Screen name="PackageDetails" component={PackageDetailsScreen} />
      <Stack.Screen name="LiveTrackingPackage" component={LiveTrackingPackageScreen} />

      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} /> 
      <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />

          </Stack.Navigator>
  );
};

export default AuthNavigator;

