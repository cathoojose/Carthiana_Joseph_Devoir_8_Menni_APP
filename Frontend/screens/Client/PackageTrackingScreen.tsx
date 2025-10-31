// frontend/screens/Client/PackageTrackingScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  navigation: any;
};

const PackageTrackingScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [trackingNumber, setTrackingNumber] = useState('');

  const packages = [
    {
      id: 1,
      name: 'Macbook pro M2',
      trackingId: 'H123135461235',
      from: 'Mirpur 11, Dhaka',
      to: 'Mirpur 11, Dhaka',
      status: t('En transit'),
      date: '3/04',
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      trackingId: 'H987654321098',
      from: 'Port-au-Prince',
      to: 'Cap Haïtien',
      status: t('Prêt à être livré'),
      date: '3/05',
    },
  ];

  const handleTrackPackage = () => {
    if (!trackingNumber.trim()) {
      Alert.alert(t('error'), t('Veuillez entrer un numéro de suivi'));
      return;
    }

    const foundPackage = packages.find(p => p.trackingId === trackingNumber);
    if (foundPackage) {
      navigation.navigate('PackageDetails', { package: foundPackage });
    } else {
      Alert.alert(t('error'), t('Colis non trouvé. Vérifiez le numéro.'));
    }
  };

  const handleBookPackage = () => {
    Alert.alert(t('info'), t('Fonctionnalité en développement'));
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('Suivi de colis')}
          </Text>
          <TouchableOpacity style={[styles.refreshButton, { backgroundColor: theme.border }]}>
            <Text style={[styles.refreshText, { color: theme.text }]}>🔄</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme.background, borderColor: theme.border },
          ]}
        >
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder={t('Entrez le numéro de suivi')}
            placeholderTextColor={theme.textSecondary}
            value={trackingNumber}
            onChangeText={setTrackingNumber}
            keyboardType="default"
          />
          <TouchableOpacity
            style={[styles.searchIcon, { backgroundColor: theme.primaryLight }]}
            onPress={handleTrackPackage}
          >
            <Text style={[styles.iconText, { color: theme.text }]}>🔍</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[
              styles.quickActionButton,
              { backgroundColor: theme.background, borderColor: theme.border },
            ]}
            onPress={() => navigation.navigate('OrderSuccess')}
          >
            <Text style={[styles.quickActionText, { color: theme.text }]}>
              {t('Suivre la commande')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.quickActionButton,
              { backgroundColor: theme.background, borderColor: theme.border },
            ]}
            onPress={handleBookPackage}
          >
            <Text style={[styles.quickActionText, { color: theme.text }]}>
              {t('Réserver un colis')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('Colis en cours')}
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: theme.primary }]}>
              {t('Voir tout')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.packagesList}>
          {packages.map(pkg => (
            <TouchableOpacity
              key={pkg.id}
              style={[
                styles.packageCard,
                { backgroundColor: theme.background, borderColor: theme.border },
              ]}
              onPress={() => navigation.navigate('PackageDetails', { package: pkg })}
            >
              <View style={[styles.packageIcon, { backgroundColor: theme.primaryLight }]}>
                <Text style={[styles.iconText, { color: theme.text }]}>📦</Text>
              </View>
              <View style={styles.packageInfo}>
                <Text style={[styles.packageName, { color: theme.text }]}>{pkg.name}</Text>
                <Text style={[styles.packageId, { color: theme.textSecondary }]}>
                  #{pkg.trackingId}
                </Text>
                <Text style={[styles.packageStatus, { color: theme.primary }]}>
                  {t('Statut')} : {pkg.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  refreshButton: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  refreshText: { 
    fontSize: 18 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
    borderRadius: 12, 
    borderWidth: 1 
  },
  searchInput: { 
    flex: 1, 
    padding: 12, 
    fontSize: 16 
  },
  searchIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  iconText: { 
    fontSize: 18 
  },
  quickActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  quickActionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
  },
  quickActionText: { 
    fontSize: 14 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600' 
  },
  seeAllText: { 
    fontSize: 14 
  },
  packagesList: { 
    paddingBottom: 80 
  },
  packageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  packageIcon: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  packageInfo: { 
    flex: 1 
  },
  packageName: { 
    fontSize: 16, 
    fontWeight: '600' 
  },
  packageId: { 
    fontSize: 14, 
    marginTop: 2 
  },
  packageStatus: { 
    fontSize: 14, 
    marginTop: 2 
  },
});

export default PackageTrackingScreen;


