// App.tsx - CORRIGÉ
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator'; // ✅ Chemin corrigé
// import { initDatabase } from './services/database';
import './utils/i18n';

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  // useEffect(() => {
  //   const initializeDb = async () => {
  //     try {
  //       console.log('🔄 Initialisation de la base de données...');
  //       await initDatabase();
  //       setDbInitialized(true);
  //       console.log('✅ Base de données prête');
  //     } catch (error) {
  //       console.error('❌ Erreur initialisation DB:', error);
  //       setDbInitialized(true);
  //     }
  //   };

  //   initializeDb();
  // }, []);

  useEffect(() => {
  // Initialisation directe - on utilise le backend uniquement
  setDbInitialized(true);
  console.log('✅ App prête - utilisation backend uniquement');
}, []);


  if (!dbInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#eabe22" />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthNavigator />
    </NavigationContainer>
  );
}







// // App.tsx - CORRIGÉ
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import { View, Text, ActivityIndicator } from 'react-native';
// import AuthNavigator from './navigation/AuthNavigator'; // ✅ Correction ici
// import { initDatabase } from './services/database';
// import './utils/i18n';

// export default function App() {
//   const [dbInitialized, setDbInitialized] = useState(false);

//   useEffect(() => {
//     const initializeDb = async () => {
//       try {
//         console.log('🔄 Initialisation de la base de données...');
//         await initDatabase();
//         setDbInitialized(true);
//         console.log('✅ Base de données prête');
//       } catch (error) {
//         console.error('❌ Erreur initialisation DB:', error);
//         setDbInitialized(true); // Continuer quand même
//       }
//     };

//     initializeDb();
//   }, []);

//   if (!dbInitialized) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#eabe22" />
//         <Text style={{ marginTop: 10 }}>Chargement...</Text>
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <AuthNavigator /> 
//     </NavigationContainer>
//   );
// }