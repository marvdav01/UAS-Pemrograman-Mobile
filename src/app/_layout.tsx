import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme, View, Text } from 'react-native';

import { AuthProvider, useAuth } from '@/context/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const protectedRoutes = ['detail', 'kamera', 'peta'];
    const isAccessingProtectedRoute = protectedRoutes.includes(segments[0] as string);

    if (!token && isAccessingProtectedRoute) {
      router.replace('/login');
    }
  }, [token, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Memuat...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Katalog Makanan', headerStyle: { backgroundColor: '#FF8C00' }, headerTintColor: '#fff' }} />
      <Stack.Screen name="login" options={{ title: 'Login', presentation: 'modal' }} />
      <Stack.Screen name="detail" options={{ title: 'Detail Pesanan' }} />
      <Stack.Screen name="kamera" options={{ title: 'Bukti Pesanan' }} />
      <Stack.Screen name="peta" options={{ title: 'Lokasi Restoran' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
