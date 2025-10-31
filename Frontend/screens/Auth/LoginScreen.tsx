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
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre email ou numéro de téléphone.');
      return;
    }

    setLoading(true);

    try {
      console.log('🔄 Tentative de connexion avec:', identifier);
      
      // ✅ Utilise la route existante /check-user
      const response = await api.post('/auth/check-user', { identifier: identifier.trim() });
      
      console.log('✅ Réponse serveur:', response.data);

      if (response.data.exists) {
        console.log('🎯 Utilisateur trouvé, redirection vers Home...');
        // ✅ Redirection vers les Tabs (Home)
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppTabs' }],
        });
      } else {
        Alert.alert('Non trouvé', 'Aucun compte trouvé avec ces informations.');
      }
    } catch (error: any) {
      console.error('❌ Erreur complète:', error);
      
      // Meilleur affichage des erreurs
      if (error.response) {
        // Le serveur a répondu avec un statut d'erreur
        console.log('📊 Statut:', error.response.status);
        console.log('📦 Données:', error.response.data);
        Alert.alert('Erreur', error.response.data?.error || `Erreur ${error.response.status}`);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.log('🌐 Aucune réponse du serveur');
        Alert.alert('Erreur réseau', 'Impossible de contacter le serveur. Vérifiez votre connexion et l\'adresse IP.');
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        console.log('⚙️ Erreur de configuration:', error.message);
        Alert.alert('Erreur', 'Erreur de configuration de la requête.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>Bienvenue 👋</Text>
        <Text style={styles.subtitle}>Entrez votre email ou téléphone pour continuer</Text>

        <TextInput
          style={styles.input}
          placeholder="Email ou téléphone"
          value={identifier}
          onChangeText={setIdentifier}
          keyboardType={identifier.includes('@') ? 'email-address' : 'phone-pad'}
          autoCapitalize="none"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continuer</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safe: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default LoginScreen;