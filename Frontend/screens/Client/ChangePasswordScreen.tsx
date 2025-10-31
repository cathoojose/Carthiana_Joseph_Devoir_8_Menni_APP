// frontend/screens/Client/ChangePasswordScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';


const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert(t('error'), t('Veuillez remplir tous les champs.'));
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(t('error'), t('Les nouveaux mots de passe ne correspondent pas.'));
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert(t('error'), t('Le mot de passe doit avoir au moins 6 caractères.'));
      return;
    }
    Alert.alert(t('success'), t('Votre mot de passe a été modifié.'));
    // Ici, vous enverriez les données à votre API
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('Changer le mot de passe')}
        </Text>

        <TextInput
          style={[styles.input, { 
            borderColor: theme.border, 
            color: theme.text,
            backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E'
          }]}
          placeholder={t('Mot de passe actuel')}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          placeholderTextColor={theme.textSecondary}
        />
        <TextInput
          style={[styles.input, { 
            borderColor: theme.border, 
            color: theme.text,
            backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E'
          }]}
          placeholder={t('Nouveau mot de passe')}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholderTextColor={theme.textSecondary}
        />
        <TextInput
          style={[styles.input, { 
            borderColor: theme.border, 
            color: theme.text,
            backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : '#1E1E1E'
          }]}
          placeholder={t('Confirmer le nouveau mot de passe')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor={theme.textSecondary}
        />

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.button }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: theme.textLight }]}>
            {t('Mettre à jour')}
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

export default ChangePasswordScreen;