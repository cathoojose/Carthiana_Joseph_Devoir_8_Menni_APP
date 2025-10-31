// screens/Client/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Kathiana Joseph</Text>
      <Text style={styles.email}>kathiana@example.com</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color={Colors.textSecondary} />
          <Text style={styles.infoText}>+509 3456 7890</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color={Colors.textSecondary} />
          <Text style={styles.infoText}>Port-au-Prince, Haïti</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginTop: 40 },
  name: { fontSize: 24, fontWeight: '700', color: Colors.text, marginTop: 16 },
  email: { fontSize: 16, color: Colors.textSecondary, marginBottom: 20 },
  infoContainer: { width: '100%', marginTop: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  infoText: { fontSize: 16, marginLeft: 10, color: Colors.text },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: Colors.button,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 8 },
});

export default ProfileScreen;
