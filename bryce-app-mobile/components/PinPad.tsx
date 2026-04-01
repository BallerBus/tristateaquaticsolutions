import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, FontSize, BorderRadius, Spacing } from '../constants/colors';

interface PinPadProps {
  onSubmit: (pin: string) => Promise<boolean>;
  error?: string;
}

const PIN_LENGTH = 4;

export default function PinPad({ onSubmit, error }: PinPadProps) {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [shakeAnim] = useState(new Animated.Value(0));

  const shake = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [shakeAnim]);

  const handlePress = useCallback(async (digit: string) => {
    if (loading) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === PIN_LENGTH) {
      setLoading(true);
      const success = await onSubmit(newPin);
      if (!success) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        shake();
        setPin('');
      }
      setLoading(false);
    }
  }, [pin, loading, onSubmit, shake]);

  const handleDelete = useCallback(async () => {
    if (loading || pin.length === 0) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPin(pin.slice(0, -1));
  }, [pin, loading]);

  const dots = Array.from({ length: PIN_LENGTH }, (_, i) => (
    <View
      key={i}
      style={[
        styles.dot,
        i < pin.length ? styles.dotFilled : styles.dotEmpty,
      ]}
    />
  ));

  const digits = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'del'],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pool Ops</Text>
        <Text style={styles.subtitle}>Enter PIN to unlock</Text>
      </View>

      <Animated.View style={[styles.dotsRow, { transform: [{ translateX: shakeAnim }] }]}>
        {dots}
      </Animated.View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      {loading ? (
        <ActivityIndicator size="small" color={Colors.blue} style={styles.loader} />
      ) : null}

      <View style={styles.padContainer}>
        {digits.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.padRow}>
            {row.map((digit, colIdx) => {
              if (digit === '') {
                return <View key={colIdx} style={styles.padKey} />;
              }
              if (digit === 'del') {
                return (
                  <TouchableOpacity
                    key={colIdx}
                    style={styles.padKey}
                    onPress={handleDelete}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.padKeyTextSmall}>Delete</Text>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  key={colIdx}
                  style={[styles.padKey, styles.padKeyDigit]}
                  onPress={() => handlePress(digit)}
                  activeOpacity={0.6}
                >
                  <Text style={styles.padKeyText}>{digit}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <Text style={styles.footer}>Ask Brandon if you need the code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: '#1e3a5f',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  dotEmpty: {
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  dotFilled: {
    backgroundColor: Colors.blue,
  },
  error: {
    color: Colors.red,
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: 12,
  },
  loader: {
    marginBottom: 12,
  },
  padContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 12,
    marginTop: 20,
  },
  padRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  padKey: {
    width: 80,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.lg,
  },
  padKeyDigit: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  padKeyText: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.text,
  },
  padKeyTextSmall: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  footer: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 32,
  },
});
