// frontend/screens/Client/EditProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';

const EditProfileScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [name, setName] = useState('Kathiana Joseph');
  const [email, setEmail] = useState('kathiana@example.com');
  const [phone, setPhone] = useState('+509 3456 7890');

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert(t('error'), t('Veuillez remplir tous les champs.'));
      return;
    }
    Alert.alert(t('success'), t('Votre profil a été mis à jour.'));
    // Ici, vous enverriez les données à votre API
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('Modifier le profil')}
        </Text>

        <TextInput
          style={[styles.input, { 
            borderColor: theme.border, 
            color: theme.text,
            backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E'
          }]}
          placeholder={t('full_name')}
          value={name}
          onChangeText={setName}
          placeholderTextColor={theme.textSecondary}
        />
        <TextInput
          style={[styles.input, { 
            borderColor: theme.border, 
            color: theme.text,
            backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E'
          }]}
          placeholder={t('email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={theme.textSecondary}
        />
        <TextInput
          style={[styles.input, { 
            borderColor: theme.border, 
            color: theme.text,
            backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E'
          }]}
          placeholder={t('phone')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor={theme.textSecondary}
        />

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.button }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: theme.textLight }]}>
            {t('Enregistrer')}
          </Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default EditProfileScreen;