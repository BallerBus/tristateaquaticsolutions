import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize, BorderRadius, Spacing } from '../constants/colors';
import { ChemicalRanges, getChemicalStatus, getChemicalStatusColor } from '../lib/job-state';
import type { ChemicalReading } from '../lib/job-state';

interface ChemicalFormProps {
  initialValues?: ChemicalReading;
  onSave: (reading: ChemicalReading) => void;
  onSkip?: () => void;
}

type ChemField = 'ph' | 'freeChlorine' | 'alkalinity' | 'cya';

const fields: { key: ChemField; label: string; placeholder: string; rangeLabel: string }[] = [
  { key: 'ph', label: 'pH', placeholder: '7.4', rangeLabel: '7.4 - 7.6' },
  { key: 'freeChlorine', label: 'Free Chlorine', placeholder: '2.0', rangeLabel: '1.0 - 3.0 ppm' },
  { key: 'alkalinity', label: 'Alkalinity', placeholder: '100', rangeLabel: '80 - 120 ppm' },
  { key: 'cya', label: 'CYA / Stabilizer', placeholder: '40', rangeLabel: '30 - 50 ppm' },
];

export default function ChemicalForm({ initialValues, onSave, onSkip }: ChemicalFormProps) {
  const [values, setValues] = useState<Record<ChemField, string>>({
    ph: initialValues?.ph?.toString() || '',
    freeChlorine: initialValues?.freeChlorine?.toString() || '',
    alkalinity: initialValues?.alkalinity?.toString() || '',
    cya: initialValues?.cya?.toString() || '',
  });

  function handleSave() {
    const reading: ChemicalReading = {
      ph: values.ph ? parseFloat(values.ph) : null,
      freeChlorine: values.freeChlorine ? parseFloat(values.freeChlorine) : null,
      alkalinity: values.alkalinity ? parseFloat(values.alkalinity) : null,
      cya: values.cya ? parseFloat(values.cya) : null,
      recordedAt: new Date().toISOString(),
    };
    onSave(reading);
  }

  function updateValue(key: ChemField, text: string) {
    // Allow only numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    setValues((prev) => ({ ...prev, [key]: cleaned }));
  }

  const hasAnyValue = Object.values(values).some((v) => v.length > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chemical Readings</Text>
      <Text style={styles.subtitle}>Enter the readings from your test kit</Text>

      <View style={styles.fieldsContainer}>
        {fields.map((field) => {
          const val = values[field.key];
          const numVal = val ? parseFloat(val) : null;
          const status = getChemicalStatus(field.key, numVal);
          const statusColor = getChemicalStatusColor(status);

          return (
            <View key={field.key} style={styles.fieldRow}>
              <View style={styles.fieldLabel}>
                <Text style={styles.fieldName}>{field.label}</Text>
                <Text style={styles.fieldRange}>Ideal: {field.rangeLabel}</Text>
              </View>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[
                    styles.input,
                    numVal !== null && { borderColor: statusColor, borderWidth: 2 },
                  ]}
                  value={val}
                  onChangeText={(t) => updateValue(field.key, t)}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.textLight}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
                {numVal !== null && (
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                )}
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.saveButton, !hasAnyValue && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={!hasAnyValue}
        activeOpacity={0.7}
      >
        <Text style={styles.saveButtonText}>Save Readings</Text>
      </TouchableOpacity>

      {onSkip && (
        <TouchableOpacity style={styles.skipButton} onPress={onSkip} activeOpacity={0.7}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: Spacing.lg,
  },
  fieldsContainer: {
    gap: Spacing.md,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    flex: 1,
  },
  fieldName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  fieldRange: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  inputWrap: {
    position: 'relative',
  },
  input: {
    width: 80,
    height: 44,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  statusDot: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  saveButton: {
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  skipButtonText: {
    color: Colors.textTertiary,
    fontSize: FontSize.sm,
  },
});
