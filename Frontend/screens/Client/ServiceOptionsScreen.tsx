// frontend/screens/Client/ServiceOptionsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import api from '../../services/api';

type Props = {
  route: any;
  navigation: any;
};

const ServiceOptionsScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { departure, destination } = route.params;

  const services = [
    { id: 1, name: t('Moto Express'), price: 25.0, time: '5 min', icon: '🏍️' },
    { id: 2, name: t('Voiture Comfort'), price: 40.0, time: '4 min', icon: '🚗' },
    { id: 3, name: t('Voiture Executive'), price: 60.0, time: '3 min', icon: '🚘' },
  ];

  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (selectedService === null) {
      Alert.alert(t('error'), t('Veuillez choisir un service'));
      return;
    }

    const selected = services[selectedService];
    setLoading(true);

    try {
      const response = await api.get('/drivers/available', {
        params: { service: selected.name }
      });

      if (!response.data.driver) {
        Alert.alert(t('Aucun chauffeur'), t('Aucun chauffeur disponible pour ce service.'));
        return;
      }

      const driver = {
        ...response.data.driver,
        phone: response.data.driver.phone || '50944505285'
      };

      navigation.navigate('RideConfirmation', {
        departure,
        destination,
        service: selected,
        driver,
      });
    } catch (error: any) {
      let errorMessage = t('Erreur inconnue');
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        errorMessage = t('Impossible de contacter le serveur. Vérifiez votre connexion internet.');
      } else if (error.response) {
        errorMessage = error.response.data?.message || `${t('error')} ${error.response.status}`;
      } else if (error.request) {
        errorMessage = t('Le serveur ne répond pas.');
      }
      Alert.alert(t('Erreur réseau'), errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView>
      <View style={[styles.header, { backgroundColor: theme.primaryLight }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{departure}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.text }]}>{destination}</Text>
      </View>

      <View style={[styles.mapContainer, { borderColor: theme.border }]}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: 18.5944,
            longitude: -72.3074,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          mapType="standard"
        >
          <Marker
            coordinate={{ latitude: 18.5944, longitude: -72.3074 }}
            title={t('Point de départ')}
          />
        </MapView>
      </View>

      <View style={styles.serviceList}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceItem,
              { backgroundColor: theme.background, borderColor: theme.border },
              selectedService === index && {
                backgroundColor: theme.primaryLight,
                borderColor: theme.primary,
              },
            ]}
            onPress={() => setSelectedService(index)}
            disabled={loading}
          >
            <View style={[styles.serviceIcon, { backgroundColor: theme.primaryLight }]}>
              <Text style={[styles.iconText, { color: theme.text }]}>{service.icon}</Text>
            </View>
            <View style={styles.serviceInfo}>
              <Text style={[styles.serviceName, { color: theme.text }]}>{service.name}</Text>
              <Text style={[styles.serviceDetails, { color: theme.textSecondary }]}>
                {service.price} HTG • {service.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          { backgroundColor: theme.button },
          (selectedService === null || loading) && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirm}
        disabled={selectedService === null || loading}
      >
        <Text style={[styles.confirmButtonText, { color: theme.textLight }]}>
          {loading ? t('Recherche...') : t('Commander')}
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  headerSubtitle: { fontSize: 16, marginTop: 5 },
  mapContainer: {
    height: 200,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  map: { width: '100%', height: '100%' },
  serviceList: { paddingHorizontal: 20, paddingBottom: 20 },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: { fontSize: 24 },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 18, fontWeight: '600' },
  serviceDetails: { fontSize: 14, marginTop: 2 },
  confirmButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmButtonDisabled: { backgroundColor: '#CCCCCC' },
  confirmButtonText: { fontSize: 18, fontWeight: '500' },
});

export default ServiceOptionsScreen;


