import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

// react-native-maps hanya berjalan di Android/iOS, tidak mendukung Web
// Pada platform Web, tampilkan pesan informatif sebagai gantinya
export default function PetaScreen() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webFallback}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.title}>Fitur Peta</Text>
        <Text style={styles.message}>
          Fitur peta menggunakan react-native-maps yang hanya didukung di Android dan iOS.
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Lokasi Restoran:</Text>
          <Text style={styles.infoText}>Jl. Restoran Enak No. 1</Text>
          <Text style={styles.infoText}>Jakarta Pusat</Text>
          <Text style={styles.coords}>📍 -6.200000, 106.816666</Text>
        </View>
        <Text style={styles.hint}>
          Jalankan aplikasi di perangkat Android menggunakan Expo Go untuk melihat peta interaktif.
        </Text>
      </View>
    );
  }

  // Import dinamis hanya saat di native (Android/iOS)
  const MapView = require('react-native-maps').default;
  const { Marker } = require('react-native-maps');

  const restaurantLocation = {
    latitude: -6.200000,
    longitude: 106.816666,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...restaurantLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={restaurantLocation}
          title="Restoran Makanan Enak"
          description="Lokasi pengambilan pesanan Anda"
        />
      </MapView>
      <View style={styles.infoOverlay}>
        <Text style={styles.infoOverlayText}>📍 Lokasi Restoran ditampilkan di peta</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoOverlayText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Web fallback styles
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  coords: {
    fontSize: 12,
    color: '#007BFF',
    marginTop: 8,
    fontWeight: '500',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
