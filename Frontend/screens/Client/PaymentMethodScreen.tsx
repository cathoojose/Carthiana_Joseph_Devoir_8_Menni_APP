// frontend/screens/Client/PaymentMethodScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  route: any;
  navigation: any;
};

const PaymentMethodScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { total } = route.params;

  const handleSelectMethod = (method: 'cash' | 'moncash' | 'natcash') => {
    switch (method) {
      case 'cash':
        navigation.navigate('CashPayment', { total });
        break;
      case 'moncash':
        navigation.navigate('MonCashPayment', { total });
        break;
      case 'natcash':
        navigation.navigate('NatCashPayment', { total });
        break;
      default:
        Alert.alert(t('error'), t('Méthode non supportée'));
    }
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('Choisissez votre mode de paiement')}
        </Text>
        <Text style={[styles.total, { color: theme.primary }]}>
          {t('Total')} : {total.toFixed(2)} HTG
        </Text>

        <TouchableOpacity
          style={[
            styles.methodButton,
            { backgroundColor: theme.background, borderColor: theme.border },
          ]}
          onPress={() => handleSelectMethod('cash')}
        >
          <Text style={styles.methodIcon}>💵</Text>
          <View style={styles.methodInfo}>
            <Text style={[styles.methodName, { color: theme.text }]}>
              {t('Espèces')}
            </Text>
            <Text style={[styles.methodDesc, { color: theme.textSecondary }]}>
              {t('Payer en espèces au livreur')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodButton,
            { backgroundColor: theme.background, borderColor: theme.border },
          ]}
          onPress={() => handleSelectMethod('moncash')}
        >
          <Text style={styles.methodIcon}>📱</Text>
          <View style={styles.methodInfo}>
            <Text style={[styles.methodName, { color: theme.text }]}>MonCash</Text>
            <Text style={[styles.methodDesc, { color: theme.textSecondary }]}>
              {t('Paiement sécurisé via MonCash')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodButton,
            { backgroundColor: theme.background, borderColor: theme.border },
          ]}
          onPress={() => handleSelectMethod('natcash')}
        >
          <Text style={styles.methodIcon}>📱</Text>
          <View style={styles.methodInfo}>
            <Text style={[styles.methodName, { color: theme.text }]}>NatCash</Text>
            <Text style={[styles.methodDesc, { color: theme.textSecondary }]}>
              {t('Paiement sécurisé via NatCash')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
  },
  methodDesc: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default PaymentMethodScreen;

