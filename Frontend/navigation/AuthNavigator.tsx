import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ✅ Importation de tes écrans
import WelcomeAuthScreen from '../screens/Auth/WelcomeAuthScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// ✅ Définition du type de navigation
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

// ✅ Création du stack
const Stack = createNativeStackNavigator<RootStackParamList>();

// ✅ Définition du composant de navigation
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeAuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
