import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '../constants/colors';
import { formatElapsed } from '../lib/job-state';

interface TimerDisplayProps {
  isRunning: boolean;
  startTimestamp: string | null;
  size?: 'small' | 'large';
  onElapsedChange?: (seconds: number) => void;
}

export function useJobTimer(isRunning: boolean, startTimestamp: string | null): number {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (startTimestamp) {
      const savedStart = new Date(startTimestamp).getTime();
      if (!isNaN(savedStart)) {
        startRef.current = savedStart;
      }
    }

    if (!startRef.current) {
      startRef.current = Date.now() - elapsed * 1000;
    }

    setElapsed(Math.floor((Date.now() - startRef.current!) / 1000));

    intervalRef.current = setInterval(() => {
      if (startRef.current) {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, startTimestamp]);

  return elapsed;
}

export default function TimerDisplay({ isRunning, startTimestamp, size = 'large', onElapsedChange }: TimerDisplayProps) {
  const elapsed = useJobTimer(isRunning, startTimestamp);

  useEffect(() => {
    if (onElapsedChange) {
      onElapsedChange(elapsed);
    }
  }, [elapsed, onElapsedChange]);

  const formatted = formatElapsed(elapsed);

  if (size === 'small') {
    return (
      <View style={styles.smallContainer}>
        <View style={[styles.dot, isRunning ? styles.dotActive : styles.dotInactive]} />
        <Text style={styles.smallText}>{formatted}</Text>
      </View>
    );
  }

  return (
    <View style={styles.largeContainer}>
      <View style={[styles.dotLarge, isRunning ? styles.dotActive : styles.dotInactive]} />
      <Text style={styles.largeText}>{formatted}</Text>
      <Text style={styles.label}>
        {isRunning ? 'Timer running' : 'Timer stopped'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  smallText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  largeContainer: {
    alignItems: 'center',
  },
  largeText: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.text,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotLarge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  dotActive: {
    backgroundColor: Colors.green,
  },
  dotInactive: {
    backgroundColor: Colors.textTertiary,
  },
});
