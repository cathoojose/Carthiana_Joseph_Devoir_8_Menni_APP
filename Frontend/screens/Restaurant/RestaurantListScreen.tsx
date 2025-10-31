// frontend/screens/Restaurant/RestaurantListScreen.tsx
import React from 'react';
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
  navigation: any;
};

const RestaurantListScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Simuler une liste de restaurants
  const restaurants = [
    {
      id: 1,
      name: 'Wizlo Bar & Restaurant',
      rating: 4.8,
      category: 'Bar / Restaurant',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      distance: '2.5 km',
    },
    {
      id: 2,
      name: 'Happiness Restaurant',
      rating: 4.5,
      category: 'Familial',
      image:
        'https://images.unsplash.com/photo-1550966871-https://media.istockphoto.com/id/2209429811/photo/vegan-lunch-bowl-with-lentils-roasted-vegetables-and-chickpeas-pearl-couscous-salad.jpg?s=2048x2048&w=is&k=20&c=ZslRo22KZvCkVrg8UUoPWPLrEwCg9SdfViG2ESI0_yQ=3ed3cdb3266b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      distance: '1.8 km',
    },
    {
      id: 3,
      name: 'La Douceur Restaurant',
      rating: 4.9,
      category: 'Cuisine locale',
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      distance: '3.2 km',
    },
    {
      id: 4,
      name: 'Denise Restaurant',
      rating: 4.7,
      category: 'Cuisine locale',
      image:
        'https://images.unsplash.com/photo-1559837303-67https://media.istockphoto.com/id/2207789325/photo/young-black-woman-drinking-aperitif-while-sitting-at-a-table-at-a-sidewalk-cafe-during-the.jpg?s=2048x2048&w=is&k=20&c=sZBlOfr7Zd1sQssRx0WdNRzqZsIRfFqNt8CD8PYsH2o=d770302503?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      distance: '1.1 km',
    },

    {
      id: 5,
      name: 'Mes delices Restaurant',
      rating: 4.7,
      category: 'Cuisine locale',
      image:
        'https://images.unsplash.com/phhttps://cdn.pixabay.com/photo/2015/06/30/19/54/restaurant-826738_1280.jpgoto-1559837303-67https://media.istockphoto.com/id/2207789325/photo/young-black-woman-drinking-aperitif-while-sitting-at-a-table-at-a-sidewalk-cafe-during-the.jpg?s=2048x2048&w=is&k=20&c=sZBlOfr7Zd1sQssRx0WdNRzqZsIRfFqNt8CD8PYsH2o=d770302503?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      distance: '1.1 km',
    },

    {
      id: 6,
      name: 'Coins des amies',
      rating: 4.7,
      category: 'Cuisine locale',
      image:
        'https://images.unsplash.com/https://media.istockphoto.com/id/2206029784/photo/young-friends-women-talking-and-drinking-coffee-at-sidewalk-cafe.jpg?s=2048x2048&w=is&k=20&c=pCcWFPNmR-5lVytYVi3IW7Mf9bT-Yk_4CKmONgCPtwc=photo-1559837303-67https://media.istockphoto.com/id/2207789325/photo/young-black-woman-drinking-aperitif-while-sitting-at-a-table-at-a-sidewalk-cafe-during-the.jpg?s=2048x2048&w=is&k=20&c=sZBlOfr7Zd1sQssRx0WdNRzqZsIRfFqNt8CD8PYsH2o=d770302503?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      distance: '1.4 km',
    },
  ];

  return (
    <ThemedView>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.primaryLight,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>{t('all_restaurants')}</Text>
        <TouchableOpacity
          style={[
            styles.searchIcon,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text style={[styles.iconText, { color: theme.textLight }]}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des restaurants */}
      <ScrollView contentContainerStyle={styles.list}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={[
              styles.restaurantCard,
              {
                backgroundColor: theme.background,
                shadowColor: theme.text,
              },
            ]}
            onPress={() => navigation.navigate('RestaurantDetail' as never, { restaurant } as never)}
          >
            <Image
              source={{ uri: restaurant.image.trim() }}
              style={styles.restaurantImage}
            />
            <View style={styles.restaurantInfo}>
              <Text style={[styles.restaurantName, { color: theme.text }]}>
                {restaurant.name}
              </Text>
              <Text style={[styles.restaurantCategory, { color: theme.textSecondary }]}>
                {restaurant.category}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={[styles.ratingText, { color: theme.primary }]}>
                  ⭐ {restaurant.rating}
                </Text>
                <Text style={[styles.distanceText, { color: theme.textSecondary }]}>
                  • {restaurant.distance}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80, // Pour laisser de l'espace à la barre de navigation en bas
  },
  restaurantCard: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
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
});

export default RestaurantListScreen;



