// frontend/screens/Restaurant/OrderConfirmationScreen.tsx
import React, { useState } from 'react';
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

const OrderConfirmationScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { item, restaurant } = route.params;

  const [quantity, setQuantity] = useState(1);
  const totalPrice = item.price * quantity;

  const handlePlaceOrder = () => {
  Alert.alert(
    t('order_confirmed'),
    `${t('you_ordered')} ${quantity} x ${t(item.name)} ${t('for')} $${totalPrice.toFixed(2)}.\n${t('delivery_soon')}`,
    [{ text: t('ok'), onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('confirm_order')}
          </Text>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.border }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.closeText, { color: theme.text }]}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Détail du plat */}
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: theme.background,
              shadowColor: theme.text,
            },
          ]}
        >
          <Image source={{ uri: item.image.trim() }} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
            <Text
              style={[styles.itemDescription, { color: theme.textSecondary }]}
              numberOfLines={2}
            >
              {item.description}
            </Text>
            <Text style={[styles.itemPrice, { color: theme.primary }]}>
              ${item.price.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Quantité */}
        <View style={styles.quantityContainer}>
          <Text style={[styles.quantityLabel, { color: theme.text }]}>
            {t('quantity')}:
          </Text>
          <View style={styles.quantityButtons}>
            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: theme.border }]}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={[styles.quantityButtonText, { color: theme.text }]}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.quantityValue, { color: theme.text }]}>{quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: theme.border }]}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={[styles.quantityButtonText, { color: theme.text }]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Total */}
        <View
          style={[
            styles.totalContainer,
            {
              backgroundColor: theme.primaryLight,
            },
          ]}
        >
          <Text style={[styles.totalLabel, { color: theme.text }]}>
            {t('total')}:
          </Text>
          <Text style={[styles.totalValue, { color: theme.primary }]}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>

        {/* Bouton Placer la commande */}
        <TouchableOpacity
          style={[styles.orderButton, { backgroundColor: theme.button }]}
          onPress={() => navigation.navigate('PaymentMethod' as never, { total: totalPrice } as never)}
        >
          <Text style={[styles.orderButtonText, { color: theme.textLight }]}>
            {t('place_order')}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  orderButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default OrderConfirmationScreen;


