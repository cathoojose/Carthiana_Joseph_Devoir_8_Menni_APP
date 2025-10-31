// screens/Auth/OTPVerificationScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import api from '../../services/api';

type Props = {
  route: any;
  navigation: any;
};

const OTPVerificationScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { identifier } = route.params;
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
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } catch (error: any) {
      Alert.alert(t('error'), error.response?.data?.error || t('Échec de la vérification'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('Entrez le code OTP')}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {t('Un code a été envoyé à')} {identifier}
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              borderColor: theme.border,
              backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E',
              color: theme.text,
            },
          ]}
          placeholder="123456"
          placeholderTextColor={theme.textSecondary}
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.button }, loading && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.textLight} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.textLight }]}>
              {t('Valider')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default OTPVerificationScreen;