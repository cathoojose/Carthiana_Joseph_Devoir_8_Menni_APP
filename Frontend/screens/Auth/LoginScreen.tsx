// screens/Auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import api from '../../services/api';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { t } = useTranslation();
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier.trim()) {
      Alert.alert(t('error'), t('email_or_phone_required'));
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/check-user', { 
        identifier: identifier.trim().toLowerCase() 
      });

      if (response.data.exists && response.data.user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppTabs' }],
        });
      } else {
        Alert.alert(
          t('error'),
          t('Aucun compte trouvé avec ces informations. Voulez-vous créer un compte?'),
          [
            { text: t('Non'), style: 'cancel' },
            { text: t('create_account'), onPress: () => navigation.navigate('Register') }
          ]
        );
      }
    } catch (error: any) {
      let errorMessage = t('Erreur inconnue');
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        errorMessage = t('network_error');
      } else if (error.response) {
        errorMessage = error.response.data?.error || `${t('error')} ${error.response.status}`;
      } else if (error.request) {
        errorMessage = t('Le serveur ne répond pas');
      }
      Alert.alert(t('error'), errorMessage);
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
        <View style={styles.safe}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('welcome_back')} 👋
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t('enter_email_or_phone')}
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.border,
                backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#7a757562',
                color: theme.text,
              },
            ]}
            placeholder={t('email_or_phone')}
            placeholderTextColor={theme.textSecondary}
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType={identifier.includes('@') ? 'email-address' : 'phone-pad'}
            autoCapitalize="none"
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.button }, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.textLight} />
            ) : (
              <Text style={[styles.buttonText, { color: theme.textLight }]}>
                {t('continue')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontSize: 18, fontWeight: '600' },
});

export default LoginScreen;