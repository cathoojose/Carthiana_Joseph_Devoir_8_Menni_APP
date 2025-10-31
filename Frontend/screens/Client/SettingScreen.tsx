// screens/Client/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleClearCache = () => {
    Alert.alert('Cache vidé', 'Les fichiers temporaires ont été supprimés ✅');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      <View style={styles.option}>
        <Ionicons name="notifications-outline" size={22} color={Colors.text} />
        <Text style={styles.optionText}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          thumbColor={notifications ? '#f7666e' : '#ccc'}
        />
      </View>

      <View style={styles.option}>
        <Ionicons name="moon-outline" size={22} color={Colors.text} />
        <Text style={styles.optionText}>Mode sombre</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? '#f7666e' : '#ccc'}
        />
      </View>

      <TouchableOpacity style={styles.option} onPress={handleClearCache}>
        <Ionicons name="trash-outline" size={22} color={Colors.text} />
        <Text style={styles.optionText}>Vider le cache</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.text, marginBottom: 24 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  optionText: { flex: 1, fontSize: 16, marginLeft: 12, color: Colors.text },
});

export default SettingsScreen;
