// screens/Auth/WelcomeAuthScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type WelcomeAuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const WelcomeAuthScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<WelcomeAuthScreenNavigationProp>();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: theme.primary }]}>Menni</Text>
        </View>

        <View style={styles.imagesContainer}>
          <View style={[styles.imagePlaceholder, { backgroundColor: theme.primaryLight }]}>
            <Text style={styles.imageText}>🛒</Text>
          </View>
          <View style={[styles.imagePlaceholder, { backgroundColor: '#74b9ff' }]}>
            <Text style={styles.imageText}>🍛</Text>
          </View>
        </View>

        <View style={styles.sloganContainer}>
          <Text style={[styles.sloganTitle, { color: theme.text }]}>Menni</Text>
          <Text style={[styles.sloganText, { color: theme.textSecondary }]}>
            {t('welcome_slogan')}
          </Text>
        </View>

        <View style={styles.avatarsContainer}>
          <View style={[styles.avatar, { backgroundColor: '#00b894', borderColor: theme.background }]} />
          <View style={[styles.avatar, { backgroundColor: '#fdcb6e', borderColor: theme.background }]} />
          <View style={[styles.avatar, { backgroundColor: '#6c5ce7', borderColor: theme.background }]} />
          <View style={[styles.avatarPlus, { backgroundColor: theme.border }]}>
            <Text style={[styles.plusText, { color: theme.text }]}>+1</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: theme.button }]} 
            onPress={handleLoginPress}
          >
            <Text style={[styles.buttonText, { color: theme.textLight }]}>
              {t('login')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.registerButton, { backgroundColor: theme.secondary }]} 
            onPress={handleRegisterPress}
          >
            <Text style={[styles.buttonText, { color: theme.textLight }]}>
              {t('register')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  sloganText: {
    fontSize: 16,
    textAlign: 'center',
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
  },
  avatarPlus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  plusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  registerButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default WelcomeAuthScreen;


