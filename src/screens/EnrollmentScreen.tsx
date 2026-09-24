import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme';

type Field = 'name' | 'email' | 'phone' | 'memberId';
type Values = Record<Field, string>;
const fields: Array<{ name: Field; label: string; placeholder: string; keyboard?: 'default' | 'email-address' | 'phone-pad' }> = [
  { name: 'name', label: 'Nombre completo', placeholder: 'Ej. Ana María Pérez' },
  { name: 'email', label: 'Correo electrónico', placeholder: 'nombre@correo.com', keyboard: 'email-address' },
  { name: 'phone', label: 'Teléfono', placeholder: '3001234567', keyboard: 'phone-pad' },
  { name: 'memberId', label: 'Número de afiliado', placeholder: 'Ej. HI-123456' },
];

function validate(values: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (values.name.trim().length < 3) errors.name = 'Ingresa tu nombre completo.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Ingresa un correo válido.';
  if (!/^\+?[0-9\s()-]{7,15}$/.test(values.phone.trim())) errors.phone = 'Ingresa un teléfono válido.';
  if (!/^HI-\d{6}$/i.test(values.memberId.trim())) errors.memberId = 'Usa el formato HI-123456.';
  return errors;
}

export function EnrollmentScreen() {
  const [values, setValues] = useState<Values>({ name: '', email: '', phone: '', memberId: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, { toValue: submitted ? 1 : 0.25, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [progress, submitted]);
  const submit = () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };
  return <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>SOLICITUD DE AFILIACIÓN</Text>
      <Text style={styles.title}>Solicitar orientación</Text>
      <Text style={styles.body}>Formulario de práctica: los datos no se envían ni se almacenan.</Text>
      <View accessibilityLabel={submitted ? 'Formulario completo' : 'Progreso del formulario'} style={styles.progressTrack}><Animated.View style={[styles.progressBar, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} /></View>
      {fields.map((field) => <View key={field.name} style={styles.field}>
        <Text style={styles.label}>{field.label}</Text>
        <TextInput accessibilityLabel={field.label} value={values[field.name]} onChangeText={(value) => { setValues((current) => ({ ...current, [field.name]: value })); setSubmitted(false); }} keyboardType={field.keyboard ?? 'default'} autoCapitalize={field.name === 'email' ? 'none' : field.name === 'memberId' ? 'characters' : 'words'} placeholder={field.placeholder} placeholderTextColor={colors.muted} style={styles.input} />
        {errors[field.name] ? <Text accessibilityRole="alert" style={styles.error}>{errors[field.name]}</Text> : null}
      </View>)}
      {submitted ? <Text accessibilityRole="alert" style={styles.success}>Formulario válido. En esta versión no se envían solicitudes.</Text> : null}
      <Pressable accessibilityRole="button" style={styles.button} onPress={submit}><Text style={styles.buttonText}>Validar formulario</Text></Pressable>
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
  error: { color: colors.error, fontSize: 12 },
  success: { color: colors.success, fontSize: 13, fontWeight: '700' },
  progressTrack: { backgroundColor: '#DDE8E2', borderRadius: 5, height: 8, overflow: 'hidden' },
  progressBar: { backgroundColor: colors.primary, borderRadius: 5, height: 8 },
  button: { alignSelf: 'flex-start', backgroundColor: colors.accent, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 13 },
  buttonText: { color: colors.primaryDark, fontSize: 14, fontWeight: '800' },
});
