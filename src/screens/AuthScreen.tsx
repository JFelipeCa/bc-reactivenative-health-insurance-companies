import { useEffect, useState } from 'react';
import axios from 'axios';
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { loginWithDemoCredentials } from '../api/client';
import { useHealthStore } from '../store';
import { colors } from '../theme';
import { useOAuthLogin } from '../hooks/useOAuthLogin';

export function AuthScreen() {
  const signIn = useHealthStore((state) => state.signIn);
  const oauth = useOAuthLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (oauth.error) setError(oauth.error); }, [oauth.error]);

  const submit = async () => {
    if (!username.trim() || password.length < 8) {
      setError('Ingresa un usuario y una contraseña de al menos 8 caracteres.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await loginWithDemoCredentials(username.trim(), password);
      signIn();
    } catch (cause: unknown) {
      setError(axios.isAxiosError(cause) ? 'No se pudo validar la cuenta de demostración.' : cause instanceof Error ? cause.message : 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return <SafeAreaView style={styles.safe}><View style={styles.form}>
    <Text style={styles.eyebrow}>ACCESO DE AFILIADOS</Text>
    <Text style={styles.title}>Ingresa a tu cobertura</Text>
    <Text style={styles.body}>Usa una cuenta de prueba de DummyJSON. Esta sesión no pertenece a una aseguradora.</Text>
    <TextInput accessibilityLabel="Usuario" value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} placeholder="Usuario de demostración" placeholderTextColor={colors.muted} style={styles.input} />
    <TextInput accessibilityLabel="Contraseña" value={password} onChangeText={setPassword} secureTextEntry placeholder="Contraseña" placeholderTextColor={colors.muted} style={styles.input} />
    {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
    <Pressable accessibilityRole="button" disabled={loading} style={[styles.button, loading && styles.disabled]} onPress={() => void submit()}><Text style={styles.buttonText}>{loading ? 'Validando…' : 'Iniciar sesión con usuario demo'}</Text></Pressable>
    <Pressable accessibilityRole="button" disabled={!oauth.enabled || loading || Platform.OS === 'web'} style={[styles.oauthButton, (!oauth.enabled || Platform.OS === 'web') && styles.disabled]} onPress={() => void oauth.start()}><Text style={styles.oauthText}>Continuar con OAuth PKCE</Text></Pressable>
    {!oauth.enabled ? <Text style={styles.hint}>Configura EXPO_PUBLIC_OAUTH_CLIENT_ID y registra el scheme healthcoveragecolombia para habilitar OAuth.</Text> : null}
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
  hint: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: 13 },
  buttonText: { color: 'white', fontSize: 14, fontWeight: '800', textAlign: 'center' },
  oauthButton: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 10, borderWidth: 1, padding: 13 },
  oauthText: { color: colors.primaryDark, fontSize: 14, fontWeight: '800', textAlign: 'center' },
  disabled: { opacity: 0.45 },
});
