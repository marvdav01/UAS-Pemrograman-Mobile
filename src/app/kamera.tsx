import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';

// expo-camera hanya didukung di Android/iOS, tidak mendukung Web
export default function KameraScreen() {
  const router = useRouter();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // === WEB FALLBACK ===
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webFallback}>
        <Text style={styles.icon}>📷</Text>
        <Text style={styles.title}>Fitur Kamera</Text>
        <Text style={styles.message}>
          Fitur kamera menggunakan expo-camera yang hanya didukung di perangkat Android dan iOS.
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Cara menggunakan fitur kamera:</Text>
          <Text style={styles.step}>1. Install aplikasi Expo Go di Android Anda</Text>
          <Text style={styles.step}>2. Scan QR Code dari terminal Expo</Text>
          <Text style={styles.step}>3. Masuk ke halaman Bukti Pesanan</Text>
          <Text style={styles.step}>4. Izinkan akses kamera</Text>
          <Text style={styles.step}>5. Foto dan simpan bukti penerimaan</Text>
        </View>
        <Text style={styles.hint}>
          Jalankan dengan: npx expo start → scan QR dengan Expo Go
        </Text>
      </View>
    );
  }

  // === NATIVE (Android / iOS) ===
  const { CameraView, useCameraPermissions } = require('expo-camera');
  return <NativeCameraScreen />;
}

function NativeCameraScreen() {
  const { CameraView, useCameraPermissions } = require('expo-camera');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);
  const router = useRouter();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionIcon}>📷</Text>
        <Text style={styles.permissionText}>Kami membutuhkan izin untuk menggunakan kamera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Beri Izin Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) setPhotoUri(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Gagal mengambil foto');
      }
    }
  };

  const handleSave = () => {
    Alert.alert('Sukses', 'Bukti penerimaan berhasil disimpan!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.preview} />
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.button, styles.retakeButton]} onPress={() => setPhotoUri(null)}>
            <Text style={styles.buttonText}>🔄 Ulangi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>✅ Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  // Native camera styles
  camera: { flex: 1, width: '100%' },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#000',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  retakeButton: { backgroundColor: '#DC3545' },
  saveButton: { backgroundColor: '#28A745' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  permissionIcon: { fontSize: 50, marginBottom: 16 },
  permissionText: { color: '#fff', textAlign: 'center', marginBottom: 20, fontSize: 16, paddingHorizontal: 30 },
  // Web fallback styles
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F5F5F5',
  },
  icon: { fontSize: 60, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  message: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
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
  infoTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  step: { fontSize: 13, color: '#444', marginBottom: 6 },
  hint: { fontSize: 12, color: '#999', textAlign: 'center', fontStyle: 'italic' },
});
