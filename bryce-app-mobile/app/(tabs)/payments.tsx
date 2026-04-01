import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, BorderRadius, Spacing } from '../../constants/colors';
import { PaymentPresets, PaymentModeLabels, type PaymentMode } from '../../constants/pricing';
import { apiPost } from '../../lib/api';
import { useBrandStore } from '../../stores/brand.store';
import { useJobsStore, type Job } from '../../stores/jobs.store';

interface PaymentResult {
  checkoutUrl: string;
  smsText: string;
  amount: string;
  contactId?: string;
  brand?: string;
}

type Step = 'select-customer' | 'form' | 'review' | 'result';

// Preset amounts for quick selection (specified in the task)
const QUICK_AMOUNTS = [
  { value: 150, label: '$150' },
  { value: 175, label: '$175' },
  { value: 205, label: '$205' },
  { value: 400, label: '$400' },
  { value: 550, label: '$550' },
  { value: 800, label: '$800' },
];

export default function PaymentsScreen() {
  const { activeBrand } = useBrandStore();
  const { jobs } = useJobsStore();

  const [step, setStep] = useState<Step>('select-customer');
  const [mode, setMode] = useState<PaymentMode>('maintenance-upfront');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerContactId, setCustomerContactId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingViaGhl, setSendingViaGhl] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter today's jobs for customer selection
  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    const q = searchQuery.toLowerCase();
    return jobs.filter(
      (j) =>
        j.contactName.toLowerCase().includes(q) ||
        j.address.toLowerCase().includes(q) ||
        j.contactPhone.includes(q),
    );
  }, [jobs, searchQuery]);

  function selectCustomer(job: Job) {
    setCustomerName(job.contactName);
    setCustomerPhone(job.contactPhone);
    setCustomerContactId(job.contactId);
    setStep('form');
  }

  function selectManual() {
    setCustomerName('');
    setCustomerPhone('');
    setCustomerContactId('');
    setStep('form');
  }

  function getWeekLabel(): string {
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const day = now.getDate();
    return `Weekly maintenance - Week of ${month} ${day}`;
  }

  function getCustomerPays(): string {
    const parsed = parseFloat(amount);
    if (isNaN(parsed)) return '$0.00';
    if (mode === 'opening-deposit') {
      return `$${(parsed / 2).toFixed(2)}`;
    }
    return `$${parsed.toFixed(2)}`;
  }

  async function handleCreate() {
    if (!customerName.trim() || !customerPhone.trim() || !amount) {
      setError('Fill in all fields');
      return;
    }
    setLoading(true);
    setError('');

    const brandId = activeBrand?.id || 'pcd';

    try {
      const data = await apiPost<PaymentResult>('/api/payment-link', {
        mode,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        amount: parseFloat(amount),
        isNewCustomer: !customerContactId,
        contactBrand: brandId,
        newCustomerBrand: brandId,
      });
      setResult(data);
      setStep('result');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create payment link';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendViaGhl() {
    if (!result) return;

    const contactId = result.contactId || customerContactId;
    if (!contactId) {
      Alert.alert(
        'No Contact ID',
        'This customer does not have a GHL contact ID. Use the SMS app instead.',
      );
      return;
    }

    setSendingViaGhl(true);
    const brandId = activeBrand?.id || 'pcd';

    try {
      await apiPost('/api/payment-link/send', {
        contactId,
        brand: brandId,
        smsText: result.smsText,
      });
      Alert.alert(
        'Sent',
        `Payment link sent to ${customerName} at ${customerPhone}`,
        [{ text: 'OK' }],
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send SMS';
      Alert.alert('SMS Failed', message);
    } finally {
      setSendingViaGhl(false);
    }
  }

  function handleReset() {
    setStep('select-customer');
    setMode('maintenance-upfront');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerContactId('');
    setAmount('');
    setDescription('');
    setError('');
    setResult(null);
    setSearchQuery('');
  }

  // ===== Result Screen =====
  if (step === 'result' && result) {
    const contactId = result.contactId || customerContactId;
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.resultHeader}>
            <Ionicons name="checkmark-circle" size={40} color={Colors.green} />
            <Text style={styles.resultTitle}>Payment Link Ready</Text>
            <Text style={styles.resultAmount}>${result.amount}</Text>
            <Text style={styles.resultDetail}>{PaymentModeLabels[mode]} for {customerName}</Text>
          </View>

          <View style={styles.smsBox}>
            <Text style={styles.smsLabel}>SMS MESSAGE</Text>
            <Text style={styles.smsText}>{result.smsText}</Text>
          </View>

          {/* Send via GHL button -- primary action */}
          {contactId ? (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendViaGhl}
              disabled={sendingViaGhl}
              activeOpacity={0.7}
            >
              {sendingViaGhl ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="send-outline" size={22} color="#fff" />
                  <Text style={styles.sendButtonText}>Send Payment Link via SMS</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.noContactBox}>
              <Ionicons name="information-circle-outline" size={18} color={Colors.amber} />
              <Text style={styles.noContactText}>
                No GHL contact ID. Copy the link above and send manually.
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.resetButton} onPress={handleReset} activeOpacity={0.7}>
            <Text style={styles.resetButtonText}>Create Another Link</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ===== Customer Selection Screen =====
  if (step === 'select-customer') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>New Payment Link</Text>

          {activeBrand && (
            <View style={styles.brandIndicator}>
              <View style={[styles.brandDot, { backgroundColor: activeBrand.colors.accent }]} />
              <Text style={styles.brandIndicatorText}>{activeBrand.shortName}</Text>
            </View>
          )}

          <Text style={styles.sectionLabel}>Select Customer</Text>

          {/* Search */}
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name, address, or phone..."
            placeholderTextColor={Colors.textTertiary}
            autoCorrect={false}
          />

          {/* Today's route customers */}
          {filteredJobs.length > 0 ? (
            <View style={styles.customerList}>
              {filteredJobs.map((job) => (
                <TouchableOpacity
                  key={job.id}
                  style={styles.customerCard}
                  onPress={() => selectCustomer(job)}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.customerName}>{job.contactName}</Text>
                    <Text style={styles.customerAddress} numberOfLines={1}>
                      {job.address}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No jobs loaded for today.</Text>
            </View>
          )}

          {/* Manual entry option */}
          <TouchableOpacity
            style={styles.manualButton}
            onPress={selectManual}
            activeOpacity={0.7}
          >
            <Ionicons name="person-add-outline" size={20} color={Colors.blue} />
            <Text style={styles.manualButtonText}>Enter Customer Manually</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ===== Form Screen =====
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Back to customer selection */}
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => setStep('select-customer')}
          activeOpacity={0.6}
        >
          <Ionicons name="chevron-back" size={20} color={Colors.blue} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Payment Details</Text>

        {/* Payment type selector */}
        <Text style={styles.sectionLabel}>Payment Type</Text>
        <View style={styles.modeGrid}>
          {(Object.keys(PaymentModeLabels) as PaymentMode[]).filter(m => m !== 'custom').map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.modeButton, mode === m && styles.modeButtonActive]}
              onPress={() => { setMode(m); setAmount(''); }}
              activeOpacity={0.7}
            >
              <Text style={[styles.modeText, mode === m && styles.modeTextActive]}>
                {PaymentModeLabels[m]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Customer info */}
        <Text style={styles.sectionLabel}>Customer</Text>
        <TextInput
          style={styles.input}
          value={customerName}
          onChangeText={setCustomerName}
          placeholder="Customer Name"
          placeholderTextColor={Colors.textTertiary}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={customerPhone}
          onChangeText={setCustomerPhone}
          placeholder="Phone Number"
          placeholderTextColor={Colors.textTertiary}
          keyboardType="phone-pad"
          autoCorrect={false}
        />

        {/* Quick amount presets */}
        <Text style={styles.sectionLabel}>Amount</Text>
        <View style={styles.presetGrid}>
          {QUICK_AMOUNTS.map((preset) => (
            <TouchableOpacity
              key={preset.value}
              style={[styles.presetButton, amount === String(preset.value) && styles.presetButtonActive]}
              onPress={() => setAmount(String(preset.value))}
              activeOpacity={0.7}
            >
              <Text style={[styles.presetLabel, amount === String(preset.value) && styles.presetLabelActive]}>
                {preset.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mode-specific presets */}
        {PaymentPresets[mode]?.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>{PaymentModeLabels[mode]} Presets</Text>
            <View style={styles.presetGrid}>
              {PaymentPresets[mode]?.map((preset, i) => (
                <TouchableOpacity
                  key={`${mode}-${i}`}
                  style={[styles.presetButton, amount === String(preset.value) && styles.presetButtonActive]}
                  onPress={() => setAmount(String(preset.value))}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.presetLabel, amount === String(preset.value) && styles.presetLabelActive]}>
                    {preset.label}
                  </Text>
                  {preset.note && (
                    <Text style={[styles.presetNote, amount === String(preset.value) && styles.presetNoteActive]}>
                      {preset.note}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Custom amount */}
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder={mode === 'opening-deposit' ? 'Total Quote ($)' : 'Amount ($)'}
          placeholderTextColor={Colors.textTertiary}
          keyboardType="decimal-pad"
        />
        {amount && !isNaN(parseFloat(amount)) && (
          <Text style={styles.paysText}>Customer pays: {getCustomerPays()}</Text>
        )}

        {/* Description */}
        <Text style={styles.sectionLabel}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder={getWeekLabel()}
          placeholderTextColor={Colors.textTertiary}
          autoCorrect={false}
        />

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreate}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Ionicons name="link-outline" size={22} color="#fff" />
              <Text style={styles.createButtonText}>Send Payment Link</Text>
            </>
          )}
        </TouchableOpacity>
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
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: Spacing.md,
    marginLeft: -Spacing.xs,
  },
  backText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.blue,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  brandIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  brandIndicatorText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSize.lg,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  customerList: {
    gap: Spacing.sm,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  customerName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  customerAddress: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  emptyBox: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    marginTop: Spacing.lg,
  },
  manualButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.blue,
  },
  modeGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  modeButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  modeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  modeTextActive: {
    color: '#fff',
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  presetButton: {
    width: '31%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
  },
  presetButtonActive: {
    backgroundColor: Colors.blueLight,
    borderColor: Colors.blue,
  },
  presetLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  presetLabelActive: {
    color: Colors.blue,
  },
  presetNote: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 2,
    textAlign: 'center',
  },
  presetNoteActive: {
    color: Colors.blue,
  },
  paysText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  errorBox: {
    backgroundColor: Colors.redLight,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.red,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    marginTop: Spacing.sm,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  // Result screen
  resultHeader: {
    backgroundColor: Colors.greenLight,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xxl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  resultTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: '#166534',
    marginTop: Spacing.sm,
  },
  resultAmount: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  resultDetail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  smsBox: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  smsLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  smsText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    lineHeight: 20,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.green,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  noContactBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.amberLight,
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  noContactText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: '#92400e',
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  resetButtonText: {
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
  },
});
