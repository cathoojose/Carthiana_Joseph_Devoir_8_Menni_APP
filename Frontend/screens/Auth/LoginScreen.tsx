// screens/Auth/LoginScreen.tsx
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
  ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!identifier.trim()) {
      Alert.alert(t('error'), t('email_or_phone_required'));
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/request-otp', { identifier: identifier.trim() });
      
      if (response.data.success) {
        // Utilisateur trouvé, naviguer vers OTP ou directement vers l'app
        Alert.alert(
          'Succès', 
          'Utilisateur trouvé. Redirection...',
          [
            {
              text: 'OK',
              onPress: () => {
                // Ici vous pouvez naviguer vers OTP ou directement vers l'app principale
                // navigation.navigate('OTP', { identifier });
                
                // Pour l'instant, aller vers Welcome
                navigation.navigate('Welcome' as never);
              }
            }
          ]
        );
      }
    } catch (error: any) {
      const message = error.response?.data?.error || t('network_error');
      Alert.alert(t('error'), message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t('welcome_back')}</Text>
        <Text style={styles.subtitle}>{t('enter_email_or_phone')}</Text>

        <TextInput
          style={styles.input}
          placeholder={t('email_or_phone')}
          value={identifier}
          onChangeText={setIdentifier}
          keyboardType={identifier.includes('@') ? 'email-address' : 'phone-pad'}
          autoCapitalize="none"
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textLight} />
          ) : (
            <Text style={styles.buttonText}>{t('continue')}</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: Colors.text,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.button,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default LoginScreen;




// // screens/Auth/LoginScreen.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { Colors } from '../../constants/Colors';
// import api from '../../services/api';

// const LoginScreen = ({ navigation }: any) => {
//   const { t } = useTranslation();
//   const [identifier, setIdentifier] = useState(''); // email ou téléphone

//   const handleContinue = async () => {
//     if (!identifier.trim()) {
//       Alert.alert(t('error'), t('email_or_phone') + ' ' + t('required'));
//       return;
//     }

//     try {
//       // Vérifie si l'utilisateur existe → déclenche OTP
//       const res = await api.post('/auth/request-otp', { identifier });
//       if (res.data.success) {
//         navigation.navigate('OTP', { identifier });
//       }
//     } catch (error: any) {
//       Alert.alert('Erreur', error.response?.data?.error || 'Connexion impossible');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>{t('login')}</Text>

//       <TextInput
//         style={styles.input}
//         placeholder={t('email_or_phone')}
//         value={identifier}
//         onChangeText={setIdentifier}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleContinue}>
//         <Text style={styles.buttonText}>{t('continue')}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.background,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginBottom: 30,
//     color: Colors.text,
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
//   },
//   button: {
//     backgroundColor: Colors.button,
//     width: '100%',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: Colors.textLight,
//     fontSize: 18,
//     fontWeight: '500',
//   },
// });

// export default LoginScreen;