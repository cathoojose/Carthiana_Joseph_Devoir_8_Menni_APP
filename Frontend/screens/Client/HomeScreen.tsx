// frontend/screens/Client/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ThemedView from '../../components/ThemedView';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  navigation: any;
};

const HomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://media.istockphoto.com/id/2166802703/photo/confident-businessman-standing-by-car-with-smartphone-in-city.jpg?s=612x612&w=0&k=20&c=OeWcRGXMqWSOIioVANYvIAoDXTjq0AQmYeNZIw8xULk=',
    },
    {
      id: 2,
      image: 'https://media.istockphoto.com/id/1180914486/photo/table-with-lunch-for-three-people.jpg?s=2048x2048&w=is&k=20&c=FE4QToM7sluKH6rW_7CPOq_C0DexcYt4LMtmKUxEUuU=',
    },
    {
      id: 3,
      image: 'https://media.istockphoto.com/id/2183978097/photo/business-people-entering-on-bus-on-the-city.jpg?s=2048x2048&w=is&k=20&c=0O1PmKbN5WAzuv1noBM-24H8hZSZzc336OL62UFyjzY=',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleServicePress = (serviceType: 'ride' | 'send' | 'food') => {
    switch (serviceType) {
      case 'ride':
        navigation.navigate('ServiceOptions', { serviceType });
        break;
      case 'send':
        navigation.navigate('PackageTracking');
        break;
      case 'food':
        navigation.navigate('RestaurantList');
        break;
      default:
        console.warn(t('Service non reconnu'), serviceType);
    }
  };

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.greeting, { color: theme.textLight }]}>
            {t('Bonjour')}, Kathiana!
          </Text>
          <TouchableOpacity style={[styles.profileIcon, { backgroundColor: theme.primary }]}>
            <Text style={[styles.profileText, { color: theme.textLight }]}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Carrousel */}
        <View style={styles.carouselContainer}>
          <Image
            source={{ uri: slides[currentSlide].image.trim() }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: currentSlide === index ? theme.primary : '#AAA',
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Recherche */}
        <View style={[styles.searchContainer, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <Text style={[styles.searchPlaceholder, { color: theme.textSecondary }]}>
            {t('Rechercher un restaurant ou un service')}
          </Text>
          <TouchableOpacity style={[styles.searchIcon, { backgroundColor: theme.primaryLight }]}>
            <Text style={[styles.iconText, { color: theme.text }]}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Catégories */}
        <View style={styles.categoriesContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('Catégories')}
          </Text>
          <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: theme.background, borderColor: theme.border }]}
            onPress={() => handleServicePress('ride')}
          >
            <Text style={styles.categoryIcon}>🏍️</Text>
            <Text style={[styles.categoryLabel, { color: theme.text }]}>
              {t('Transport')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: theme.background, borderColor: theme.border }]}
            onPress={() => handleServicePress('send')}
          >
            <Text style={styles.categoryIcon}>📦</Text>
            <Text style={[styles.categoryLabel, { color: theme.text }]}>
              {t('Send')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: theme.background, borderColor: theme.border }]}
            onPress={() => handleServicePress('food')}
          >
            <Text style={styles.categoryIcon}>🍽️</Text>
            <Text style={[styles.categoryLabel, { color: theme.text }]}>
              {t('Restaurants')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Offres spéciales */}
        <View style={styles.offersContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('Offres spéciales')}
          </Text>
          <TouchableOpacity style={[styles.offerCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Text style={styles.offerIcon}>🎁</Text>
            <View style={styles.offerDetails}>
              <Text style={[styles.offerTitle, { color: theme.text }]}>
                {t('10% de reduction sur votre prochaine course')}
              </Text>
              <Text style={[styles.offerSubtitle, { color: theme.textSecondary }]}>
                {t('Valable jusqu\'à la fin du mois')}
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.textSecondary }]}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.offerCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Text style={styles.offerIcon}>📦</Text>
            <View style={styles.offerDetails}>
              <Text style={[styles.offerTitle, { color: theme.text }]}>
                {t('20% de reduction sur votre première livraison')}
              </Text>
              <Text style={[styles.offerSubtitle, { color: theme.textSecondary }]}>
                {t('Nouveau client seulement')}
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 18,
  },
  carouselContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: 150,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  offersContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  offerIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  offerDetails: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  offerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
  },
});

export default HomeScreen;
