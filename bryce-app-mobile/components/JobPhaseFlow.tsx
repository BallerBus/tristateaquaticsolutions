import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Linking, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, FontSize, BorderRadius, Spacing } from '../constants/colors';
import { useJobsStore, type Job } from '../stores/jobs.store';
import { useJobTimer } from './TimerDisplay';
import TimerDisplay from './TimerDisplay';
import PhotoCapture from './PhotoCapture';
import ChemicalForm from './ChemicalForm';
import { formatElapsedReadable } from '../lib/job-state';
import { formatDistance } from '../lib/gps-verification';
import type { JobPhase, CapturedPhoto, ChemicalReading } from '../lib/job-state';

interface JobPhaseFlowProps {
  job: Job;
  onInvoice: () => void;
  onNextJob: () => void;
}

export default function JobPhaseFlow({ job, onInvoice, onNextJob }: JobPhaseFlowProps) {
  const {
    jobPhases,
    jobTimerStarts,
    jobPhotos,
    jobChemicals,
    jobNotes,
    jobElapsed,
    jobGpsStart,
    jobGpsEnd,
    arrivalTextSent,
    setJobPhase,
    startTimer,
    addPhoto,
    setChemicals,
    setNotes,
    completeJob,
    saveJobState,
    captureStartGps,
    captureEndGps,
    sendArrivalText,
  } = useJobsStore();

  const phase = jobPhases[job.id] || 'IDLE';
  const timerStartedAt = jobTimerStarts[job.id] || null;
  const photos = jobPhotos[job.id] || [];
  const chemicals = jobChemicals[job.id];
  const notes = jobNotes[job.id] || '';
  const finalElapsed = jobElapsed[job.id] || 0;
  const gpsStart = jobGpsStart[job.id] || null;
  const gpsEnd = jobGpsEnd[job.id] || null;

  const beforePhotos = photos.filter((p) => p.phase === 'before');
  const afterPhotos = photos.filter((p) => p.phase === 'after');

  const timerRunning = phase !== 'IDLE' && phase !== 'COMPLETED' && phase !== 'HEALTH_CHECK';
  const elapsed = useJobTimer(timerRunning, timerStartedAt);

  const [showChemicals, setShowChemicals] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpacity] = useState(new Animated.Value(0));

  // Toast animation -- show for 3 seconds then fade out
  useEffect(() => {
    if (toastMessage) {
      Animated.sequence([
        Animated.timing(toastOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.delay(2500),
        Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => setToastMessage(''));
    }
  }, [toastMessage, toastOpacity]);

  const handlePhaseChange = useCallback(async (newPhase: JobPhase) => {
    setJobPhase(job.id, newPhase);
    if (newPhase === 'BEFORE_PHOTOS' || newPhase === 'IN_PROGRESS') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    saveJobState(job.id);
  }, [job.id, setJobPhase, saveJobState]);

  const handleArrived = useCallback(async () => {
    startTimer(job.id);

    // Capture GPS verification at start (transition to BEFORE_PHOTOS)
    const gpsResult = await captureStartGps(job.id, job.address);
    if (gpsResult && !gpsResult.verified && gpsResult.distanceFromJob >= 0) {
      Alert.alert(
        'Location Warning',
        `You appear to be ${formatDistance(gpsResult.distanceFromJob)} from the job address. This visit has been flagged for review, but you can continue working.`,
        [{ text: 'Continue', style: 'default' }],
      );
    }

    handlePhaseChange('BEFORE_PHOTOS');
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Auto-text customer on arrival (fire-and-forget, don't block the UI)
    sendArrivalText(job.id).then((result) => {
      if (result.sent) {
        setToastMessage(`Arrival text sent to ${job.contactName.split(' ')[0]}`);
      } else if (result.error && result.error !== 'Already sent') {
        // Only show error for real failures, not "already sent"
        console.warn('Arrival text not sent:', result.error);
      }
    });
  }, [job.id, job.address, job.contactName, startTimer, captureStartGps, handlePhaseChange, sendArrivalText]);

  const handlePhotoCaptured = useCallback((photo: CapturedPhoto) => {
    addPhoto(job.id, photo);
  }, [job.id, addPhoto]);

  const handleComplete = useCallback(async () => {
    // Capture GPS verification at completion
    const gpsResult = await captureEndGps(job.id, job.address);
    if (gpsResult && !gpsResult.verified && gpsResult.distanceFromJob >= 0) {
      Alert.alert(
        'Location Warning',
        `You appear to be ${formatDistance(gpsResult.distanceFromJob)} from the job address at completion. This has been flagged for review.`,
        [{ text: 'OK', style: 'default' }],
      );
    }

    completeJob(job.id, elapsed);
    saveJobState(job.id);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [job.id, job.address, elapsed, captureEndGps, completeJob, saveJobState]);

  const handleChemicalSave = useCallback((reading: ChemicalReading) => {
    setChemicals(job.id, reading);
    setShowChemicals(false);
  }, [job.id, setChemicals]);

  const handleNotesBlur = useCallback(() => {
    if (localNotes !== notes) {
      setNotes(job.id, localNotes);
    }
  }, [job.id, localNotes, notes, setNotes]);

  // ===== Toast overlay =====
  const ToastOverlay = toastMessage ? (
    <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
      <Ionicons name="chatbubble-ellipses" size={16} color="#fff" />
      <Text style={styles.toastText}>{toastMessage}</Text>
    </Animated.View>
  ) : null;

  // ===== IDLE State =====
  if (phase === 'IDLE') {
    return (
      <View style={styles.phaseContainer}>
        {ToastOverlay}
        <TouchableOpacity
          style={styles.arrivedButton}
          onPress={handleArrived}
          activeOpacity={0.7}
        >
          <Ionicons name="location" size={28} color="#fff" />
          <Text style={styles.arrivedButtonText}>I'm Here - Start Job</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.invoiceButton}
          onPress={onInvoice}
          activeOpacity={0.7}
        >
          <Ionicons name="cash-outline" size={22} color="#fff" />
          <Text style={styles.invoiceButtonText}>Invoice</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ===== BEFORE_PHOTOS State =====
  if (phase === 'BEFORE_PHOTOS') {
    return (
      <View style={styles.phaseContainer}>
        {ToastOverlay}
        <View style={styles.phaseHeader}>
          <View style={[styles.phaseBadge, { backgroundColor: Colors.blueLight }]}>
            <Text style={[styles.phaseBadgeText, { color: Colors.blue }]}>BEFORE PHOTOS</Text>
          </View>
          <TimerDisplay isRunning={true} startTimestamp={timerStartedAt} size="small" />
        </View>

        {/* GPS verification status */}
        {gpsStart && (
          <GpsStatusBanner verified={gpsStart.verified} distance={gpsStart.distanceFromJob} />
        )}

        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>Take photos of the pool before you start work.</Text>
          <Text style={styles.instructionSub}>Minimum 1 photo required.</Text>
        </View>

        <PhotoCapture
          phase="before"
          photos={photos}
          onPhotoCaptured={handlePhotoCaptured}
          currentJobPhase={phase}
          jobId={job.id}
          customerId={job.contactId}
          jobAddress={job.address}
        />

        <TouchableOpacity
          style={[styles.nextButton, beforePhotos.length < 1 && styles.nextButtonDisabled]}
          onPress={() => handlePhaseChange('IN_PROGRESS')}
          disabled={beforePhotos.length < 1}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-forward" size={22} color="#fff" />
          <Text style={styles.nextButtonText}>Start Work</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ===== IN_PROGRESS State =====
  if (phase === 'IN_PROGRESS') {
    return (
      <ScrollView style={styles.phaseContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.phaseBadge, { backgroundColor: Colors.amberLight, alignSelf: 'center' }]}>
          <Text style={[styles.phaseBadgeText, { color: Colors.amber }]}>WORK IN PROGRESS</Text>
        </View>

        <View style={styles.timerCard}>
          <TimerDisplay isRunning={true} startTimestamp={timerStartedAt} size="large" />
        </View>

        {/* Job summary */}
        <View style={styles.infoCard}>
          <Text style={styles.infoName}>{job.contactName}</Text>
          <Text style={styles.infoType}>{job.jobType}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.green} />
            <Text style={styles.infoCheck}>
              {beforePhotos.length} before photo{beforePhotos.length !== 1 ? 's' : ''}
            </Text>
          </View>
          {gpsStart?.verified && (
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} color={Colors.blue} />
              <Text style={styles.infoCheck}>GPS verified on arrival</Text>
            </View>
          )}
        </View>

        {/* Chemical readings toggle */}
        {showChemicals ? (
          <ChemicalForm
            initialValues={chemicals}
            onSave={handleChemicalSave}
            onSkip={() => setShowChemicals(false)}
          />
        ) : (
          <TouchableOpacity
            style={styles.chemButton}
            onPress={() => setShowChemicals(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="flask-outline" size={20} color={Colors.blue} />
            <Text style={styles.chemButtonText}>
              {chemicals ? 'Edit Chemical Readings' : 'Log Chemical Readings'}
            </Text>
            {chemicals && (
              <Ionicons name="checkmark-circle" size={16} color={Colors.green} />
            )}
          </TouchableOpacity>
        )}

        {/* Notes */}
        <View style={styles.notesCard}>
          <Text style={styles.notesLabel}>Service Notes</Text>
          <TextInput
            style={styles.notesInput}
            value={localNotes}
            onChangeText={setLocalNotes}
            onBlur={handleNotesBlur}
            placeholder="e.g., Filter pressure rising, may need sand change..."
            placeholderTextColor={Colors.textTertiary}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* After photos button */}
        <TouchableOpacity
          style={styles.afterPhotosButton}
          onPress={() => handlePhaseChange('AFTER_PHOTOS')}
          activeOpacity={0.7}
        >
          <Ionicons name="camera" size={24} color="#fff" />
          <Text style={styles.afterPhotosText}>Take After Photos</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    );
  }

  // ===== AFTER_PHOTOS State =====
  if (phase === 'AFTER_PHOTOS') {
    return (
      <View style={styles.phaseContainer}>
        <View style={styles.phaseHeader}>
          <View style={[styles.phaseBadge, { backgroundColor: '#f5f3ff' }]}>
            <Text style={[styles.phaseBadgeText, { color: Colors.purple }]}>AFTER PHOTOS</Text>
          </View>
          <TimerDisplay isRunning={true} startTimestamp={timerStartedAt} size="small" />
        </View>

        <View style={[styles.instructionBox, { backgroundColor: '#f5f3ff', borderColor: '#ddd6fe' }]}>
          <Text style={[styles.instructionTitle, { color: '#5b21b6' }]}>Document the completed work.</Text>
          <Text style={[styles.instructionSub, { color: '#7c3aed' }]}>Try to match the same angles as before.</Text>
        </View>

        <PhotoCapture
          phase="after"
          photos={photos}
          onPhotoCaptured={handlePhotoCaptured}
          currentJobPhase={phase}
          jobId={job.id}
          customerId={job.contactId}
          jobAddress={job.address}
        />

        <TouchableOpacity
          style={[styles.completeButton, afterPhotos.length < 1 && styles.nextButtonDisabled]}
          onPress={handleComplete}
          disabled={afterPhotos.length < 1}
          activeOpacity={0.7}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.completeButtonText}>Complete Job</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ===== COMPLETED State =====
  if (phase === 'COMPLETED') {
    const flaggedPhotos = photos.filter((p) => p.isDuplicate || (p.latitude !== null && !p.gpsVerified));
    const hasFlaggedPhotos = flaggedPhotos.length > 0;

    return (
      <View style={styles.phaseContainer}>
        {/* Completion header */}
        <View style={styles.completedHeader}>
          <View style={styles.completedCheck}>
            <Ionicons name="checkmark" size={24} color="#fff" />
          </View>
          <Text style={styles.completedTitle}>Job Complete</Text>
          <Text style={styles.completedName}>{job.contactName}</Text>
          <Text style={styles.completedType}>{job.jobType}</Text>
        </View>

        {/* GPS verification summary */}
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Time Spent</Text>
            <Text style={styles.statValue}>{formatElapsedReadable(finalElapsed || elapsed)}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Before Photos</Text>
            <Text style={styles.statValue}>{beforePhotos.length}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>After Photos</Text>
            <Text style={styles.statValue}>{afterPhotos.length}</Text>
          </View>
          {chemicals && (
            <>
              <View style={styles.statDivider} />
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Chemical Readings</Text>
                <Ionicons name="checkmark-circle" size={18} color={Colors.green} />
              </View>
            </>
          )}
          <View style={styles.statDivider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>GPS Arrival</Text>
            {gpsStart ? (
              <View style={styles.verificationRow}>
                <Ionicons
                  name={gpsStart.verified ? 'checkmark-circle' : 'warning'}
                  size={18}
                  color={gpsStart.verified ? Colors.green : Colors.amber}
                />
                <Text style={[styles.verificationText, { color: gpsStart.verified ? Colors.green : Colors.amber }]}>
                  {gpsStart.verified ? 'Verified' : formatDistance(gpsStart.distanceFromJob)}
                </Text>
              </View>
            ) : (
              <Text style={styles.verificationMissing}>No GPS</Text>
            )}
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>GPS Departure</Text>
            {gpsEnd ? (
              <View style={styles.verificationRow}>
                <Ionicons
                  name={gpsEnd.verified ? 'checkmark-circle' : 'warning'}
                  size={18}
                  color={gpsEnd.verified ? Colors.green : Colors.amber}
                />
                <Text style={[styles.verificationText, { color: gpsEnd.verified ? Colors.green : Colors.amber }]}>
                  {gpsEnd.verified ? 'Verified' : formatDistance(gpsEnd.distanceFromJob)}
                </Text>
              </View>
            ) : (
              <Text style={styles.verificationMissing}>No GPS</Text>
            )}
          </View>
        </View>

        {/* Flagged photos warning */}
        {hasFlaggedPhotos && (
          <View style={styles.flaggedWarning}>
            <Ionicons name="alert-circle" size={20} color={Colors.amber} />
            <Text style={styles.flaggedText}>
              {flaggedPhotos.length} photo{flaggedPhotos.length !== 1 ? 's' : ''} flagged for review
              {flaggedPhotos.some((p) => p.isDuplicate) ? ' (possible duplicate)' : ''}
              {flaggedPhotos.some((p) => p.latitude !== null && !p.gpsVerified) ? ' (GPS mismatch)' : ''}
            </Text>
          </View>
        )}

        {/* Action buttons */}
        <TouchableOpacity style={styles.invoiceButtonGreen} onPress={onInvoice} activeOpacity={0.7}>
          <Ionicons name="cash-outline" size={22} color="#fff" />
          <Text style={styles.invoiceButtonTextWhite}>Invoice Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextJobButton} onPress={onNextJob} activeOpacity={0.7}>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
          <Text style={styles.nextJobButtonText}>Next Job</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

// ===== GPS Status Banner =====
function GpsStatusBanner({ verified, distance }: { verified: boolean; distance: number }) {
  if (distance < 0) return null; // geocoding failed, no data to show

  return (
    <View style={[
      styles.gpsBanner,
      verified ? styles.gpsBannerVerified : styles.gpsBannerWarning,
    ]}>
      <Ionicons
        name={verified ? 'location' : 'warning'}
        size={16}
        color={verified ? Colors.green : Colors.amber}
      />
      <Text style={[
        styles.gpsBannerText,
        { color: verified ? Colors.green : Colors.amber },
      ]}>
        {verified
          ? `GPS verified (${formatDistance(distance)} from job)`
          : `GPS: ${formatDistance(distance)} from job address`
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  phaseContainer: {
    gap: Spacing.lg,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phaseBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  phaseBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  instructionBox: {
    backgroundColor: Colors.blueLight,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  instructionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: '#1e40af',
  },
  instructionSub: {
    fontSize: FontSize.xs,
    color: '#3b82f6',
    marginTop: 2,
  },
  arrivedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.green,
    borderRadius: BorderRadius.lg,
    paddingVertical: 20,
    minHeight: 64,
  },
  arrivedButtonText: {
    color: '#fff',
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.tsasPrimary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
  },
  invoiceButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  timerCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  infoName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  infoType: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
  },
  infoCheck: {
    fontSize: FontSize.sm,
    color: Colors.green,
  },
  chemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
  },
  chemButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.blue,
  },
  notesCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  notesLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  notesInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    minHeight: 80,
  },
  afterPhotosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.lg,
    paddingVertical: 20,
    minHeight: 60,
  },
  afterPhotosText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.green,
    borderRadius: BorderRadius.lg,
    paddingVertical: 20,
    minHeight: 60,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  completedHeader: {
    backgroundColor: Colors.greenLight,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  completedCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  completedTitle: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: '#166534',
  },
  completedName: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: '#374151',
    marginTop: 4,
  },
  completedType: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statsCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  statDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verificationText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  verificationMissing: {
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
  },
  flaggedWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.amberLight,
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  flaggedText: {
    fontSize: FontSize.sm,
    color: Colors.amber,
    fontWeight: '600',
    flex: 1,
  },
  invoiceButtonGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.tsasPrimary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
  },
  invoiceButtonTextWhite: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  nextJobButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
  },
  nextJobButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  // GPS banner styles
  gpsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  gpsBannerVerified: {
    backgroundColor: Colors.greenLight,
    borderColor: '#bbf7d0',
  },
  gpsBannerWarning: {
    backgroundColor: Colors.amberLight,
    borderColor: '#fde68a',
  },
  gpsBannerText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  // Toast styles
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: '#1e3a5f',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  toastText: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});
