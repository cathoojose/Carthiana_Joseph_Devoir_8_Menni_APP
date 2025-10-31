// frontend/screens/Client/TrackingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';

type Props = {
  route: any;
  navigation: any;
};

// Type pour la localisation du chauffeur
type DriverLocation = {
  latitude: number;
  longitude: number;
};

const TrackingScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { departure, destination, service } = route.params;

  const [timeRemaining, setTimeRemaining] = useState(20); // En minutes
  const [driverLocation, setDriverLocation] = useState<DriverLocation>({
    latitude: 18.5944, // Port-au-Prince par défaut
    longitude: -72.3074,
  });

  // Simulation du mouvement du chauffeur
  useEffect(() => {
    const moveDriver = setInterval(() => {
      setDriverLocation(prev => ({
        latitude: prev.latitude + 0.0005, // Petit déplacement vers le nord
        longitude: prev.longitude + 0.0005, // Petit déplacement vers l'est
      }));
    }, 10000); // Déplace toutes les 10 secondes

    return () => clearInterval(moveDriver);
  }, []);

  // Timer pour le temps restant
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          Alert.alert(t('Fini !'), t('Votre chauffeur est arrivé.'));
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // 1 minute

    return () => clearInterval(timer);
  }, []);

  const handleCall = () => {
    Alert.alert(t('Appel'), t('Fonctionnalité non disponible en mode démo'));
  };

  const handleChat = () => {
    Alert.alert(t('Chat'), t('Fonctionnalité non disponible en mode démo'));
  };

  const handleCancel = () => {
    Alert.alert(
      t('Annuler la course'),
      t('Êtes-vous sûr de vouloir annuler ?'),
      [
        { text: t('Non'), style: 'cancel' },
        { text: t('Oui'), onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('Suivi en temps réel')}</Text>
        <Text style={styles.headerSubtitle}>{departure} → {destination}</Text>
      </View>

      {/* 🗺️ Carte en temps réel */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 18.5944,
            longitude: -72.3074,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          region={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Marqueur du chauffeur */}
          <Marker
            coordinate={driverLocation}
            title="Votre chauffeur"
            description={`En route - ${service.name}`}
          >
            <View style={styles.driverMarker}>
              <Text style={styles.driverText}>
                {service.name.includes('Moto') ? '🏍️' : '🚗'}
              </Text>
            </View>
          </Marker>

          {/* Marqueur de destination (optionnel) */}
          <Marker
            coordinate={{
              latitude: 18.5944 + 0.01,
              longitude: -72.3074 + 0.01,
            }}
            title="Destination"
            pinColor={Colors.primary}
          />
        </MapView>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timeRemaining} : 00</Text>
        <Text style={styles.timerLabel}>{t('Temps restant')}</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {t('En route')} — {service.name} • {service.price} HTG
        </Text>
        <Text style={styles.driverInfo}>
          {t('Chauffeur')}: Jean P. • ⭐ 4.8
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
          <Text style={styles.actionButtonText}>📞</Text>
          <Text style={styles.actionButtonLabel}>{t('Appeler')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleChat}>
          <Text style={styles.actionButtonText}>💬</Text>
          <Text style={styles.actionButtonLabel}>{t('Message')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]} 
          onPress={handleCancel}
        >
          <Text style={[styles.actionButtonText, styles.cancelText]}>✖️</Text>
          <Text style={[styles.actionButtonLabel, styles.cancelLabel]}>
            {t('Annuler')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primaryLight,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 5,
  },
  mapContainer: {
    height: 300, // Un peu plus grand pour mieux voir
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  driverMarker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.textLight,
  },
  driverText: {
    fontSize: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.primary,
  },
  timerLabel: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 5,
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 15,
    padding: 15,
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  driverInfo: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
    marginTop: 'auto',
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
  },
  cancelButton: {
    // Styles spécifiques pour le bouton annuler si besoin
  },
  actionButtonText: {
    fontSize: 28,
    marginBottom: 5,
  },
  actionButtonLabel: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
  cancelText: {
    // Style pour l'icône annuler
  },
  cancelLabel: {
    color: Colors.error,
  },
});

export default TrackingScreen;