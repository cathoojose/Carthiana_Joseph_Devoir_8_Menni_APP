// frontend/screens/Client/LocationInputScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  navigation: any;
};

const LocationInputScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleContinue = () => {
    if (!departure.trim() || !destination.trim()) {
      Alert.alert(t('error'), t('Veuillez entrer un point de départ et une destination'));
      return;
    }
    navigation.navigate('ServiceOptions', { departure, destination });
  };

  return (
    <ThemedView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          {t('Choisissez votre trajet')}
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
          placeholder={t('Point de départ (ex: Devant l’église St-Pierre)')}
          placeholderTextColor={theme.textSecondary}
          value={departure}
          onChangeText={setDeparture}
          multiline
          numberOfLines={2}
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor: theme.border,
              backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E',
              color: theme.text,
            },
          ]}
          placeholder={t('Destination (ex: Cap Haïtien)')}
          placeholderTextColor={theme.textSecondary}
          value={destination}
          onChangeText={setDestination}
          multiline
          numberOfLines={2}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.button }]}
          onPress={handleContinue}
        >
          <Text style={[styles.buttonText, { color: theme.textLight }]}>
            {t('continue')}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  keyboardView: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 30, textAlign: 'center' },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { fontSize: 18, fontWeight: '500' },
});

export default LocationInputScreen;


