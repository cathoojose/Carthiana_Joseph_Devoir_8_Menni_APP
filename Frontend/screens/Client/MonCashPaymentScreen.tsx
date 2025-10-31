// frontend/screens/Client/MonCashPaymentScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  route: any;
  navigation: any;
};

const MonCashPaymentScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { total } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePayWithMonCash = async () => {
    setLoading(true);
    try {
      const success = Math.random() > 0.3;
      setTimeout(() => {
        setLoading(false);
        if (success) {
          navigation.replace('PaymentSuccess');
        } else {
          navigation.replace('PaymentError', {
            error: t('L’API MonCash est temporairement indisponible. Veuillez réessayer plus tard.'),
          });
        }
      }, 2000);
    } catch (err) {
      setLoading(false);
      navigation.replace('PaymentError', {
        error: t('Une erreur inattendue est survenue.'),
      });
    }
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.primary }]}>
          MonCash
        </Text>
        <Text style={[styles.amount, { color: theme.text }]}>
          {total.toFixed(2)} HTG
        </Text>
        <Text style={[styles.info, { color: theme.text }]}>
          {t('Vous serez redirigé vers l’application MonCash pour confirmer le paiement.')}
        </Text>

        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: theme.button }, loading && styles.buttonDisabled]}
          onPress={handlePayWithMonCash}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.textLight} />
          ) : (
            <Text style={[styles.payButtonText, { color: theme.textLight }]}>
              {t('Payer avec MonCash')}
            </Text>
          )}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    marginHorizontal: 20,
  },
  payButton: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default MonCashPaymentScreen;

