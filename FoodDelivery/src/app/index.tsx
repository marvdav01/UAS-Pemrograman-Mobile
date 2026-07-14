import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const FOOD_DATA = [
  {
    id: '1',
    name: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, ayam, dan udang.',
    price: 'Rp 25.000',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Mie Ayam Bakso',
    description: 'Mie ayam pangsit dengan tambahan bakso sapi.',
    price: 'Rp 20.000',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'Sate Ayam Madura',
    description: '10 Tusuk sate ayam dengan bumbu kacang khas.',
    price: 'Rp 30.000',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    name: 'Rendang Daging Sapi',
    description: 'Olahan daging sapi dengan rempah asli Minang yang kaya rasa.',
    price: 'Rp 35.000',
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '5',
    name: 'Gado-Gado Spesial',
    description: 'Sayuran rebus segar dengan saus kacang legit dan telur rebus.',
    price: 'Rp 18.000',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '6',
    name: 'Ayam Penyet Sambal Ijo',
    description: 'Ayam goreng geprek dengan sambal ijo pedas nampol.',
    price: 'Rp 22.000',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '7',
    name: 'Soto Ayam Lamongan',
    description: 'Kuah kuning segar dengan koya gurih dan suwiran ayam.',
    price: 'Rp 15.000',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '8',
    name: 'Martabak Telur Spesial',
    description: 'Martabak gurih dengan isian daging sapi cincang dan daun bawang.',
    price: 'Rp 40.000',
    image: 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '9',
    name: 'Nasi Padang Komplit',
    description: 'Nasi putih dengan lauk ayam pop, sayur nangka, dan sambal ijo.',
    price: 'Rp 28.000',
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '10',
    name: 'Bakso Urat Jumbo',
    description: 'Bakso sapi urat ukuran besar dengan kuah kaldu sapi yang gurih.',
    price: 'Rp 20.000',
    image: 'https://images.unsplash.com/photo-1596450514735-111a2fe02935?auto=format&fit=crop&w=200&q=80',
  },
];

export default function CatalogScreen() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOrder = () => {
    if (!token) {
      router.push('/login');
    } else {
      router.push('/detail');
    }
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    // Redirect otomatis ke halaman login setelah logout
    router.replace('/login');
  };

  const renderItem = ({ item, index }: { item: typeof FOOD_DATA[0]; index: number }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {/* flex: 1 memastikan info container mengisi sisa ruang baris (Flexbox row) */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{index + 1}. {item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>
            {token ? '🛒 Pesan' : '🔒 Pesan (Login dulu)'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Daftar Menu</Text>
          {token && (
            <Text style={styles.headerSubtitle}>👤 Login sebagai: admin</Text>
          )}
        </View>
        {token ? (
          <TouchableOpacity
            onPress={() => setShowLogoutModal(true)}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => router.push('/login')}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Banner jika belum login */}
      {!token && (
        <TouchableOpacity style={styles.banner} onPress={() => router.push('/login')}>
          <Text style={styles.bannerText}>
            🔒 Login untuk mengakses Detail Pesanan → Tap di sini
          </Text>
        </TouchableOpacity>
      )}

      {/* Food list */}
      <FlatList
        data={FOOD_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#28A745',
    marginTop: 2,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  banner: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFB800',
    borderWidth: 1,
    margin: 12,
    borderRadius: 8,
    padding: 10,
  },
  bannerText: {
    color: '#856404',
    fontSize: 13,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  // === FLEXBOX: flexDirection:'row' agar gambar & info tersusun horizontal (responsif) ===
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 110,
    height: '100%',
    minHeight: 130,
  },
  // flex:1 mengisi sisa ruang horizontal secara proporsional
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1A1A2E',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 10,
  },
  orderButton: {
    backgroundColor: '#FF8C00',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  // Modal styles
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1A1A2E',
    textAlign: 'center',
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
  cancelBtn: {
    backgroundColor: '#F0F0F0',
  },
  cancelBtnText: {
    color: '#333',
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#DC3545',
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
