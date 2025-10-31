// hooks/useTheme.ts
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'light' ? Colors.light : Colors.dark;
};