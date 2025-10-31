// screens/Auth/RegisterScreen.tsx
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
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { authService } from '../../services/authService';
import { useTheme } from '../../hooks/useTheme';
import ThemedView from '../../components/ThemedView';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { t } = useTranslation();
  const theme = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('client');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert(t('error'), t('all_fields_required'));
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert(t('error'), t('Veuillez entrer une adresse email valide'));
      return false;
    }

    if (!/^\+?[\d\s-]{10,}$/.test(phone)) {
      Alert.alert(t('error'), t('Veuillez entrer un numéro de téléphone valide'));
      return false;
    }

    if (password.length < 6) {
      Alert.alert(t('error'), t('password_too_short'));
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('error'), t('passwords_do_not_match'));
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      await authService.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: password,
        user_type: userType
      });

      Alert.alert(
        t('success') + ' 🎉', 
        t('account_created'),
        [
          {
            text: t('login'),
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
      
      // Reset du formulaire
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      
    } catch (error: any) {
      Alert.alert(t('error'), error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ThemedView>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.backText, { color: theme.text }]}>
                {t('back')}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.title, { color: theme.text }]}>
              {t('create_account')}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {t('join_menni_today')}
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E',
                  color: theme.text,
                }
              ]}
              placeholder={t('full_name')}
              placeholderTextColor={theme.textSecondary}
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
            
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E',
                  color: theme.text,
                }
              ]}
              placeholder={t('email')}
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E',
                  color: theme.text,
                }
              ]}
              placeholder={t('phone')}
              placeholderTextColor={theme.textSecondary}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              editable={!loading}
            />
            
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E',
                  color: theme.text,
                }
              ]}
              placeholder={t('password')}
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
            
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E',
                  color: theme.text,
                }
              ]}
              placeholder={t('confirm_password')}
              placeholderTextColor={theme.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
            />

            {/* Sélecteur de type d'utilisateur */}
            <View style={styles.userTypeContainer}>
              <Text style={[styles.userTypeLabel, { color: theme.text }]}>
                {t('Type de compte')}:
              </Text>
              <View style={styles.userTypeButtons}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    { borderColor: theme.border },
                    userType === 'client' && [styles.userTypeButtonActive, { backgroundColor: theme.primary }]
                  ]}
                  onPress={() => setUserType('client')}
                >
                  <Text style={[
                    styles.userTypeText,
                    { color: theme.textSecondary },
                    userType === 'client' && [styles.userTypeTextActive, { color: theme.textLight }]
                  ]}>
                    {t('Client')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    { borderColor: theme.border },
                    userType === 'driver' && [styles.userTypeButtonActive, { backgroundColor: theme.primary }]
                  ]}
                  onPress={() => setUserType('driver')}
                >
                  <Text style={[
                    styles.userTypeText,
                    { color: theme.textSecondary },
                    userType === 'driver' && [styles.userTypeTextActive, { color: theme.textLight }]
                  ]}>
                    {t('Livreur')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[
                styles.button, 
                { backgroundColor: theme.primary },
                loading && styles.buttonDisabled
              ]} 
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.textLight} />
              ) : (
                <Text style={[styles.buttonText, { color: theme.textLight }]}>
                  {t('register')}
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  userTypeContainer: {
    marginBottom: 20,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  userTypeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  userTypeButtonActive: {
    borderColor: 'transparent',
  },
  userTypeText: {
    fontSize: 14,
  },
  userTypeTextActive: {
    fontWeight: '500',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default RegisterScreen;








// // screens/Auth/RegisterScreen.tsx
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
//   ActivityIndicator,
//   ScrollView
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RootStackParamList } from '../../types/navigation';
// import { authService } from '../../services/authService';


// type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const RegisterScreen = () => {
//   const navigation = useNavigation<RegisterScreenNavigationProp>();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [userType, setUserType] = useState('client');
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
//       Alert.alert('Erreur', 'Tous les champs sont requis');
//       return false;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       Alert.alert('Erreur', 'Veuillez entrer une adresse email valide');
//       return false;
//     }

//     if (!/^\+?[\d\s-]{10,}$/.test(phone)) {
//       Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone valide');
//       return false;
//     }

//     if (password.length < 6) {
//       Alert.alert('Erreur', 'Le mot de passe doit avoir au moins 6 caractères');
//       return false;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
//       return false;
//     }

//     return true;
//   };

//   const handleRegister = async () => {
//     if (!validateForm()) return;

//     setLoading(true);
    
//     try {
//       await authService.register({
//         name: name.trim(),
//         email: email.trim().toLowerCase(),
//         phone: phone.trim(),
//         password: password,
//         user_type: userType
//       });

//       Alert.alert(
//         'Succès 🎉', 
//         'Compte créé avec succès!',
//         [
//           {
//             text: 'Se connecter',
//             onPress: () => navigation.navigate('Login')
//           }
//         ]
//       );
      
//       // Reset du formulaire
//       setName('');
//       setEmail('');
//       setPhone('');
//       setPassword('');
//       setConfirmPassword('');
      
//     } catch (error: any) {
//       Alert.alert('Erreur', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.backText}>Retour</Text>
//           </TouchableOpacity>

//           <Text style={styles.title}>Créer un compte</Text>
//           <Text style={styles.subtitle}>Rejoignez Menni aujourd'hui</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Nom complet"
//             value={name}
//             onChangeText={setName}
//             editable={!loading}
//           />
          
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             editable={!loading}
//           />
          
//           <TextInput
//             style={styles.input}
//             placeholder="Téléphone"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//             editable={!loading}
//           />
          
//           <TextInput
//             style={styles.input}
//             placeholder="Mot de passe"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             editable={!loading}
//           />
          
//           <TextInput
//             style={styles.input}
//             placeholder="Confirmer le mot de passe"
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry
//             editable={!loading}
//           />

//           {/* Sélecteur de type d'utilisateur */}
//           <View style={styles.userTypeContainer}>
//             <Text style={styles.userTypeLabel}>Type de compte:</Text>
//             <View style={styles.userTypeButtons}>
//               <TouchableOpacity
//                 style={[
//                   styles.userTypeButton,
//                   userType === 'client' && styles.userTypeButtonActive
//                 ]}
//                 onPress={() => setUserType('client')}
//               >
//                 <Text style={[
//                   styles.userTypeText,
//                   userType === 'client' && styles.userTypeTextActive
//                 ]}>Client</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.userTypeButton,
//                   userType === 'driver' && styles.userTypeButtonActive
//                 ]}
//                 onPress={() => setUserType('driver')}
//               >
//                 <Text style={[
//                   styles.userTypeText,
//                   userType === 'driver' && styles.userTypeTextActive
//                 ]}>Livreur</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity 
//             style={[styles.button, loading && styles.buttonDisabled]} 
//             onPress={handleRegister}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#FFFFFF" />
//             ) : (
//               <Text style={styles.buttonText}>S'inscrire</Text>
//             )}
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   safeArea: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: 24,
//   },
//   backButton: {
//     marginBottom: 20,
//   },
//   backText: {
//     fontSize: 16,
//     color: '#000000',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#000000',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666666',
//     marginBottom: 24,
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#DDDDDD',
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     backgroundColor: '#FAFAFA',
//     marginBottom: 16,
//   },
//   userTypeContainer: {
//     marginBottom: 20,
//   },
//   userTypeLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//     color: '#000000',
//   },
//   userTypeButtons: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   userTypeButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#DDDDDD',
//     alignItems: 'center',
//   },
//   userTypeButtonActive: {
//     backgroundColor: '#eabe22',
//     borderColor: '#eabe22',
//   },
//   userTypeText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   userTypeTextActive: {
//     color: '#FFFFFF',
//     fontWeight: '500',
//   },
//   button: {
//     backgroundColor: '#eabe22',
//     width: '100%',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '500',
//   },
// });

// export default RegisterScreen;