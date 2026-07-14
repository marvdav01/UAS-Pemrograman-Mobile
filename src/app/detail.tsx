import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function DetailScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    // Redirect otomatis ke halaman login setelah logout
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Detail Pesanan</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogoutModal(true)}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Status badge */}
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>🚴 Sedang Diantar</Text>
      </View>

      {/* Order details card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>ID Pesanan</Text>
          <Text style={styles.value}>ORD-20240501-12345</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Nama Item</Text>
          <Text style={styles.value}>Nasi Goreng Spesial</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Total Bayar</Text>
          <Text style={[styles.value, { color: '#28A745' }]}>Rp 25.000</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Alamat</Text>
          <Text style={styles.value}>Jl. Contoh No. 10, Jakarta</Text>
        </View>
      </View>

      {/* Action buttons */}
      <Text style={styles.subtitle}>Tindakan</Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/peta')}>
          <Text style={styles.buttonText}>📍 Lacak di Peta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#28A745' }]}
          onPress={() => router.push('/kamera')}
        >
          <Text style={styles.buttonText}>📷 Ambil Bukti Penerimaan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6C757D' }]}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.buttonText}>← Kembali ke Katalog</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Konfirmasi Logout</Text>
            <Text style={styles.modalMessage}>
              Apakah Anda yakin ingin keluar dari akun ini?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.confirmBtn]}
                onPress={handleLogout}
              >
                <Text style={styles.confirmBtnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  logoutBtn: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  statusBadge: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFB800',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  statusText: {
    color: '#856404',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A2E',
    maxWidth: '55%',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1A2E',
  },
  actionContainer: {
    gap: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    width: '85%',
    maxWidth: 360,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1A1A2E',
  },
  modalMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: { backgroundColor: '#F0F0F0' },
  cancelBtnText: { color: '#333', fontWeight: '600' },
  confirmBtn: { backgroundColor: '#DC3545' },
  confirmBtnText: { color: '#fff', fontWeight: 'bold' },
});
