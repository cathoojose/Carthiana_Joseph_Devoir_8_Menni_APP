// frontend/screens/Client/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';

type Props = {
  navigation: any;
};

const HomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

 const slides = [
     { id: 1, image: 'https://media.istockphoto.com/id/2166802703/photo/confident-businessman-standing-by-car-with-smartphone-in-city.jpg?s=612x612&w=0&k=20&c=OeWcRGXMqWSOIioVANYvIAoDXTjq0AQmYeNZIw8xULk=' },
     { id: 2, image: 'https://media.istockphoto.com/id/1180914486/photo/table-with-lunch-for-three-people.jpg?s=2048x2048&w=is&k=20&c=FE4QToM7sluKH6rW_7CPOq_C0DexcYt4LMtmKUxEUuU=' },
     { id: 3, image: 'https://media.istockphoto.com/id/2183978097/photo/business-people-entering-on-bus-on-the-city.jpg?s=2048x2048&w=is&k=20&c=0O1PmKbN5WAzuv1noBM-24H8hZSZzc336OL62UFyjzY=' },
 ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleServicePress = (serviceType: 'ride' | 'car' | 'food') => {
    switch (serviceType) {
      case 'ride':
      case 'car':
        // Navigue vers ServiceOptionsScreen avec le type de service
        navigation.navigate('ServiceOptions', { serviceType });
        break;
      case 'food':
        Alert.alert(t('info'), t('Fonctionnalité en développement'));
        break;
      default:
        Alert.alert(t('error'), t('Service non reconnu'));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{t('Bonjour')}, Nik!</Text>
          <TouchableOpacity style={styles.profileIcon}>
            <Text style={styles.profileText}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Carrousel */}
        <View style={styles.carouselContainer}>
          <Image
            source={{ uri: slides[currentSlide].image }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlide === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Recherche */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchPlaceholder}>
            {t('Rechercher un restaurant ou un service')}
          </Text>
          <TouchableOpacity style={styles.searchIcon}>
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Catégories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>{t('Catégories')}</Text>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleServicePress('ride')}
          >
            <Text style={styles.categoryIcon}>🏍️</Text>
            <Text style={styles.categoryLabel}>{t('Transport')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleServicePress('car')}
          >
            <Text style={styles.categoryIcon}>🚗</Text>
            <Text style={styles.categoryLabel}>{t('Voiture')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleServicePress('food')}
          >
            <Text style={styles.categoryIcon}>🍽️</Text>
            <Text style={styles.categoryLabel}>{t('Restaurants')}</Text>
          </TouchableOpacity>
        </View>

        {/* Offres spéciales */}
        <View style={styles.offersContainer}>
          <Text style={styles.sectionTitle}>{t('Offres spéciales')}</Text>
          <TouchableOpacity style={styles.offerCard}>
            <Text style={styles.offerIcon}>🎁</Text>
            <View style={styles.offerDetails}>
              <Text style={styles.offerTitle}>
                {t('1000 XP pour votre prochaine course')}
              </Text>
              <Text style={styles.offerSubtitle}>
                {t('Valable jusqu’à la fin du mois')}
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerCard}>
            <Text style={styles.offerIcon}>🎉</Text>
            <View style={styles.offerDetails}>
              <Text style={styles.offerTitle}>
                {t('2000 XP pour votre première livraison')}
              </Text>
              <Text style={styles.offerSubtitle}>
                {t('Nouveau client seulement')}
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barre de navigation en bas
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>🏠</Text>
          <Text style={[styles.navLabel, styles.activeNavLabel]}>{t('Accueil')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('History')}>
          <Text style={styles.navIcon}>📦</Text>
          <Text style={styles.navLabel}>{t('Commandes')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>{t('Profil')}</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.primaryLight,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 18,
    color: Colors.textLight,
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
    backgroundColor: '#AAA',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  searchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    color: Colors.text,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  offersContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.text,
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: Colors.text,
  },
  activeNavIcon: {
    color: Colors.primary,
  },
  navLabel: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 4,
  },
  activeNavLabel: {
    color: Colors.primary,
  },
});

export default HomeScreen;














// // frontend/screens/Client/HomeScreen.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { Colors } from '../../constants/Colors';

// type Props = {
//   navigation: any;
// };

// const HomeScreen = ({ navigation }: Props) => {
//   const { t } = useTranslation();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Simuler des slides pour le carrousel
//   const slides = [
//     { id: 1, image: 'https://media.istockphoto.com/id/2166802703/photo/confident-businessman-standing-by-car-with-smartphone-in-city.jpg?s=612x612&w=0&k=20&c=OeWcRGXMqWSOIioVANYvIAoDXTjq0AQmYeNZIw8xULk=' },
//     { id: 2, image: 'https://media.istockphoto.com/id/1180914486/photo/table-with-lunch-for-three-people.jpg?s=2048x2048&w=is&k=20&c=FE4QToM7sluKH6rW_7CPOq_C0DexcYt4LMtmKUxEUuU=' },
//     { id: 3, image: 'https://media.istockphoto.com/id/2183978097/photo/business-people-entering-on-bus-on-the-city.jpg?s=2048x2048&w=is&k=20&c=0O1PmKbN5WAzuv1noBM-24H8hZSZzc336OL62UFyjzY=' },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide(prev => (prev + 1) % slides.length);
//     }, 5000); // Changer toutes les 5 secondes
//     return () => clearInterval(interval);
//   }, []);

//   const handleServicePress = (service: string) => {
//     switch (service) {
//       case 'ride':
//         navigation.navigate('LocationInput');
//         break;
//       case 'car':
//         navigation.navigate('LocationInput');
//         break;
//       case 'food':
//         navigation.navigate('RestaurantList'); // À créer plus tard
//         break;
//       default:
//         Alert.alert(t('error'), t('Service non disponible'));
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.greeting}>{t('Bonjour')}, Kathiana!</Text>
//           <TouchableOpacity style={styles.profileIcon}>
//             <Text style={styles.profileText}>👤</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Carrousel d’images */}
//         <View style={styles.carouselContainer}>
//           <Image
//             source={{ uri: slides[currentSlide].image }}
//             style={styles.carouselImage}
//             resizeMode="cover"
//           />
//           <View style={styles.dotsContainer}>
//             {slides.map((_, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.dot,
//                   currentSlide === index && styles.activeDot,
//                 ]}
//               />
//             ))}
//           </View>
//         </View>

//         {/* Champ de recherche (optionnel) */}
//         <View style={styles.searchContainer}>
//           <Text style={styles.searchPlaceholder}>{t('Rechercher un restaurant ou un service')}</Text>
//           <TouchableOpacity style={styles.searchIcon}>
//             <Text style={styles.iconText}>🔍</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Catégories */}
//         <View style={styles.categoriesContainer}>
//           <Text style={styles.sectionTitle}>{t('Catégories')}</Text>
//           <TouchableOpacity style={styles.categoryButton} onPress={() => handleServicePress('ride')}>
//             <Text style={styles.categoryIcon}>🏍️</Text>
//             <Text style={styles.categoryLabel}>{t('Transport')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.categoryButton} onPress={() => handleServicePress('car')}>
//             <Text style={styles.categoryIcon}>🚗</Text>
//             <Text style={styles.categoryLabel}>{t('Voiture')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.categoryButton} onPress={() => handleServicePress('food')}>
//             <Text style={styles.categoryIcon}>🍽️</Text>
//             <Text style={styles.categoryLabel}>{t('Restaurants')}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Offres spéciales (simulées) */}
//         <View style={styles.offersContainer}>
//           <Text style={styles.sectionTitle}>{t('Offres spéciales')}</Text>
//           <TouchableOpacity style={styles.offerCard}>
//             <Text style={styles.offerIcon}>🎁</Text>
//             <View style={styles.offerDetails}>
//               <Text style={styles.offerTitle}>{t('1000 XP pour votre prochaine course')}</Text>
//               <Text style={styles.offerSubtitle}>{t('Valable jusqu’à la fin du mois')}</Text>
//             </View>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.offerCard}>
//             <Text style={styles.offerIcon}>🎉</Text>
//             <View style={styles.offerDetails}>
//               <Text style={styles.offerTitle}>{t('2000 XP pour votre première livraison')}</Text>
//               <Text style={styles.offerSubtitle}>{t('Nouveau client seulement')}</Text>
//             </View>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Barre de navigation en bas
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={[styles.navIcon, styles.activeNavIcon]}>🏠</Text>
//           <Text style={[styles.navLabel, styles.activeNavLabel]}>{t('Accueil')}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('History')}>
//           <Text style={styles.navIcon}>📦</Text>
//           <Text style={styles.navLabel}>{t('Commandes')}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
//           <Text style={styles.navIcon}>👤</Text>
//           <Text style={styles.navLabel}>{t('Profil')}</Text>
//         </TouchableOpacity>
//       </View> */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   scrollContent: {
//     paddingBottom: 70, // Pour laisser de l’espace à la barre de navigation
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: Colors.primaryLight,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: Colors.text,
//   },
//   profileIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: Colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileText: {
//     fontSize: 18,
//     color: Colors.textLight,
//   },
//   carouselContainer: {
//     marginHorizontal: 20,
//     marginTop: 20,
//     borderRadius: 12,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   carouselImage: {
//     width: '100%',
//     height: 150,
//   },
//   dotsContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#AAA',
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     backgroundColor: Colors.primary,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginTop: 20,
//     padding: 12,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: Colors.border,
//   },
//   searchPlaceholder: {
//     flex: 1,
//     fontSize: 16,
//     color: '#666',
//   },
//   searchIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: Colors.primaryLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconText: {
//     fontSize: 18,
//     color: Colors.text,
//   },
//   categoriesContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: Colors.text,
//     marginBottom: 15,
//   },
//   categoryButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: Colors.border,
//   },
//   categoryIcon: {
//     fontSize: 24,
//     marginRight: 15,
//   },
//   categoryLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: Colors.text,
//   },
//   offersContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   offerCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: Colors.border,
//   },
//   offerIcon: {
//     fontSize: 24,
//     marginRight: 15,
//   },
//   offerDetails: {
//     flex: 1,
//   },
//   offerTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.text,
//   },
//   offerSubtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 2,
//   },
//   arrow: {
//     fontSize: 20,
//     color: '#666',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: Colors.background,
//     borderTopWidth: 1,
//     borderTopColor: Colors.border,
//     paddingTop: 10,
//     paddingBottom: 10,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   navItem: {
//     alignItems: 'center',
//   },
//   navIcon: {
//     fontSize: 24,
//     color: Colors.text,
//   },
//   activeNavIcon: {
//     color: Colors.primary,
//   },
//   navLabel: {
//     fontSize: 12,
//     color: Colors.text,
//     marginTop: 4,
//   },
//   activeNavLabel: {
//     color: Colors.primary,
//   },
// });

// export default HomeScreen;