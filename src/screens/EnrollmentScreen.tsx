import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Animated, Easing, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme';

const enrollmentSchema = z.object({
  name: z.string().trim().min(3, 'Ingresa tu nombre completo.'),
  email: z.string().trim().email('Ingresa un correo válido.'),
  phone: z.string().trim().regex(/^\+?[0-9\s()-]{7,15}$/, 'Ingresa un teléfono válido.'),
  memberId: z.string().trim().regex(/^HI-\d{6}$/i, 'Usa el formato HI-123456.'),
});

type EnrollmentValues = z.infer<typeof enrollmentSchema>;
const fields: Array<{ name: keyof EnrollmentValues; label: string; placeholder: string; keyboard?: 'default' | 'email-address' | 'phone-pad' }> = [
  { name: 'name', label: 'Nombre completo', placeholder: 'Ej. Ana María Pérez' },
  { name: 'email', label: 'Correo electrónico', placeholder: 'nombre@correo.com', keyboard: 'email-address' },
  { name: 'phone', label: 'Teléfono', placeholder: '3001234567', keyboard: 'phone-pad' },
  { name: 'memberId', label: 'Número de afiliado', placeholder: 'Ej. HI-123456' },
];

export function EnrollmentScreen() {
  const [submitted, setSubmitted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnrollmentValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: { name: '', email: '', phone: '', memberId: '' },
    mode: 'onBlur',
  });

  useEffect(() => {
    Animated.timing(progress, { toValue: submitted ? 1 : 0.25, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [progress, submitted]);

  const onSubmit = async (_values: EnrollmentValues) => {
    // This learning form validates locally. There is no configured enrollment service.
    setSubmitted(true);
  };

  return <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>SOLICITUD DE AFILIACIÓN</Text>
      <Text style={styles.title}>Solicitar orientación</Text>
      <Text style={styles.body}>Formulario académico. Los datos no se envían ni se almacenan.</Text>
      <View accessibilityLabel={submitted ? 'Formulario completo' : 'Progreso del formulario'} style={styles.progressTrack}><Animated.View style={[styles.progressBar, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} /></View>
      {fields.map((field) => <View key={field.name} style={styles.field}>
        <Text style={styles.label}>{field.label}</Text>
        <Controller control={control} name={field.name} render={({ field: input }) => <TextInput
          accessibilityLabel={field.label}
          value={input.value}
          onChangeText={(value) => { input.onChange(value); setSubmitted(false); }}
          onBlur={input.onBlur}
          ref={input.ref}
          keyboardType={field.keyboard ?? 'default'}
          autoCapitalize={field.name === 'email' ? 'none' : field.name === 'memberId' ? 'characters' : 'words'}
          placeholder={field.placeholder}
          placeholderTextColor={colors.muted}
          style={[styles.input, errors[field.name] && styles.inputError]}
        />} />
        {errors[field.name]?.message ? <Text accessibilityRole="alert" style={styles.error}>{errors[field.name]?.message}</Text> : null}
      </View>)}
      {submitted ? <Text accessibilityRole="alert" style={styles.success}>Formulario válido. No se envió una solicitud.</Text> : null}
      <Pressable accessibilityRole="button" disabled={isSubmitting} style={styles.button} onPress={handleSubmit(onSubmit)}><Text style={styles.buttonText}>{isSubmitting ? 'Validando…' : 'Validar formulario'}</Text></Pressable>
    </ScrollView>
  </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  safe: { backgroundColor: colors.background, flex: 1 },
  form: { gap: 15, padding: 22 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.3 },
  title: { color: colors.primaryDark, fontSize: 28, fontWeight: '800' },
  body: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  field: { gap: 6 },
  label: { color: colors.primaryDark, fontSize: 13, fontWeight: '700' },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.primaryDark, fontSize: 15, padding: 14 },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 12 },
  success: { color: colors.success, fontSize: 13, fontWeight: '700' },
  progressTrack: { backgroundColor: '#DDE8E2', borderRadius: 5, height: 8, overflow: 'hidden' },
  progressBar: { backgroundColor: colors.primary, borderRadius: 5, height: 8 },
  button: { alignSelf: 'flex-start', backgroundColor: colors.accent, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 13 },
  buttonText: { color: colors.primaryDark, fontSize: 14, fontWeight: '800' },
});
