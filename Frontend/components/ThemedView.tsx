// components/ThemedView.tsx
import React, { ReactNode } from 'react';
import { View, useWindowDimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

interface ThemedViewProps {
  children: ReactNode;
  style?: any; // Permet de surcharger le style si besoin
}

const ThemedView = ({ children, style }: ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentTheme = isDarkMode ? Colors.dark : Colors.light;

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const paddingHorizontal = isLandscape ? 30 : 20;
  const paddingBottom = isLandscape ? 20 : 0;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }, style]}>
      <View
        style={{
          flex: 1,
          paddingTop,
          paddingHorizontal,
          paddingBottom,
        }}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemedView;