import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMsg('');
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username dan password harus diisi.');
      return;
    }

    setLoading(true);

    // Simulasi delay seperti network request
    await new Promise((r) => setTimeout(r, 600));

    // Mock API authentication
    if (username.trim() === 'admin' && password === 'admin') {
      const mockJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIwOTUwMDAwfQ.' +
        'mockSignature';
      await login(mockJwt);
      setLoading(false);
      router.replace('/');
    } else {
      setLoading(false);
      setErrorMsg('Username atau password salah. (Gunakan: admin / admin)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Logo / Icon */}
        <Text style={styles.logo}>🍽️</Text>
        <Text style={styles.title}>Masuk ke Akun</Text>
        <Text style={styles.subtitle}>Food Delivery App</Text>

        {/* Error Banner */}
        {errorMsg ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
          </View>
        ) : null}

        {/* Hint box */}
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>💡 Gunakan: <Text style={styles.hintBold}>admin / admin</Text></Text>
        </View>

        {/* Username */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(v) => { setUsername(v); setErrorMsg(''); }}
            placeholder="Masukkan username"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(v) => { setPassword(v); setErrorMsg(''); }}
            placeholder="Masukkan password"
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Login button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Back to catalog */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
          <Text style={styles.backText}>← Kembali ke Katalog</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  logo: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#1A1A2E',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FF4D4D',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  errorText: {
    color: '#CC0000',
    fontSize: 13,
    textAlign: 'center',
  },
  hintBox: {
    backgroundColor: '#FFF8E7',
    borderColor: '#FFB800',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  hintText: {
    color: '#7A5A00',
    fontSize: 13,
    textAlign: 'center',
  },
  hintBold: {
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    color: '#111',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonDisabled: {
    backgroundColor: '#99C2FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  backText: {
    color: '#007BFF',
    fontSize: 14,
  },
});
