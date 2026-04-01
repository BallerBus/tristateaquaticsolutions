import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, BorderRadius, Spacing } from '../../constants/colors';
import { useAuthStore } from '../../stores/auth.store';
import { useBrandStore } from '../../stores/brand.store';
import { API_BASE } from '../../lib/api';

export default function SettingsScreen() {
  const { lock } = useAuthStore();
  const { activeBrand, clearBrand } = useBrandStore();

  function handleLock() {
    Alert.alert(
      'Lock App',
      'You will need to enter your PIN again to access the app.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Lock',
          style: 'destructive',
          onPress: async () => {
            await lock();
            router.replace('/(auth)/pin');
          },
        },
      ],
    );
  }

  function handleSwitchBrand() {
    Alert.alert(
      'Switch Brand',
      'You will be taken back to the brand selection screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Switch',
          onPress: async () => {
            await clearBrand();
            router.replace('/(auth)/pin');
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>

        {/* Active Brand */}
        {activeBrand && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Brand</Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Brand</Text>
              <View style={styles.brandBadgeRow}>
                <View style={[styles.brandDot, { backgroundColor: activeBrand.colors.accent }]} />
                <Text style={styles.rowValue}>{activeBrand.name}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Phone</Text>
              <Text style={styles.rowValue}>{activeBrand.phone}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>GHL Location</Text>
              <Text style={[styles.rowValue, styles.rowValueSmall]} numberOfLines={1}>
                {activeBrand.ghlLocationId}
              </Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.row} onPress={handleSwitchBrand} activeOpacity={0.6}>
              <Text style={[styles.rowLabel, { color: Colors.blue }]}>Switch Brand</Text>
              <Ionicons name="swap-horizontal" size={18} color={Colors.blue} />
            </TouchableOpacity>
          </View>
        )}

        {/* Technician Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Technician</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Name</Text>
            <Text style={styles.rowValue}>Bryce</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Role</Text>
            <Text style={styles.rowValue}>Field Operations</Text>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>App</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>API</Text>
            <Text style={[styles.rowValue, styles.rowValueSmall]} numberOfLines={1}>{API_BASE}</Text>
          </View>
        </View>

        {/* Route Settings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Route</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Start Location</Text>
            <Text style={styles.rowValue}>Home</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>End Location</Text>
            <Text style={styles.rowValue}>Home</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Optimization</Text>
            <Text style={[styles.rowValue, { color: Colors.green }]}>Active</Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Support</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Call Brandon</Text>
            <TouchableOpacity>
              <Text style={[styles.rowValue, { color: Colors.blue }]}>610-870-3113</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lock button */}
        <TouchableOpacity style={styles.lockButton} onPress={handleLock} activeOpacity={0.7}>
          <Ionicons name="lock-closed-outline" size={20} color={Colors.red} />
          <Text style={styles.lockButtonText}>Lock App</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          {activeBrand?.name || 'Pool Ops'}{'\n'}
          Internal Field Operations Tool
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'android' ? 40 : Spacing.lg,
    paddingBottom: 40,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xxl,
  },
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  rowLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  rowValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  rowValueSmall: {
    fontSize: FontSize.xs,
    maxWidth: 200,
  },
  brandBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: Spacing.lg,
  },
  lockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.redLight,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    marginTop: Spacing.md,
  },
  lockButtonText: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.red,
  },
  footer: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: Spacing.xxl,
    lineHeight: 18,
  },
});
