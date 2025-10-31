// frontend/screens/Client/ServiceOptionsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

type Props = {
  route: any;
  navigation: any;
};

const ServiceOptionsScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { departure, destination } = route.params;

  const services = [
    { id: 1, name: t('Moto Express'), price: 25.0, time: '15 min', icon: '🏍️' },
    { id: 2, name: t('Voiture Comfort'), price: 40.0, time: '30 min', icon: '🚗' },
    { id: 3, name: t('Voiture Executive'), price: 60.0, time: '45 min', icon: '🚘' },
  ];

  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedService === null) {
      Alert.alert(t('error'), t('Veuillez choisir un service'));
      return;
    }
    
    // ✅ Navigation vers Tracking avec tous les paramètres
    navigation.navigate('Tracking', { 
      departure, 
      destination, 
      service: services[selectedService] 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{departure}</Text>
        <Text style={styles.headerSubtitle}>{destination}</Text>
      </View>

      {/* ✅ Carte OpenStreetMap */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: 18.5944,
            longitude: -72.3074,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={[]}
          mapType="standard"
        >
          <Marker
            coordinate={{ latitude: 18.5944, longitude: -72.3074 }}
            title="Point de départ"
          />
        </MapView>
      </View>

      {/* ✅ Liste des services */}
      <View style={styles.serviceList}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceItem,
              selectedService === index && styles.serviceItemSelected,
            ]}
            onPress={() => setSelectedService(index)}
          >
            <View style={styles.serviceIcon}>
              <Text style={styles.iconText}>{service.icon}</Text>
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDetails}>
                {service.price} HTG • {service.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* ✅ Bouton de confirmation */}
      <TouchableOpacity 
        style={[
          styles.confirmButton, 
          selectedService === null && styles.confirmButtonDisabled
        ]} 
        onPress={handleConfirm}
        disabled={selectedService === null}
      >
        <Text style={styles.confirmButtonText}>{t('Commander')}</Text>
      </TouchableOpacity>
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
    height: 200,
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
  serviceList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceItemSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  serviceDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  confirmButton: {
    backgroundColor: Colors.button,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    color: Colors.textLight,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ServiceOptionsScreen;