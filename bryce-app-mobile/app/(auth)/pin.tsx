import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import PinPad from '../../components/PinPad';
import { useAuthStore } from '../../stores/auth.store';
import { useBrandStore } from '../../stores/brand.store';
import { getBrandList, type BrandId } from '../../lib/brands';
import { Colors, FontSize, BorderRadius, Spacing } from '../../constants/colors';

type Screen = 'pin' | 'brand';

export default function PinScreen() {
  const { unlock, error } = useAuthStore();
  const { setBrand } = useBrandStore();
  const [screen, setScreen] = useState<Screen>('pin');

  async function handlePinSubmit(pin: string): Promise<boolean> {
    const success = await unlock(pin);
    if (success) {
      setScreen('brand');
      return true;
    }
    return false;
  }

  async function handleBrandSelect(brandId: BrandId) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await setBrand(brandId);
    router.replace('/(tabs)/route');
  }

  if (screen === 'brand') {
    const brands = getBrandList();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>Select Brand</Text>
          <Text style={styles.brandSubtitle}>Which brand are you working under today?</Text>

          <View style={styles.brandGrid}>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                style={[
                  styles.brandCard,
                  { borderColor: brand.colors.accent },
                ]}
                onPress={() => handleBrandSelect(brand.id as BrandId)}
                activeOpacity={0.7}
              >
                <View style={[styles.brandDot, { backgroundColor: brand.colors.accent }]} />
                <Text style={styles.brandName}>{brand.name}</Text>
                <Text style={styles.brandPhone}>{brand.phone}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PinPad onSubmit={handlePinSubmit} error={error} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  brandTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  brandSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxxl,
  },
  brandGrid: {
    gap: Spacing.lg,
  },
  brandCard: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: Spacing.sm,
  },
  brandName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  brandPhone: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
