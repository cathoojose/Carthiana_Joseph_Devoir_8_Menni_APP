// frontend/screens/Restaurant/RestaurantDetailScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  route: any;
  navigation: any;
};

const RestaurantDetailScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { restaurant } = route.params;

  const menuItems = [
    {
      id: 1,
      name: t('daily_special'),
      description: t('daily_special_description'),
      price: 6.59,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
    },
    {
      id: 2,
      name: t('fritay'),
      description: t('fritay_description'),
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1594212699456-724332414651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
    },
    {
      id: 3,
      name: t('lalo'),
      description: t('lalo_description'),
      price: 7.25,
      image: 'https://images.unsplash.com/photo-1571091780685-8493c340726d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
    },
  ];

  const handleAddToCart = (item: any) => {
    navigation.navigate('OrderConfirmation' as never, { item, restaurant } as never);
  };

  return (
    <ThemedView>
      {/* En-tête avec image du restaurant */}
      <View style={styles.header}>
        <Image source={{ uri: restaurant.image.trim() }} style={styles.headerImage} />
        <View
          style={[
            styles.headerContent,
            { backgroundColor: `rgba(${theme.text === '#000000' ? '0,0,0' : '18,18,18'},0.7)` },
          ]}
        >
          <Text style={[styles.restaurantName, { color: theme.textLight }]}>
            {restaurant.name}
          </Text>
          <Text style={[styles.restaurantCategory, { color: theme.textLight }]}>
            {restaurant.category}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText, { color: theme.textLight }]}>
              ⭐ {restaurant.rating}
            </Text>
            <Text style={[styles.distanceText, { color: theme.textLight }]}>
              • {restaurant.distance}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu */}
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('menu')}</Text>
        {menuItems.map((item) => (
          <View
            key={item.id}
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.background,
                shadowColor: theme.text,
              },
            ]}
          >
            <Image source={{ uri: item.image.trim() }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
              <Text
                style={[styles.itemDescription, { color: theme.textSecondary }]}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <View style={styles.itemFooter}>
                <Text style={[styles.itemPrice, { color: theme.primary }]}>
                  ${item.price.toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: theme.button }]}
                  onPress={() => handleAddToCart(item)}
                >
                  <Text style={[styles.addButtonText, { color: theme.textLight }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '600',
  },
  restaurantCategory: {
    fontSize: 14,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
  },
  distanceText: {
    fontSize: 14,
    marginLeft: 5,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 15,
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
  itemDetails: {
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
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
  },
});

export default RestaurantDetailScreen;



