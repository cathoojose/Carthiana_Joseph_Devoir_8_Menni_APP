// frontend/screens/Client/OrderSuccessScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  navigation: any;
};

const OrderSuccessScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleTrackOrder = () => {
    Alert.alert(t('Info'), t('Fonctionnalité non disponible en mode démo'));
  };

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <View style={styles.illustrationContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/200x200?text=Moto+Livreur' }}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.successTitle, { color: theme.primary }]}>
          {t('Commande réussie !')}
        </Text>
        <Text style={[styles.successMessage, { color: theme.text }]}>
          {t('Votre paiement a été effectué avec succès.')}
          {'\n'}
          {t('Merci d\'avoir choisi Menni !')}
        </Text>

        <TouchableOpacity
          style={[styles.trackButton, { backgroundColor: theme.button }]}
          onPress={handleTrackOrder}
        >
          <Text style={[styles.trackButtonText, { color: theme.textLight }]}>
            {t('Suivre la commande')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: theme.border }]}
          onPress={handleGoHome}
        >
          <Text style={[styles.homeButtonText, { color: theme.text }]}>
            {t('Retour à l\'accueil')}
          </Text>
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
  illustrationContainer: { 
    marginBottom: 30 
  },
  illustration: { 
    width: 200, 
    height: 200 
  },
  successTitle: { 
    fontSize: 24, 
    fontWeight: '600', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  successMessage: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 30, 
    lineHeight: 24 
  },
  trackButton: { 
    paddingVertical: 16, 
    paddingHorizontal: 30, 
    borderRadius: 12, 
    marginBottom: 15, 
    alignItems: 'center' 
  },
  trackButtonText: { 
    fontSize: 18, 
    fontWeight: '500' 
  },
  homeButton: { 
    paddingVertical: 16, 
    paddingHorizontal: 30, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  homeButtonText: { 
    fontSize: 18, 
    fontWeight: '500' 
  },
});

export default OrderSuccessScreen;


