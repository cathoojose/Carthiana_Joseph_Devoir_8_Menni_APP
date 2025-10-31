// frontend/screens/Client/TrackingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import { Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type Props = {
  route: any;
  navigation: any;
};

type DriverLocation = {
  latitude: number;
  longitude: number;
};

type Location = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

const TrackingScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { service, driver } = route.params;

  const [timeRemaining, setTimeRemaining] = useState(20);
  const [driverLocation, setDriverLocation] = useState<DriverLocation>({
    latitude: driver?.latitude || 18.5944,
    longitude: driver?.longitude || -72.3074,
  });
  const [driverStatus, setDriverStatus] = useState('en_route');
  const [departure, setDeparture] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [searchMode, setSearchMode] = useState<'departure' | 'destination'>('departure');

  const popularLocations: Location[] = [
    {
      id: '1',
      name: t('Aéroport International Toussaint Louverture'),
      address: 'Port-au-Prince, Haïti',
      latitude: 18.5800,
      longitude: -72.2925,
    },
    {
      id: '2',
      name: t('Place du Marron Inconnu'),
      address: 'Champ de Mars, Port-au-Prince',
      latitude: 18.5433,
      longitude: -72.3384,
    },
    {
      id: '3',
      name: t("Hôpital de l'Université d'État d'Haïti"),
      address: 'Port-au-Prince, Haïti',
      latitude: 18.5392,
      longitude: -72.3364,
    },
    {
      id: '4',
      name: t('Marché en Fer'),
      address: 'Port-au-Prince, Haïti',
      latitude: 18.5439,
      longitude: -72.3392,
    },
  ];

  useEffect(() => {
    const moveDriver = setInterval(() => {
      setDriverLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
      }));
    }, 5000);
    return () => clearInterval(moveDriver);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setDriverStatus('arrived');
          Alert.alert(t('Fini !'), t('Votre chauffeur est arrivé.'));
          return 0;
        } else if (prev <= 3) {
          setDriverStatus('arriving');
        }
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const statusMessages = {
    en_route: t('En route'),
    arriving: t('Arrive dans 2 min'),
    arrived: t('Est arrivé'),
  };

  const handleSelectLocation = (location: Location) => {
    if (searchMode === 'departure') setDeparture(location);
    else setDestination(location);
    setShowLocationSearch(false);
    setSearchQuery('');
  };

  const handleUseCurrentLocation = () => {
    const currentLocation: Location = {
      id: 'current',
      name: t('Ma position actuelle'),
      address: t('Localisation détectée'),
      latitude: 18.5392,
      longitude: -72.3364,
    };
    handleSelectLocation(currentLocation);
  };

  const openLocationSearch = (mode: 'departure' | 'destination') => {
    setSearchMode(mode);
    setShowLocationSearch(true);
    setSearchQuery('');
  };

  const handleCall = () => {
    if (!driver?.phone) {
      Alert.alert(t('error'), t('Numéro de téléphone non disponible'));
      return;
    }
    const phoneNumber = driver.phone.replace(/\D/g, '');
    let url = Platform.OS === 'android' ? `tel:${phoneNumber}` : `telprompt:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => supported && Linking.openURL(url))
      .catch(() => Alert.alert(t('error'), t('Impossible de passer un appel')));
  };

  const handleChat = () => {
    if (!driver?.phone) {
      Alert.alert(t('error'), t('Numéro de téléphone non disponible'));
      return;
    }
    const message = t('Bonjour, je suis votre client Menni. Où vous trouvez-vous ?');
    const phoneNumber = driver.phone.replace(/\D/g, '');
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.canOpenURL(whatsappUrl)
      .then(supported => Linking.openURL(supported ? whatsappUrl : smsUrl))
      .catch(() => Linking.openURL(smsUrl).catch(() => Alert.alert(t('error'), t('Aucune application de messagerie disponible'))));
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

  const filteredLocations = popularLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemedView>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.header, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {t('Suivi en temps réel')}
          </Text>

          <View style={[styles.locationSelector, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <TouchableOpacity style={styles.locationInput} onPress={() => openLocationSearch('departure')}>
              <Ionicons name="location-outline" size={16} color={theme.primary} />
              <Text style={[styles.locationText, { color: theme.text }]}>
                {departure ? departure.name : t('Point de départ')}
              </Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: theme.border }]} />
            <TouchableOpacity style={styles.locationInput} onPress={() => openLocationSearch('destination')}>
              <Ionicons name="flag-outline" size={16} color={theme.primary} />
              <Text style={[styles.locationText, { color: theme.text }]}>
                {destination ? destination.name : t('Destination')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showLocationSearch && (
          <View style={[styles.locationSearchOverlay, { backgroundColor: theme.background }]}>
            <View style={[styles.searchHeader, { borderBottomColor: theme.border }]}>
              <TouchableOpacity onPress={() => setShowLocationSearch(false)} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {searchMode === 'departure' ? t('Choisir le départ') : t('Choisir la destination')}
              </Text>
            </View>
            <View style={styles.searchContainer}>
              <View style={[styles.searchInputContainer, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Ionicons name="search" size={20} color={theme.textSecondary} />
                <TextInput
                  style={[styles.searchInput, { color: theme.text }]}
                  placeholder={t('Rechercher une adresse...')}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor={theme.textSecondary}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.currentLocationButton} onPress={handleUseCurrentLocation}>
              <Ionicons name="locate" size={20} color={theme.primary} />
              <Text style={[styles.currentLocationText, { color: theme.text }]}>
                {t('Utiliser ma position actuelle')}
              </Text>
            </TouchableOpacity>
            <ScrollView style={styles.locationsList}>
              {filteredLocations.map((location) => (
                <TouchableOpacity key={location.id} style={[styles.locationItem, { borderBottomColor: theme.border }]} onPress={() => handleSelectLocation(location)}>
                  <View style={styles.locationIcon}>
                    <Ionicons name="location-outline" size={24} color={theme.primary} />
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={[styles.locationName, { color: theme.text }]}>{location.name}</Text>
                    <Text style={[styles.locationAddress, { color: theme.textSecondary }]}>{location.address}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={[styles.mapContainer, { borderColor: theme.border }]}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
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
            <Marker coordinate={driverLocation} title={t('Votre chauffeur')}>
              <View style={[styles.driverMarker, { backgroundColor: theme.primary }]}>
                <Text style={styles.driverText}>
                  {service.name.includes('Moto') ? '🏍️' : '🚗'}
                </Text>
              </View>
            </Marker>
            {destination && (
              <Marker
                coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                pinColor={theme.primary}
              />
            )}
          </MapView>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: '#e0e0e0' }]}>
            <View style={[styles.progressFill, { backgroundColor: theme.primary, width: `${(20 - timeRemaining) / 20 * 100}%` }]} />
          </View>
        </View>

        <View style={[styles.statusContainer, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.statusText, { color: theme.text }]}>
            {statusMessages[driverStatus as keyof typeof statusMessages]} — {service.name} • {service.price} HTG
          </Text>
          <Text style={[styles.driverInfo, { color: theme.textSecondary }]}>
            {t('Chauffeur')}: {driver?.name || t('Inconnu')} • {driver?.car_model || t('Voiture')} • ⭐ {driver?.rating || '4.5'}
          </Text>
          {driver?.plate_number && (
            <Text style={[styles.plateText, { color: theme.textSecondary }]}>
              {t('Plaque')}: {driver.plate_number}
            </Text>
          )}
        </View>

        <View style={styles.timerContainer}>
          <Text style={[styles.timerText, { color: theme.primary }]}>{timeRemaining} : 00</Text>
          <Text style={[styles.timerLabel, { color: theme.text }]}>{t('Temps restant')}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primary }]} onPress={handleCall}>
            <Text style={[styles.actionText, { color: theme.textLight }]}>{t('Appel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primary }]} onPress={handleChat}>
            <Text style={[styles.actionText, { color: theme.textLight }]}>{t('Chat')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>{t('Annuler la course')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  locationSelector: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  locationInput: { flexDirection: 'row', alignItems: 'center', padding: 8 },
  locationText: { marginLeft: 12, fontSize: 14, flex: 1 },
  separator: { height: 1, marginHorizontal: 8 },
  locationSearchOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 },
  searchHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  backButton: { marginRight: 16 },
  searchTitle: { fontSize: 18, fontWeight: '600' },
  searchContainer: { padding: 16 },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1 },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16 },
  currentLocationButton: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  currentLocationText: { marginLeft: 12, fontSize: 16 },
  locationsList: { flex: 1 },
  locationItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  locationIcon: { marginRight: 12 },
  locationInfo: { flex: 1 },
  locationName: { fontSize: 16, fontWeight: '500' },
  locationAddress: { fontSize: 14, marginTop: 2 },
  mapContainer: { height: 300, margin: 20, borderRadius: 12, overflow: 'hidden', borderWidth: 1 },
  map: { width: '100%', height: '100%' },
  driverMarker: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFFFFF' },
  driverText: { fontSize: 20 },
  progressContainer: { marginHorizontal: 20, marginTop: 10 },
  progressBar: { height: 6, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  timerContainer: { alignItems: 'center', marginTop: 10 },
  timerText: { fontSize: 48, fontWeight: '700' },
  timerLabel: { fontSize: 16, marginTop: 5 },
  statusContainer: { alignItems: 'center', marginTop: 10, marginHorizontal: 20, borderRadius: 12, padding: 12 },
  statusText: { fontSize: 16, fontWeight: '600' },
  driverInfo: { fontSize: 14, marginTop: 5 },
  plateText: { fontSize: 12, marginTop: 2 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginTop: 15 },
  actionButton: { paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, flex: 1, marginHorizontal: 5, alignItems: 'center' },
  actionText: { fontSize: 16, fontWeight: '500' },
  cancelButton: { marginTop: 20, marginHorizontal: 20, backgroundColor: '#e74c3c', padding: 15, borderRadius: 10, alignItems: 'center' },
  cancelText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default TrackingScreen;

