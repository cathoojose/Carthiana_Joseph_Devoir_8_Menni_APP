import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/Colors';

type Props = {
  navigation: any;
};

const LocationInputScreen = ({ navigation }: Props) => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleContinue = () => {
    if (!departure.trim() || !destination.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un point de départ et une destination');
      return;
    }
    navigation.navigate('ServiceOptions', { departure, destination });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Text style={styles.title}>Choisissez votre trajet</Text>

        <TextInput
          style={styles.input}
          placeholder="Point de départ (ex: Devant l’église St-Pierre)"
          value={departure}
          onChangeText={setDeparture}
          multiline
          numberOfLines={2}
        />

        <TextInput
          style={styles.input}
          placeholder="Destination (ex: Cap Haïtien)"
          value={destination}
          onChangeText={setDestination}
          multiline
          numberOfLines={2}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  keyboardView: { flex: 1 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 30, color: Colors.text, textAlign: 'center' },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.button,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: Colors.textLight, fontSize: 18, fontWeight: '500' },
});

export default LocationInputScreen;










// // frontend/screens/Client/LocationInputScreen.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { Colors } from '../../constants/Colors';

// type Props = {
//   navigation: any;
// };

// const LocationInputScreen = ({ navigation }: Props) => {
//   const { t } = useTranslation();
//   const [departure, setDeparture] = useState('');
//   const [destination, setDestination] = useState('');

//   const handleContinue = () => {
//     if (!departure.trim() || !destination.trim()) {
//       Alert.alert(t('error'), t('Veuillez entrer un point de départ et une destination'));
//       return;
//     }
//     navigation.navigate('ServiceOptions', { departure, destination });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}
//       >
//         <Text style={styles.title}>{t('Choisissez votre trajet')}</Text>

//         <TextInput
//           style={styles.input}
//           placeholder={t('Point de départ (ex: Devant l’église St-Pierre)')}
//           value={departure}
//           onChangeText={setDeparture}
//           multiline
//           numberOfLines={2}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder={t('Destination (ex: Cap Haïtien)')}
//           value={destination}
//           onChangeText={setDestination}
//           multiline
//           numberOfLines={2}
//         />

//         <TouchableOpacity style={styles.button} onPress={handleContinue}>
//           <Text style={styles.buttonText}>{t('Continuer')}</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//     padding: 20,
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginBottom: 30,
//     color: Colors.text,
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: Colors.border,
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     marginBottom: 20,
//     backgroundColor: '#FAFAFA',
//     textAlignVertical: 'top', // Pour iOS
//   },
//   button: {
//     backgroundColor: Colors.button,
//     width: '100%',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: Colors.textLight,
//     fontSize: 18,
//     fontWeight: '500',
//   },
// });

// export default LocationInputScreen;