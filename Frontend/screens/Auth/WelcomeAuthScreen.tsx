// screens/Auth/WelcomeAuthScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
// Inline fallback LanguageSelector component because ../../components/LanguageSelector doesn't exist.
// Simple language selector that displays an icon and is a no-op; accepts iconSize prop used in this screen.
type LanguageSelectorProps = {
  iconSize?: number;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ iconSize = 20 }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={() => {
        /* placeholder: open language modal */
      }}
      style={{ position: 'absolute', right: 20, top: 10, padding: 6 }}
    >
      <Text style={{ fontSize: iconSize }}>🌐</Text>
    </TouchableOpacity>
  );
};

type WelcomeAuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const WelcomeAuthScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<WelcomeAuthScreenNavigationProp>();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Sélecteur de langue en haut à droite */}
        <LanguageSelector iconSize={22} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Menni</Text>
        </View>

        {/* Images illustratives */}
        <View style={styles.imagesContainer}>
          <View style={[styles.imagePlaceholder, { backgroundColor: '#ffeaa7' }]}>
            <Text style={styles.imageText}>🛒</Text>
          </View>
          <View style={[styles.imagePlaceholder, { backgroundColor: '#74b9ff' }]}>
            <Text style={styles.imageText}>🍛</Text>
          </View>
        </View>

        {/* Slogan */}
        <View style={styles.sloganContainer}>
          <Text style={styles.sloganTitle}>Menni</Text>
          <Text style={styles.sloganText}>
            {t('welcome_slogan') || 'La solution que vous cherchez depuis longtemps, disponible pour vous dans tout le pays.'}
          </Text>
        </View>

        {/* Avatars */}
        <View style={styles.avatarsContainer}>
          <View style={[styles.avatar, { backgroundColor: '#00b894' }]} />
          <View style={[styles.avatar, { backgroundColor: '#fdcb6e' }]} />
          <View style={[styles.avatar, { backgroundColor: '#6c5ce7' }]} />
          <View style={styles.avatarPlus}>
            <Text style={styles.plusText}>+1</Text>
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>{t('login') || 'Se connecter'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
            <Text style={styles.buttonText}>{t('register') || 'S’inscrire'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.button,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  imagePlaceholder: {
    width: width * 0.45,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 40,
  },
  sloganContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sloganTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  sloganText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.textSecondaryLight || '#666',
    lineHeight: 22,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: -10,
    borderWidth: 2,
    borderColor: Colors.background || '#fff',
  },
  avatarPlus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d9d8d8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  plusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text || '#000',
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  loginButton: {
    backgroundColor: Colors.button,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: Colors.secondary || '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.textLight || '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});


// // screens/Auth/WelcomeAuthScreen.tsx
// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { Colors } from '../../constants/Colors';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RootStackParamList } from '../../types';

// type WelcomeAuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const { width } = Dimensions.get('window');

// const WelcomeAuthScreen = () => {
//   const { t } = useTranslation();
//   const navigation = useNavigation<WelcomeAuthScreenNavigationProp>();

//   const handleLoginPress = () => {
//     navigation.navigate('Login');
//   };

//   const handleRegisterPress = () => {
//     navigation.navigate('Register');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Logo (texte stylisé) */}
//       <View style={styles.logoContainer}>
//         <Text style={styles.logoText}>Menni</Text>
//       </View>

//       {/* Images illustratives → remplacées par des View colorés */}
//       <View style={styles.imagesContainer}>
//         <View style={[styles.imagePlaceholder, { backgroundColor: '#ffeaa7' }]}>
//           <Text style={styles.imageText}>🛒</Text>
//         </View>
//         <View style={[styles.imagePlaceholder, { backgroundColor: '#74b9ff' }]}>
//           <Text style={styles.imageText}>🍛</Text>
//         </View>
//       </View>

//       {/* Slogan */}
//       <View style={styles.sloganContainer}>
//         <Text style={styles.sloganTitle}>Menni</Text>
//         <Text style={styles.sloganText}>
//           {t('welcome_slogan') || 'La solution que vous cherchez depuis longtemps, disponible pour vous dans tout le pays.'}
//         </Text>
//       </View>

//       {/* Avatars → cercles colorés */}
//       <View style={styles.avatarsContainer}>
//         <View style={[styles.avatar, { backgroundColor: '#00b894' }]} />
//         <View style={[styles.avatar, { backgroundColor: '#fdcb6e' }]} />
//         <View style={[styles.avatar, { backgroundColor: '#6c5ce7' }]} />
//         <View style={styles.avatarPlus}>
//           <Text style={styles.plusText}>+1</Text>
//         </View>
//       </View>

//       {/* Boutons */}
//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
//           <Text style={styles.buttonText}>{t('login') || 'Se connecter'}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
//           <Text style={styles.buttonText}>{t('register') || 'S’inscrire'}</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default WelcomeAuthScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//     padding: 20,
//     alignItems: 'center',
//   },
//   logoContainer: {
//     marginTop: 40,
//     marginBottom: 30,
//   },
//   logoText: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: Colors.button, // jaune #eabe22
//   },
//   imagesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 30,
//   },
//   imagePlaceholder: {
//     width: width * 0.45,
//     height: 120,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageText: {
//     fontSize: 40,
//   },
//   sloganContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//     paddingHorizontal: 20,
//   },
//   sloganTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: Colors.text,
//     marginBottom: 10,
//   },
//   sloganText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: Colors.textSecondaryLight || '#666',
//     lineHeight: 22,
//   },
//   avatarsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: -10,
//     borderWidth: 2,
//     borderColor: Colors.background || '#fff',
//   },
//   avatarPlus: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#d9d8d8',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 5,
//   },
//   plusText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: Colors.text || '#000',
//   },
//   buttonsContainer: {
//     width: '100%',
//     gap: 15,
//   },
//   loginButton: {
//     backgroundColor: Colors.button, // #eabe22
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   registerButton: {
//     backgroundColor: Colors.secondary || '#000', // noir si non défini
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: Colors.textLight || '#fff',
//     fontSize: 18,
//     fontWeight: '500',
//   },
// });