import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useHealthStore } from '../store';
import { colors } from '../theme';

export function AuthScreen() {
  const signIn = useHealthStore((state) => state.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || password.length < 8) {
      setError('Ingresa un correo válido y una contraseña de al menos 8 caracteres.');
      return;
    }
    setError('');
    signIn();
  };
  return <SafeAreaView style={styles.safe}><View style={styles.form}>
    <Text style={styles.eyebrow}>ACCESO DE DEMOSTRACIÓN</Text>
    <Text style={styles.title}>Explora tu cobertura</Text>
    <Text style={styles.body}>Este acceso es local y solo sirve para practicar navegación; no valida una cuenta real.</Text>
    <TextInput accessibilityLabel="Correo electrónico" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="Correo electrónico" placeholderTextColor={colors.muted} style={styles.input} />
    <TextInput accessibilityLabel="Contraseña" value={password} onChangeText={setPassword} secureTextEntry placeholder="Contraseña (mínimo 8 caracteres)" placeholderTextColor={colors.muted} style={styles.input} />
    {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
    <Pressable accessibilityRole="button" style={styles.button} onPress={submit}><Text style={styles.buttonText}>Continuar</Text></Pressable>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { backgroundColor: colors.background, flex: 1 },
  form: { flex: 1, gap: 15, justifyContent: 'center', padding: 22 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.3 },
  title: { color: colors.primaryDark, fontSize: 28, fontWeight: '800' },
  body: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.primaryDark, fontSize: 15, padding: 14 },
  error: { color: colors.error, fontSize: 13 },
  button: { alignSelf: 'flex-start', backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 13 },
  buttonText: { color: 'white', fontSize: 14, fontWeight: '800' },
});
