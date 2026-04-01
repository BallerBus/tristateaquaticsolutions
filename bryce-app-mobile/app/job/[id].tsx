import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, BorderRadius, Spacing } from '../../constants/colors';
import { useJobsStore } from '../../stores/jobs.store';
import JobPhaseFlow from '../../components/JobPhaseFlow';

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

function openMaps(address: string) {
  const encoded = encodeURIComponent(address);
  Linking.openURL(`maps://maps.apple.com/?daddr=${encoded}&dirflg=d`);
}

function callPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  Linking.openURL(`tel:${cleaned}`);
}

function textPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  Linking.openURL(`sms:${cleaned}`);
}

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { jobs, loadJobState } = useJobsStore();

  const job = jobs.find((j) => j.id === id);

  useEffect(() => {
    if (id) {
      loadJobState(id);
    }
  }, [id, loadJobState]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleInvoice = useCallback(() => {
    router.push('/(tabs)/payments');
  }, []);

  const handleNextJob = useCallback(() => {
    router.back();
  }, []);

  if (!job) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.blue} />
          <Text style={styles.loadingText}>Loading job...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isPCD = job.brand === 'pcd';
  const brandColor = isPCD ? Colors.pcdPrimary : Colors.tsasPrimary;
  const brandBg = isPCD ? Colors.pcdLight : Colors.tsasLight;
  const timeRange = [formatTime(job.startTime), formatTime(job.endTime)]
    .filter(Boolean)
    .join(' - ');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.6}>
          <Ionicons name="chevron-back" size={22} color={Colors.blue} />
          <Text style={styles.backText}>Back to Jobs</Text>
        </TouchableOpacity>

        {/* Job header card */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              {timeRange ? (
                <Text style={styles.timeRange}>{timeRange}</Text>
              ) : null}
              <Text style={styles.customerName}>{job.contactName}</Text>
              <Text style={styles.jobType}>{job.jobType}</Text>
            </View>
            <View style={[styles.brandBadge, { backgroundColor: brandBg }]}>
              <Text style={[styles.brandText, { color: brandColor }]}>{job.brandLabel}</Text>
            </View>
          </View>
        </View>

        {/* Contact info */}
        <View style={styles.contactCard}>
          {job.contactPhone ? (
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => callPhone(job.contactPhone)}
              activeOpacity={0.6}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{job.contactPhone}</Text>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity
                  style={[styles.actionCircle, { backgroundColor: Colors.greenLight }]}
                  onPress={() => callPhone(job.contactPhone)}
                >
                  <Ionicons name="call" size={18} color={Colors.green} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionCircle, { backgroundColor: Colors.blueLight }]}
                  onPress={() => textPhone(job.contactPhone)}
                >
                  <Ionicons name="chatbubble" size={16} color={Colors.blue} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : null}

          {job.contactEmail ? (
            <>
              <View style={styles.contactDivider} />
              <View style={styles.contactRow}>
                <View>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>{job.contactEmail}</Text>
                </View>
              </View>
            </>
          ) : null}

          {job.address ? (
            <>
              <View style={styles.contactDivider} />
              <TouchableOpacity
                style={styles.contactRow}
                onPress={() => openMaps(job.address)}
                activeOpacity={0.6}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactLabel}>Address</Text>
                  <Text style={styles.contactValue}>{job.address}</Text>
                </View>
                <View style={[styles.actionCircle, { backgroundColor: Colors.blueLight }]}>
                  <Ionicons name="navigate" size={18} color={Colors.blue} />
                </View>
              </TouchableOpacity>
            </>
          ) : null}
        </View>

        {/* Navigation button */}
        {job.address ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => openMaps(job.address)}
            activeOpacity={0.7}
          >
            <Ionicons name="navigate" size={24} color="#fff" />
            <Text style={styles.navButtonText}>Start Navigation</Text>
          </TouchableOpacity>
        ) : null}

        {/* Job documentation flow */}
        <JobPhaseFlow
          job={job}
          onInvoice={handleInvoice}
          onNextJob={handleNextJob}
        />

        <View style={{ height: 40 }} />
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
    paddingTop: Platform.OS === 'android' ? 40 : Spacing.sm,
    paddingBottom: 40,
    gap: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: -Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  backText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.blue,
  },
  headerCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timeRange: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.blue,
  },
  customerName: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 4,
  },
  jobType: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  brandBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  brandText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  contactCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  contactLabel: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  contactValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 1,
  },
  contactActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: Spacing.lg,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  navButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
});
