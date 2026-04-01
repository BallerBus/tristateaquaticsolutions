import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../stores/auth.store';
import { useBrandStore } from '../stores/brand.store';
import { Colors } from '../constants/colors';

export default function Index() {
  const { isUnlocked, isChecking } = useAuthStore();
  const { activeBrand, isLoaded } = useBrandStore();

  if (isChecking || !isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.tsasPrimary} />
      </View>
    );
  }

  // Not unlocked or no brand selected -- go to PIN screen
  // (PIN screen handles brand selection after PIN entry)
  if (!isUnlocked || !activeBrand) {
    return <Redirect href="/(auth)/pin" />;
  }

  return <Redirect href="/(tabs)/route" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});
