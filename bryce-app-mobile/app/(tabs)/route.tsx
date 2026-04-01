import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, BorderRadius, Spacing } from '../../constants/colors';
import { useJobsStore, type Job } from '../../stores/jobs.store';
import JobCard from '../../components/JobCard';

function isToday(dateStr: string): boolean {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return dateStr === today;
}

function todayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function formatDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
  return `${Math.round(miles)} mi`;
}

export default function RouteScreen() {
  const { jobs, selectedDate, loading, error, optimizedRoute, setSelectedDate, fetchJobs } = useJobsStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [selectedDate]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  }, [fetchJobs]);

  const handleJobPress = useCallback((job: Job) => {
    router.push(`/job/${job.id}`);
  }, []);

  const handlePrevDay = useCallback(() => {
    setSelectedDate(addDays(selectedDate, -1));
  }, [selectedDate, setSelectedDate]);

  const handleNextDay = useCallback(() => {
    setSelectedDate(addDays(selectedDate, 1));
  }, [selectedDate, setSelectedDate]);

  const handleToday = useCallback(() => {
    setSelectedDate(todayString());
  }, [setSelectedDate]);

  const dateLabel = formatDateLabel(selectedDate);
  const showTodayButton = !isToday(selectedDate);

  const renderHeader = () => (
    <View>
      {/* Day picker */}
      <View style={styles.dayPicker}>
        <TouchableOpacity onPress={handlePrevDay} style={styles.dayButton} activeOpacity={0.6}>
          <Ionicons name="chevron-back" size={22} color={Colors.blue} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dayCenter}
          onPress={showTodayButton ? handleToday : undefined}
          activeOpacity={showTodayButton ? 0.6 : 1}
        >
          <Text style={styles.dayLabel}>{dateLabel}</Text>
          {showTodayButton && (
            <Text style={styles.todayLink}>Go to today</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextDay} style={styles.dayButton} activeOpacity={0.6}>
          <Ionicons name="chevron-forward" size={22} color={Colors.blue} />
        </TouchableOpacity>
      </View>

      {/* Job count + route summary */}
      <View style={styles.summaryRow}>
        <View>
          <Text style={styles.summaryDate}>{dateLabel}</Text>
          <Text style={styles.summaryCount}>
            {jobs.length} job{jobs.length !== 1 ? 's' : ''}
            {isToday(selectedDate) ? ' today' : ''}
          </Text>
        </View>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton} activeOpacity={0.6}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Route summary bar */}
      {optimizedRoute && optimizedRoute.totalDriveTime > 0 && (
        <View style={styles.routeSummary}>
          <Ionicons name="map-outline" size={16} color={Colors.blue} />
          <Text style={styles.routeSummaryText}>
            {jobs.length} stop{jobs.length !== 1 ? 's' : ''}
            {' -- '}
            {formatDriveTime(optimizedRoute.totalDriveTime)} total drive
            {optimizedRoute.totalDistance > 0 ? ` -- ${formatDistance(optimizedRoute.totalDistance)}` : ''}
          </Text>
        </View>
      )}
    </View>
  );

  const renderEmpty = () => {
    if (loading) return null;
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Could not load jobs</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRefresh} activeOpacity={0.7}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="clipboard-outline" size={48} color={Colors.textLight} />
        <Text style={styles.emptyTitle}>
          No jobs scheduled {isToday(selectedDate) ? 'today' : 'this day'}
        </Text>
        <Text style={styles.emptySubtitle}>
          Pull down to refresh, or check another day.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pool Ops</Text>
        <Text style={styles.headerSubtitle}>Daily Route</Text>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.cardWrapper}>
            <JobCard
              job={item}
              stopNumber={index + 1}
              driveTime={optimizedRoute?.optimizedOrder?.[index]?.driveTimeFromPrev}
              driveDistance={optimizedRoute?.optimizedOrder?.[index]?.driveDistanceFromPrev}
              onPress={handleJobPress}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.blue} />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingTop: Platform.OS === 'android' ? 40 : Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  dayPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  dayButton: {
    padding: Spacing.sm,
  },
  dayCenter: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  todayLink: {
    fontSize: FontSize.xs,
    color: Colors.blue,
    fontWeight: '600',
    marginTop: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  summaryDate: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  summaryCount: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.text,
  },
  refreshButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  refreshText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.blue,
  },
  routeSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.blueLight,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  routeSummaryText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: '#1e40af',
  },
  cardWrapper: {
    marginBottom: Spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  emptySubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: Colors.redLight,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  errorTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.red,
    marginBottom: Spacing.xs,
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.red,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: Colors.red,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  retryText: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});
