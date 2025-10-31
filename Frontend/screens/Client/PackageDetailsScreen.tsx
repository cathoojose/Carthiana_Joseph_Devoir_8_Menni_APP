// frontend/screens/Client/PackageDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
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

const PackageDetailsScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { package: pkg } = route.params;

  const handleLiveTracking = () => {
    navigation.navigate('LiveTrackingPackage', { package: pkg });
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('Détails du colis')}
          </Text>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.border }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.closeText, { color: theme.text }]}>✕</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.packageInfo,
            { backgroundColor: theme.background, borderColor: theme.border },
          ]}
        >
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t('Nom du colis')}:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>{pkg.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t('Numéro de suivi')}:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>{pkg.trackingId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t('De')}:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>{pkg.from}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t('À')}:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>{pkg.to}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t('Client')}:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>Murad Zaman</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t('Poids')}:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>2.40 KG</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t('Statut')}:
            </Text>
            <Text style={[styles.value, { color: theme.primary }]}>{pkg.status}</Text>
          </View>
        </View>

        <View
          style={[
            styles.historySection,
            { backgroundColor: theme.background, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.historyTitle, { color: theme.text }]}>
            {t('Historique de livraison')}
          </Text>
          <View style={styles.historyItem}>
            <Text style={[styles.historyDate, { color: theme.text }]}>
              {t('3/04 Mirpur 11, Dhaka North')}
            </Text>
            <Text style={[styles.historyStatus, { color: theme.textSecondary }]}>
              {t('Créé')}
            </Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={[styles.historyDate, { color: theme.text }]}>
              {t('3/04 Mirpur 11, Dhaka North')}
            </Text>
            <Text style={[styles.historyStatus, { color: theme.textSecondary }]}>
              {t('En transit')}
            </Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={[styles.historyDate, { color: theme.text }]}>
              {t('3/04 Mirpur 11, Dhaka North')}
            </Text>
            <Text style={[styles.historyStatus, { color: theme.textSecondary }]}>
              {t('Prêt à être livré')}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.liveTrackingButton, { backgroundColor: theme.button }]}
          onPress={handleLiveTracking}
        >
          <Text style={[styles.liveTrackingButtonText, { color: theme.textLight }]}>
            {t('Suivi en direct')}
          </Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  title: { 
    fontSize: 20, 
    fontWeight: '600' 
  },
  closeButton: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  closeText: { 
    fontSize: 18 
  },
  packageInfo: { 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20, 
    borderWidth: 1 
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  label: { 
    fontSize: 14 
  },
  value: { 
    fontSize: 14, 
    fontWeight: '500' 
  },
  historySection: { 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20, 
    borderWidth: 1 
  },
  historyTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 10 
  },
  historyItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  historyDate: { 
    fontSize: 14 
  },
  historyStatus: { 
    fontSize: 14 
  },
  liveTrackingButton: { 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  liveTrackingButtonText: { 
    fontSize: 18, 
    fontWeight: '500' 
  },
});

export default PackageDetailsScreen;


