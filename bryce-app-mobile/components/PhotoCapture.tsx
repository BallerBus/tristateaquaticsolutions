import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, BorderRadius, Spacing } from '../constants/colors';
import { generatePerceptualHash, checkDuplicate, storePhotoHash } from '../lib/photo-verification';
import { getCurrentPosition, geocodeAddress, haversineDistance } from '../lib/gps-verification';
import type { CapturedPhoto } from '../lib/job-state';
import type { JobPhase } from '../lib/job-state';

interface PhotoCaptureProps {
  phase: 'before' | 'after';
  photos: CapturedPhoto[];
  onPhotoCaptured: (photo: CapturedPhoto) => void;
  maxPhotos?: number;
  // Verification props
  currentJobPhase: JobPhase;
  jobId: string;
  customerId: string;
  jobAddress: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

const VERIFICATION_RADIUS_METERS = 200;

/**
 * Returns the allowed photo phase(s) for a given job phase.
 * Before photos only during BEFORE_PHOTOS, after photos only during AFTER_PHOTOS.
 */
function allowedPhaseForJobPhase(jobPhase: JobPhase): 'before' | 'after' | null {
  switch (jobPhase) {
    case 'BEFORE_PHOTOS':
      return 'before';
    case 'AFTER_PHOTOS':
      return 'after';
    default:
      return null;
  }
}

export default function PhotoCapture({
  phase,
  photos,
  onPhotoCaptured,
  maxPhotos = 10,
  currentJobPhase,
  jobId,
  customerId,
  jobAddress,
}: PhotoCaptureProps) {
  const [capturing, setCapturing] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const phasePhotos = photos.filter((p) => p.phase === phase);
  const canTakeMore = phasePhotos.length < maxPhotos;

  // Phase lock check
  const allowedPhase = allowedPhaseForJobPhase(currentJobPhase);
  const phaseBlocked = allowedPhase !== phase;

  const openCamera = useCallback(async () => {
    if (capturing || !canTakeMore || phaseBlocked) return;

    // Check phase lock
    if (phaseBlocked) {
      Alert.alert(
        'Wrong Phase',
        `${phase === 'before' ? 'Before' : 'After'} photos can only be taken during the ${phase === 'before' ? 'Before Photos' : 'After Photos'} phase.`,
      );
      return;
    }

    // Request camera permission
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Camera Permission', 'Camera access is required to take photos.');
        return;
      }
    }

    setCameraOpen(true);
  }, [capturing, canTakeMore, phaseBlocked, phase, permission, requestPermission]);

  const takePhoto = useCallback(async () => {
    if (!cameraRef.current || capturing) return;
    setCapturing(true);
    setProcessing(true);

    try {
      // Capture from camera
      const result = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });

      if (!result?.uri) {
        setCapturing(false);
        setProcessing(false);
        return;
      }

      const uri = result.uri;

      // Get GPS (non-blocking — don't fail the photo if GPS is unavailable)
      let latitude: number | null = null;
      let longitude: number | null = null;
      let gpsAccuracy = 0;
      let gpsVerified = false;

      try {
        const position = await getCurrentPosition();
        if (position) {
          latitude = position.latitude;
          longitude = position.longitude;
          gpsAccuracy = position.accuracy;

          // Check distance from job
          const jobCoords = await geocodeAddress(jobAddress);
          if (jobCoords) {
            const distance = haversineDistance(
              position.latitude,
              position.longitude,
              jobCoords.latitude,
              jobCoords.longitude,
            );
            gpsVerified = distance <= VERIFICATION_RADIUS_METERS;
          }
        }
      } catch {
        // GPS failed silently — photo still valid, just unverified
      }

      // Generate perceptual hash
      let perceptualHash = '';
      let isDuplicate = false;
      try {
        perceptualHash = await generatePerceptualHash(uri);
        isDuplicate = await checkDuplicate(perceptualHash, customerId, jobId);
        await storePhotoHash(customerId, jobId, perceptualHash);
      } catch {
        // Hash generation failed — photo still valid, just unhashed
      }

      // Build the verified photo
      const photo: CapturedPhoto = {
        id: generateId(),
        uri,
        capturedAt: new Date().toISOString(),
        latitude,
        longitude,
        phase,
        uploaded: false,
        gpsAccuracy,
        gpsVerified,
        perceptualHash,
        isDuplicate,
      };

      // Warn about duplicates but don't block
      if (isDuplicate) {
        Alert.alert(
          'Possible Duplicate',
          'This photo looks very similar to one from a previous visit. It has been flagged for review.',
        );
      }

      // Warn about GPS mismatch but don't block
      if (latitude !== null && !gpsVerified) {
        // Only warn if we got GPS but it doesn't match — don't warn if GPS unavailable
        Alert.alert(
          'Location Mismatch',
          'Your current location does not appear to be near the job address. This photo has been flagged for review.',
        );
      }

      onPhotoCaptured(photo);
      setCameraOpen(false);
    } catch (err) {
      console.error('Photo capture error:', err);
    } finally {
      setCapturing(false);
      setProcessing(false);
    }
  }, [phase, jobId, customerId, jobAddress, onPhotoCaptured, capturing]);

  const closeCamera = useCallback(() => {
    setCameraOpen(false);
  }, []);

  return (
    <View>
      {/* Camera button */}
      {canTakeMore && !phaseBlocked && (
        <TouchableOpacity
          style={[styles.cameraButton, capturing && styles.cameraButtonDisabled]}
          onPress={openCamera}
          disabled={capturing}
          activeOpacity={0.7}
        >
          {capturing ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="camera" size={28} color="#fff" />
          )}
          <Text style={styles.cameraText}>
            {capturing ? 'Saving...' : `Take ${phase === 'before' ? 'Before' : 'After'} Photo`}
          </Text>
        </TouchableOpacity>
      )}

      {/* Phase blocked message */}
      {phaseBlocked && canTakeMore && (
        <View style={styles.blockedBox}>
          <Ionicons name="lock-closed" size={18} color={Colors.amber} />
          <Text style={styles.blockedText}>
            {phase === 'before' ? 'Before' : 'After'} photos are locked — wrong job phase.
          </Text>
        </View>
      )}

      {/* Photo count */}
      {phasePhotos.length > 0 && (
        <Text style={styles.countText}>
          {phasePhotos.length} photo{phasePhotos.length !== 1 ? 's' : ''} taken
          {!canTakeMore ? ' (max reached)' : ''}
        </Text>
      )}

      {/* Thumbnail strip */}
      {phasePhotos.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailStrip}
          contentContainerStyle={styles.thumbnailContent}
        >
          {phasePhotos.map((photo) => (
            <View key={photo.id} style={styles.thumbnail}>
              <Image source={{ uri: photo.uri }} style={styles.thumbnailImage} />
              {/* Upload badge */}
              {photo.uploaded && (
                <View style={styles.uploadedBadge}>
                  <Ionicons name="checkmark" size={10} color="#fff" />
                </View>
              )}
              {/* GPS verified badge */}
              {photo.gpsVerified && (
                <View style={styles.gpsBadge}>
                  <Ionicons name="location" size={10} color="#fff" />
                </View>
              )}
              {/* Duplicate warning badge */}
              {photo.isDuplicate && (
                <View style={styles.duplicateBadge}>
                  <Ionicons name="warning" size={10} color="#fff" />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Full-screen camera modal — camera-only, no gallery picker */}
      <Modal visible={cameraOpen} animationType="slide" presentationStyle="fullScreen">
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
          >
            {/* Top bar */}
            <View style={styles.cameraTopBar}>
              <TouchableOpacity onPress={closeCamera} style={styles.cameraCloseButton}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
              <View style={styles.cameraPhaseBadge}>
                <Text style={styles.cameraPhaseText}>
                  {phase === 'before' ? 'BEFORE' : 'AFTER'} PHOTO
                </Text>
              </View>
              <View style={{ width: 40 }} />
            </View>

            {/* Processing overlay */}
            {processing && (
              <View style={styles.processingOverlay}>
                <ActivityIndicator color="#fff" size="large" />
                <Text style={styles.processingText}>Verifying photo...</Text>
              </View>
            )}

            {/* Capture button */}
            <View style={styles.cameraBottomBar}>
              <TouchableOpacity
                style={[styles.captureButton, capturing && styles.captureButtonDisabled]}
                onPress={takePhoto}
                disabled={capturing}
                activeOpacity={0.7}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    minHeight: 60,
  },
  cameraButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  cameraText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  blockedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.amberLight,
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  blockedText: {
    fontSize: FontSize.sm,
    color: Colors.amber,
    fontWeight: '600',
    flex: 1,
  },
  countText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  thumbnailStrip: {
    marginTop: Spacing.sm,
  },
  thumbnailContent: {
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  thumbnail: {
    position: 'relative',
  },
  thumbnailImage: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#f3f4f6',
  },
  uploadedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duplicateBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Full-screen camera
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
  },
  cameraCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraPhaseBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  cameraPhaseText: {
    color: '#fff',
    fontSize: FontSize.xs,
    fontWeight: '800',
    letterSpacing: 1,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    zIndex: 10,
  },
  processingText: {
    color: '#fff',
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  cameraBottomBar: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  captureButtonDisabled: {
    opacity: 0.4,
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
  },
});
