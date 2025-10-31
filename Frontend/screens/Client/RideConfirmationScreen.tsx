// frontend/screens/Client/RideConfirmationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  route: any;
  navigation: any;
};

const RideConfirmationScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { departure, destination, service, driver } = route.params;

  const calculateTotal = () => {
    const basePrice = service.price;
    const serviceFee = 5.0;
    return basePrice + serviceFee;
  };

  const totalPrice = calculateTotal();

  const handleConfirm = () => {
    Alert.alert(
      t('Confirmer la course'),
      t('Êtes-vous sûr de vouloir confirmer cette course ?'),
      [
        { text: t('Annuler'), style: 'cancel' },
        { 
          text: t('Confirmer'), 
          onPress: () => {
            navigation.navigate('Tracking', {
              departure,
              destination,
              service,
              driver,
              totalPrice
            });
          }
        },
      ]
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.primaryLight }]}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {t('Confirmer votre course')}
          </Text>
        </View>

        {/* Itinéraire */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('Itinéraire')}
          </Text>
          <View style={styles.routeContainer}>
            <View style={styles.routePoint}>
              <View style={[styles.dot, { backgroundColor: theme.primary }]} />
              <View style={[styles.verticalLine, { backgroundColor: theme.border }]} />
            </View>
            <View style={styles.routeDetails}>
              <Text style={[styles.locationText, { color: theme.text }]}>{departure}</Text>
              <View style={styles.spacer} />
              <Text style={[styles.locationText, { color: theme.text }]}>{destination}</Text>
            </View>
            <View style={styles.routePoint}>
              <View style={[styles.dot, { backgroundColor: '#e74c3c' }]} />
            </View>
          </View>
        </View>

        {/* Détails du service */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('Service choisi')}
          </Text>
          <View style={[styles.serviceCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Text style={[styles.serviceIcon, { color: theme.text }]}>{service.icon}</Text>
            <View style={styles.serviceInfo}>
              <Text style={[styles.serviceName, { color: theme.text }]}>{service.name}</Text>
              <Text style={[styles.serviceTime, { color: theme.textSecondary }]}>{service.time}</Text>
            </View>
            <Text style={[styles.servicePrice, { color: theme.primary }]}>{service.price} HTG</Text>
          </View>
        </View>

        {/* Informations chauffeur */}
        {driver && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('Votre chauffeur')}
            </Text>
            <View style={[styles.driverCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={[styles.driverAvatar, { backgroundColor: theme.primary }]}>
                <Text style={[styles.avatarText, { color: theme.textLight }]}>
                  {driver.name?.charAt(0) || 'C'}
                </Text>
              </View>
              <View style={styles.driverInfo}>
                <Text style={[styles.driverName, { color: theme.text }]}>{driver.name}</Text>
                <Text style={[styles.driverDetails, { color: theme.textSecondary }]}>
                  {driver.car_model} • {driver.plate_number}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={[styles.ratingText, { color: theme.textSecondary }]}>{driver.rating || '4.5'}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Détails du prix */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('Détails du prix')}
          </Text>
          <View style={[styles.priceDetails, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>
                {t('Prix de base')}
              </Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>{service.price} HTG</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>
                {t('Frais de service')}
              </Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>{t('5.00 HTG')}</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <View style={styles.priceRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>
                {t('Total')}
              </Text>
              <Text style={[styles.totalValue, { color: theme.primary }]}>{totalPrice} HTG</Text>
            </View>
          </View>
        </View>

        {/* Méthode de paiement */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('Méthode de paiement')}
          </Text>
          <View style={[styles.paymentMethod, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Ionicons name="cash-outline" size={24} color={theme.primary} />
            <Text style={[styles.paymentText, { color: theme.text }]}>
              {t('Paiement en espèces')}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bouton de confirmation */}
      <View style={[styles.footer, { backgroundColor: theme.background, borderColor: theme.border }]}>
        <TouchableOpacity style={[styles.confirmButton, { backgroundColor: theme.primary }]} onPress={handleConfirm}>
          <Text style={[styles.confirmButtonText, { color: theme.textLight }]}>
            {t('Confirmer la course')} - {totalPrice} HTG
          </Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  routeContainer: { flexDirection: 'row' },
  routePoint: { alignItems: 'center', marginRight: 15 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  verticalLine: { width: 2, height: 40, marginVertical: 2 },
  routeDetails: { flex: 1 },
  locationText: { fontSize: 16, marginVertical: 8 },
  spacer: { height: 24 },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  serviceIcon: { fontSize: 32, marginRight: 15 },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 16, fontWeight: '600' },
  serviceTime: { fontSize: 14, marginTop: 2 },
  servicePrice: { fontSize: 18, fontWeight: '700' },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: { fontSize: 18, fontWeight: '600' },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 16, fontWeight: '600' },
  driverDetails: { fontSize: 14, marginTop: 2 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { fontSize: 14, marginLeft: 4 },
  priceDetails: { padding: 16, borderRadius: 12, borderWidth: 1 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 14 },
  priceValue: { fontSize: 14 },
  divider: { height: 1, marginVertical: 8 },
  totalLabel: { fontSize: 16, fontWeight: '600' },
  totalValue: { fontSize: 18, fontWeight: '700' },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  paymentText: { fontSize: 16, marginLeft: 12 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RideConfirmationScreen;


