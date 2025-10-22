// screens/Client/HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('home')}</Text>

      <TouchableOpacity style={[styles.serviceButton, styles.transportButton]}>
        <Text style={styles.serviceButtonText}>{t('transport')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.serviceButton, styles.deliveryButton]}>
        <Text style={styles.serviceButtonText}>{t('delivery')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    color: Colors.text,
  },
  serviceButton: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  transportButton: {
    backgroundColor: '#E3F2FD',
  },
  deliveryButton: {
    backgroundColor: '#F3E5F5',
  },
  serviceButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default HomeScreen;