// frontend/screens/Client/LiveTrackingScreen.tsx
import React, { useEffect, useState } from 'react';
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
  route: any;
  navigation: any;
};

const LiveTrackingScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { order } = route.params;
  const [timeRemaining, setTimeRemaining] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          Alert.alert(t('Livraison terminée'), t('Votre commande est arrivée !'));
          navigation.replace('OrderSuccess');
          return 0;
        }
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCallDriver = () => {
    Alert.alert(t('Appel'), t('Fonctionnalité non disponible en mode démo'));
  };

  const handleChatDriver = () => {
    Alert.alert(t('Chat'), t('Fonctionnalité non disponible en mode démo'));
  };

  return (
    <ThemedView>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.primaryLight }]}>
        <Text style={[styles.title, { color: theme.text }]}>{t('Suivi en temps réel')}</Text>
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: theme.border }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.closeText, { color: theme.text }]}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Carte (simulée) */}
      <View style={[styles.mapContainer, { borderColor: theme.border }]}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x200?text=OpenStreetMap+Simulator' }}
          style={styles.map}
          resizeMode="cover"
        />
        <View style={[styles.driverMarker, { backgroundColor: theme.primary }]}>
          <Text style={[styles.driverText, { color: theme.textLight }]}>🚗</Text>
        </View>
      </View>

      {/* Info du colis */}
      <View
        style={[
          styles.packageInfo,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.packageTitle, { color: theme.text }]}>{t('Information du colis')}</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>{t('Type de livraison')}:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{order.deliveryType || 'Express delivery'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>{t('Poids')}:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{order.weight || '2.40KG'}</Text>
        </View>
      </View>

      {/* Info du livreur */}
      <View
        style={[
          styles.driverInfo,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        <View style={[styles.driverAvatar, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.avatarText, { color: theme.text }]}>👨‍💼</Text>
        </View>
        <View style={styles.driverDetails}>
          <Text style={[styles.driverName, { color: theme.text }]}>{order.driver?.name || 'Arlene McCoy'}</Text>
          <Text style={[styles.driverRole, { color: theme.textSecondary }]}>{t('Livreur')}</Text>
        </View>
        <View style={styles.driverActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.button }]}
            onPress={handleCallDriver}
          >
            <Text style={[styles.actionIcon, { color: theme.textLight }]}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.button }]}
            onPress={handleChatDriver}
          >
            <Text style={[styles.actionIcon, { color: theme.textLight }]}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Timer */}
      <View style={[styles.timerContainer, { backgroundColor: theme.primaryLight }]}>
        <Text style={[styles.timerText, { color: theme.primary }]}>{timeRemaining} : 00</Text>
        <Text style={[styles.timerLabel, { color: theme.text }]}>{t('Temps restant')}</Text>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: { fontSize: 20, fontWeight: '600' },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { fontSize: 18 },
  mapContainer: {
    height: 200,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  map: { width: '100%', height: '100%' },
  driverMarker: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  driverText: { fontSize: 20 },
  packageInfo: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
  },
  packageTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { fontSize: 14 },
  value: { fontSize: 14, fontWeight: '500' },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
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
  avatarText: { fontSize: 24 },
  driverDetails: { flex: 1 },
  driverName: { fontSize: 16, fontWeight: '600' },
  driverRole: { fontSize: 14 },
  driverActions: { flexDirection: 'row' },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionIcon: { fontSize: 18 },
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  timerText: { fontSize: 48, fontWeight: '700' },
  timerLabel: { fontSize: 16, marginTop: 5 },
});

export default LiveTrackingScreen;