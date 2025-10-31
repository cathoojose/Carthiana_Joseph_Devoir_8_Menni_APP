// navigation/AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import AppNavigator from './AppNavigator';
import ServiceOptionsScreen from '../screens/Client/ServiceOptionsScreen';
import TrackingScreen from '../screens/Client/TrackingScreen';



const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AppTabs" component={AppNavigator} />
      <Stack.Screen name="ServiceOptions" component={ServiceOptionsScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

























// // navigation/AuthNavigator.tsx
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import WelcomeAuthScreen from '../screens/Auth/WelcomeAuthScreen';
// import LoginScreen from '../screens/Auth/LoginScreen';
// import RegisterScreen from '../screens/Auth/RegisterScreen';

// export type RootStackParamList = {
//   Welcome: undefined;
//   Login: undefined;
//   Register: undefined;
//   OTP: { identifier: string };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const AuthNavigator = () => {
//   return (
//     <Stack.Navigator 
//       initialRouteName="Welcome"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Welcome" component={WelcomeAuthScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//     </Stack.Navigator>
//   );
// };

// export default AuthNavigator; // Export par défaut












// // // navigation/AuthNavigator.tsx
// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import LanguageSelectionScreen from '../screens/Auth/LanguageSelectionScreen';
// // import LoginScreen from '../screens/Auth/LoginScreen';
// // import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
// // import HomeScreen from '../screens/Client/HomeScreen';

// // export type RootStackParamList = {
// //   LanguageSelection: undefined;
// //   Login: undefined;
// //   OTP: { identifier: string };
// //   Home: undefined;
// //   WelcomeAuth: undefined;
// //   Register: undefined;
// // };

// // const Stack = createNativeStackNavigator<RootStackParamList>();

// // const AuthNavigator = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator
// //         initialRouteName="LanguageSelection"
// //         screenOptions={{ headerShown: false }}
// //       >
// //         <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
// //         <Stack.Screen name="Login" component={LoginScreen} />
// //         <Stack.Screen name="OTP" component={OTPVerificationScreen} />
// //         <Stack.Screen name="Home" component={HomeScreen} />
// //         <Stack.Screen name="WelcomeAuth" component={WelcomeAuthScreen} />
// //         <Stack.Screen name="Register" component={RegisterScreen} />

  

// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // };

// // export default AuthNavigator;