// frontend/screens/Client/CashPaymentScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  route: any;
  navigation: any;
};

const CashPaymentScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { total } = route.params;

  const handleConfirmCash = () => {
    navigation.replace('LiveTracking', {
      order: {
        driver: { name: 'Arlene McCoy', phone: '+50934567890' },
        deliveryType: 'Express delivery',
        weight: '2.40KG',
      },
    });
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('Paiement en espèces')}
        </Text>
        <Text style={[styles.info, { color: theme.text }]}>
          {t('Vous paierez')} {total.toFixed(2)} HTG {t('en espèces au livreur à la livraison.')}
        </Text>
        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: theme.button }]}
          onPress={handleConfirmCash}
        >
          <Text style={[styles.confirmButtonText, { color: theme.textLight }]}>
            {t('Confirmer')}
          </Text>
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
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CashPaymentScreen;




