import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../stores/auth.store';
import { useBrandStore } from '../stores/brand.store';

export default function RootLayout() {
  const { checkAuth } = useAuthStore();
  const { loadBrand } = useBrandStore();

  useEffect(() => {
    checkAuth();
    loadBrand();
  }, [checkAuth, loadBrand]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f9fafb' },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}
