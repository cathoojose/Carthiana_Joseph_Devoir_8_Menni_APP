// components/LanguageSelector.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface LanguageSelectorProps {
  // Supprimez position, on le gère dans le parent
  iconSize?: number;
  iconColor?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  iconSize = 24,
  iconColor = Colors.text,
}) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { code: 'fr', name: t('french'), flag: '🇫🇷' },
    { code: 'ht', name: t('creole'), flag: '🇭🇹' },
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setModalVisible(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style={styles.iconButton}
        accessibilityLabel={t('change_language')}
      >
        <Ionicons name="language-outline" size={iconSize} color={iconColor} />
        <Text style={styles.flagText}>{currentLanguage.flag}</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('select_language')}</Text>
            
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  i18n.language === language.code && styles.selectedLanguage
                ]}
                onPress={() => changeLanguage(language.code)}
              >
                <Text style={styles.flag}>{language.flag}</Text>
                <Text style={styles.languageName}>{language.name}</Text>
                {i18n.language === language.code && (
                  <Ionicons name="checkmark" size={20} color={Colors.button} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  flagText: {
    marginLeft: 6,
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.text,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedLanguage: {
    backgroundColor: Colors.button + '20', // jaune avec opacité
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
});

export default LanguageSelector;













// // components/LanguageSelector.tsx
// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { Ionicons } from '@expo/vector-icons'; // ou une autre librairie d'icônes
// import { Colors } from '../../constants/Colors';

// interface LanguageSelectorProps {
//   position?: 'left' | 'right';
//   iconSize?: number;
//   iconColor?: string;
// }

// const LanguageSelector: React.FC<LanguageSelectorProps> = ({
//   position = 'right',
//   iconSize = 24,
//   iconColor = Colors.text,
// }) => {
//   const { t, i18n } = useTranslation();
//   const [modalVisible, setModalVisible] = useState(false);

//   const languages = [
//     { code: 'fr', name: t('french'), flag: '🇫🇷' },
//     { code: 'ht', name: t('creole'), flag: '🇭🇹' },
//   ];

//   const changeLanguage = (langCode: string) => {
//     i18n.changeLanguage(langCode);
//     setModalVisible(false);
//   };

//   const currentLanguage = languages.find(lang => lang.code === i18n.language);

//   return (
//     <View style={[styles.container, position === 'left' ? styles.left : styles.right]}>
//       <TouchableOpacity 
//         onPress={() => setModalVisible(true)}
//         style={styles.iconButton}
//       >
//         <Ionicons name="language" size={iconSize} color={iconColor} />
//         {currentLanguage && (
//           <Text style={styles.flagText}>{currentLanguage.flag}</Text>
//         )}
//       </TouchableOpacity>

//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableOpacity 
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>{t('select_language')}</Text>
            
//             {languages.map((language) => (
//               <TouchableOpacity
//                 key={language.code}
//                 style={[
//                   styles.languageOption,
//                   i18n.language === language.code && styles.selectedLanguage
//                 ]}
//                 onPress={() => changeLanguage(language.code)}
//               >
//                 <Text style={styles.flag}>{language.flag}</Text>
//                 <Text style={styles.languageName}>{language.name}</Text>
//                 {i18n.language === language.code && (
//                   <Ionicons name="checkmark" size={20} color={Colors.primary} />
//                 )}
//               </TouchableOpacity>
//             ))}
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 50, // Ajustez selon votre header
//     zIndex: 1000,
//   },
//   left: {
//     left: 20,
//   },
//   right: {
//     right: 20,
//   },
//   iconButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.background,
//     padding: 8,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   flagText: {
//     marginLeft: 4,
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: Colors.background,
//     borderRadius: 16,
//     padding: 20,
//     width: '80%',
//     maxWidth: 300,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: Colors.text,
//   },
//   languageOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   selectedLanguage: {
//     backgroundColor: Colors.primary + '20', // 20% d'opacité
//   },
//   flag: {
//     fontSize: 20,
//     marginRight: 12,
//   },
//   languageName: {
//     flex: 1,
//     fontSize: 16,
//     color: Colors.text,
//   },
// });

// export default LanguageSelector;