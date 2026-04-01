import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, BorderRadius, Spacing } from '../constants/colors';
import type { Job } from '../stores/jobs.store';

interface JobCardProps {
  job: Job;
  stopNumber: number;
  driveTime?: number;
  driveDistance?: number;
  onPress: (job: Job) => void;
}

function formatTime(isoString: string): string {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
}

function formatDriveTime(seconds: number): string {
  if (!seconds || seconds <= 0) return '';
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  if (remainMins === 0) return `${hrs}h`;
  return `${hrs}h ${remainMins}m`;
}

function formatDistance(meters: number): string {
  if (!meters || meters <= 0) return '';
  const miles = meters / 1609.34;
  if (miles < 1) return `${(Math.round(miles * 10) / 10).toFixed(1)} mi`;
  return `${Math.round(miles)} mi`;
}

function openMaps(address: string) {
  const encoded = encodeURIComponent(address);
  Linking.openURL(`maps://maps.apple.com/?daddr=${encoded}&dirflg=d`);
}

export default function JobCard({ job, stopNumber, driveTime, driveDistance, onPress }: JobCardProps) {
  const isPCD = job.brand === 'pcd';
  const brandColor = isPCD ? Colors.pcdPrimary : Colors.tsasPrimary;
  const brandBg = isPCD ? Colors.pcdLight : Colors.tsasLight;
  const timeStr = formatTime(job.startTime);

  return (
    <View>
      {/* Drive time indicator */}
      {driveTime && driveTime > 0 && stopNumber > 1 ? (
        <View style={styles.driveTimeRow}>
          <View style={styles.driveLine} />
          <Ionicons name="car-outline" size={14} color={Colors.blue} />
          <Text style={styles.driveTimeText}>
            {formatDriveTime(driveTime)}
            {driveDistance && driveDistance > 0 ? ` (${formatDistance(driveDistance)})` : ''}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(job)}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          {/* Stop number badge */}
          <View style={styles.stopBadge}>
            <Text style={styles.stopNumber}>{stopNumber}</Text>
          </View>

          {/* Job info */}
          <View style={styles.jobInfo}>
            {timeStr ? (
              <Text style={styles.timeText}>{timeStr}</Text>
            ) : null}
            <Text style={styles.nameText} numberOfLines={1}>{job.contactName}</Text>
            <Text style={styles.typeText} numberOfLines={1}>{job.jobType}</Text>
            {job.address ? (
              <Text style={styles.addressText} numberOfLines={1}>{job.address}</Text>
            ) : (
              <Text style={styles.noAddressText}>No address</Text>
            )}
          </View>

          {/* Brand badge + chevron */}
          <View style={styles.rightCol}>
            <View style={[styles.brandBadge, { backgroundColor: brandBg }]}>
              <Text style={[styles.brandText, { color: brandColor }]}>{job.brandLabel}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </View>
        </View>

        {/* Navigate button */}
        {job.address ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => openMaps(job.address)}
            activeOpacity={0.7}
          >
            <Ionicons name="navigate-outline" size={16} color={Colors.blue} />
            <Text style={styles.navText}>Navigate</Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  stopBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stopNumber: {
    color: '#fff',
    fontSize: FontSize.xs,
    fontWeight: '800',
  },
  jobInfo: {
    flex: 1,
  },
  timeText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.blue,
    marginBottom: 2,
  },
  nameText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  typeText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  addressText: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  noAddressText: {
    fontSize: FontSize.xs,
    color: Colors.amber,
    fontWeight: '500',
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  brandBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  brandText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  navText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.blue,
  },
  driveTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  driveLine: {
    width: 2,
    height: 16,
    backgroundColor: Colors.blueLight,
    marginLeft: 12,
  },
  driveTimeText: {
    fontSize: FontSize.xs,
    fontWeight: '500',
    color: Colors.blue,
  },
});
