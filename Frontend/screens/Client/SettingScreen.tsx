// frontend/screens/Client/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleClearCache = () => {
    Alert.alert(t('Cache vidé'), t('Les fichiers temporaires ont été supprimés ✅'));
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('Paramètres')}
        </Text>

        <View style={[styles.option, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <Ionicons name="notifications-outline" size={22} color={theme.text} />
          <Text style={[styles.optionText, { color: theme.text }]}>
            {t('Notifications')}
          </Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor={notifications ? theme.primary : theme.textSecondary}
          />
        </View>

        <View style={[styles.option, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <Ionicons name="moon-outline" size={22} color={theme.text} />
          <Text style={[styles.optionText, { color: theme.text }]}>
            {t('Mode sombre')}
          </Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor={darkMode ? theme.primary : theme.textSecondary}
          />
        </View>

        <TouchableOpacity style={[styles.option, { backgroundColor: theme.background, borderColor: theme.border }]} onPress={handleClearCache}>
          <Ionicons name="trash-outline" size={22} color={theme.text} />
          <Text style={[styles.optionText, { color: theme.text }]}>
            {t('Vider le cache')}
          </Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  optionText: { flex: 1, fontSize: 16, marginLeft: 12 },
});

export default SettingsScreen;


