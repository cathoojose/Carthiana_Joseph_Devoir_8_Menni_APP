// frontend/screens/Client/ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/AuthNavigator'; // ✅ ajoute ce type
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;


const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [appNotificationsEnabled, setAppNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false); 

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Welcome' }],
          });
        },
      },
    ]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    Alert.alert('Info', 'Le mode sombre sera géré via les paramètres système ou un toggle global.');
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.primary }]}>Paramètres</Text>
          <TouchableOpacity style={styles.themeToggle} onPress={toggleDarkMode}>
            <Ionicons name={darkMode ? 'sunny-outline' : 'moon-outline'} size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Section Compte */}
        <View style={[styles.section, { backgroundColor: theme.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle-outline" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Compte</Text>
          </View>
          <TouchableOpacity
            style={[styles.option, { borderColor: theme.border }]}
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>Modifier le profil</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { borderColor: theme.border }]}
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>Changer le mot de passe</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, { borderColor: theme.border }]}>
            <Text style={[styles.optionText, { color: theme.text }]}>Lier les réseaux sociaux</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Section Notifications */}
        <View style={[styles.section, { backgroundColor: theme.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications-outline" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Notifications</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleOption, { borderColor: theme.border }]}
            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>Notifications</Text>
            <View style={[styles.toggleSwitch, { backgroundColor: notificationsEnabled ? theme.primary : theme.border }]}>
              <View
                style={[
                  styles.toggleThumb,
                  {
                    backgroundColor: theme.background,
                    transform: [{ translateX: notificationsEnabled ? 26 : 2 }],
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleOption, { borderColor: theme.border }]}
            onPress={() => setAppNotificationsEnabled(!appNotificationsEnabled)}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>Notifications de l’application</Text>
            <View style={[styles.toggleSwitch, { backgroundColor: appNotificationsEnabled ? theme.primary : theme.border }]}>
              <View
                style={[
                  styles.toggleThumb,
                  {
                    backgroundColor: theme.background,
                    transform: [{ translateX: appNotificationsEnabled ? 26 : 2 }],
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Section Plus */}
        <View style={[styles.section, { backgroundColor: theme.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="map-outline" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Plus</Text>
          </View>
          <TouchableOpacity
            style={[styles.option, { borderColor: theme.border }]}
            onPress={() => navigation.navigate('LanguageSelectionScreen')}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>Langue</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, { borderColor: theme.border }]}>
            <Text style={[styles.optionText, { color: theme.text }]}>État</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Bouton Déconnexion */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.background }]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={theme.primary} />
          <Text style={[styles.logoutText, { color: theme.primary }]}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  themeToggle: {
    padding: 10,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  toggleOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
  },
  toggleSwitch: {
    width: 50,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ProfileScreen;