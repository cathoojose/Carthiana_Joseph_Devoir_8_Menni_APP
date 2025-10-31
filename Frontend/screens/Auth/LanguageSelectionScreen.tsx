import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedView from '../../components/ThemedView';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../../utils/i18n'; // ✅ bon import

const LanguageSelectionScreen = () => {
  const { t } = useTranslation(); // ✅ retiré i18n ici
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(true);

  const languages = [
    { code: 'fr', name: t('french'), flag: '🇫🇷' },
    { code: 'ht', name: t('creole'), flag: '🇭🇹' },
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <ThemedView>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {t('select_language')}
          </Text>
        </View>

        {/* Liste des langues */}
        <View style={styles.languageList}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageOption,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                },
                i18n.language === language.code && {
                  backgroundColor: theme.primaryLight,
                  borderColor: theme.primary,
                },
              ]}
              onPress={() => changeLanguage(language.code)}
            >
              <Text style={[styles.flag, { color: theme.text }]}>{language.flag}</Text>
              <Text style={[styles.languageName, { color: theme.text }]}>
                {language.name}
              </Text>
              {i18n.language === language.code && (
                <Ionicons name="checkmark" size={20} color={theme.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  languageList: {
    gap: 12,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default LanguageSelectionScreen;


