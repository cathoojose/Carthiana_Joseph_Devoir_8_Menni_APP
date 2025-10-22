// frontend/screens/Auth/OTPVerificationScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';

type Props = {
  route: any;
  navigation: any;
};

const OTPVerificationScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { identifier } = route.params; // email ou téléphone
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert(t('error'), t('Veuillez entrer un code de 6 chiffres'));
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/verify-otp', { identifier, otp });
      if (res.data.success) {
        // Sauvegarder le token ou userId dans AsyncStorage (à faire plus tard)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } catch (error: any) {
      Alert.alert(t('error'), error.response?.data?.error || 'Échec de la vérification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('Entrez le code OTP')}</Text>
      <Text style={styles.subtitle}>
        {t('Un code a été envoyé à')} {identifier}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="123456"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.textLight} />
        ) : (
          <Text style={styles.buttonText}>{t('Valider')}</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: Colors.button,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.buttonDisabled,
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default OTPVerificationScreen;