import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { fetchCoberturass } from '../api/coverages';
import { useHealthStore } from '../store';

type Coberturas = { id: string; name: string; category: string; detail: string };
type RootStackParamList = { Auth: undefined; MainTabs: undefined; CoberturasDetail: { coverage: Coberturas }; Enrollment: undefined };
type TabParamList = { Home: undefined; Coberturass: undefined };

const coverages: Coberturas[] = [
  { id: '1', name: 'Medicina general', category: 'Consulta', detail: 'Citas presenciales y virtuales para cuidar tu salud.' },
  { id: '2', name: 'Medicina familiar', category: 'Consulta', detail: 'Atención para todas las personas de tu hogar.' },
  { id: '3', name: 'Pediatría', category: 'Especialidad', detail: 'Atención especializada para niños y adolescentes.' },
  { id: '4', name: 'Urgencias', category: 'Atención inmediata', detail: 'Red de atención disponible las 24 horas.' },
  { id: '5', name: 'Telemedicina', category: 'Digital', detail: 'Habla con un profesional de salud desde casa.' },
  { id: '6', name: 'Odontología', category: 'Bienestar', detail: 'Servicios dentales preventivos y restaurativos.' },
  { id: '7', name: 'Salud mental', category: 'Bienestar', detail: 'Orientación y apoyo emocional.' },
  { id: '8', name: 'Servicios de laboratorio', category: 'Diagnóstico', detail: 'Exámenes con tarifas preferenciales.' },
  { id: '9', name: 'Maternidad', category: 'Especialidad', detail: 'Acompañamiento antes y después del parto.' },
  { id: '10', name: 'Chequeo anual', category: 'Prevención', detail: 'Una revisión completa de salud cada año.' },
];

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();
const queryClient = new QueryClient();

function HomeScreen({ navigation }: { navigation: any }) {
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  const signOut = useHealthStore((state) => state.signOut);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>COBERTURA DE SALUD COLOMBIA</Text>
        <Text style={styles.title}>Tu cobertura de salud en Colombia.</Text>
        <View style={styles.hero}>
          <Text style={styles.heroKicker}>SISTEMA DE SALUD COLOMBIANO</Text>
          <Text style={styles.heroTitle}>Compara planes, copagos y beneficios.</Text>
          <Text style={styles.heroText}>Consulta opciones de cobertura y redes EPS e IPS.</Text>
        </View>
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>
        <Pressable style={styles.actionCard} onPress={() => navigation.navigate('Coberturass')}>
          <View><Text style={styles.actionTitle}>Explorar coberturas</Text><Text style={styles.actionText}>Explora los servicios por categoría.</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
        <Pressable style={styles.actionCard} onPress={() => navigation.navigate('Enrollment')}>
          <View><Text style={styles.actionTitle}>Solicitar afiliación</Text><Text style={styles.actionText}>Envía tus datos de afiliación.</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
        <View style={styles.infoCard}><Text style={styles.infoKicker}>PLAN ACTIVO</Text><Text style={styles.infoTitle}>{selectedPlan}</Text><Text style={styles.infoText}>Protección equilibrada para tus necesidades de salud. Tu preferencia se guarda en el dispositivo.</Text></View>
        <Pressable onPress={signOut}><Text style={styles.signOutText}>Cerrar sesión</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function AuthScreen() {
  const signIn = useHealthStore((state) => state.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      setError('Ingresa un correo válido y una contraseña de al menos 8 caracteres.');
      return;
    }
    setError('');
    signIn();
  };

  return <SafeAreaView style={styles.safeArea}><View style={styles.formContent}><Text style={styles.eyebrow}>ACCESO DE AFILIADOS</Text><Text style={styles.title}>Ingresa a tu cobertura</Text><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="Correo electrónico" placeholderTextColor="#8A918D" style={styles.formInput} /><TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Contraseña" placeholderTextColor="#8A918D" style={styles.formInput} />{error ? <Text style={styles.errorText}>{error}</Text> : null}<Pressable style={styles.contactButton} onPress={submit}><Text style={styles.contactButtonText}>Iniciar sesión</Text></Pressable></View></SafeAreaView>;
}

function EnrollmentScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [memberId, setMemberId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const submit = () => {
    const nextErrors: string[] = [];
    if (name.trim().length < 2) nextErrors.push('Ingresa tu nombre completo.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.push('Ingresa un correo electrónico válido.');
    if (!/^HI-\d{6}$/.test(memberId.trim())) nextErrors.push('Usa un número de afiliado como HI-123456.');
    setErrors(nextErrors);
    setSubmitted(nextErrors.length === 0);
  };

  return (
    <KeyboardAvoidingView style={styles.safeArea} behavior="padding">
      <View style={styles.formContent}>
        <Text style={styles.eyebrow}>SOLICITUD DE AFILIACIÓN</Text>
        <Text style={styles.title}>Solicitar cobertura</Text>
        <Text style={styles.detailText}>Comparte tus datos y un asesor se pondrá en contacto contigo.</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Nombre completo" placeholderTextColor="#8A918D" style={styles.formInput} />
        <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="Correo electrónico" placeholderTextColor="#8A918D" style={styles.formInput} />
        <TextInput value={memberId} onChangeText={setMemberId} autoCapitalize="characters" placeholder="Número de afiliado (HI-123456)" placeholderTextColor="#8A918D" style={styles.formInput} />
        {errors.map((error) => <Text key={error} style={styles.errorText}>{error}</Text>)}
        {submitted ? <Text style={styles.successText}>Tu solicitud de afiliación está lista para revisión.</Text> : null}
        <Pressable style={styles.contactButton} onPress={submit}><Text style={styles.contactButtonText}>Enviar solicitud</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function CoberturassScreen({ navigation }: { navigation: any }) {
  const [query, setQuery] = useState('');
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  const favoriteCoberturass = useHealthStore((state) => state.favoriteCoberturass);
  const { data = [], isError, isFetching, isLoading, refetch } = useQuery({ queryKey: ['coverages'], queryFn: fetchCoberturass });
  const filtered = data.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View><Text style={styles.eyebrow}>RED DE ATENCION</Text><Text style={styles.title}>Coberturas</Text><Text style={styles.planHint}>Plan activo: {selectedPlan} · {favoriteCoberturass.length} favoritas</Text><TextInput value={query} onChangeText={setQuery} placeholder="Buscar servicio o IPS..." placeholderTextColor="#8A918D" style={styles.searchInput} /><Text style={styles.networkStatus}>{isFetching ? 'Actualizando cobertura...' : 'Datos sincronizados'}</Text></View>}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => void refetch()} tintColor="#008F5A" />}
        ListEmptyComponent={<Text style={styles.emptyText}>{isLoading ? 'Cargando coberturas...' : isError ? 'No se pudieron cargar las coberturas. Desliza para reintentar.' : 'No se encontraron coberturas.'}</Text>}
        renderItem={({ item }) => <Pressable style={styles.coverageCard} onPress={() => navigation.navigate('CoberturasDetail', { coverage: item })}><View style={styles.coverageCopy}><Text style={styles.coverageCategory}>{item.category}</Text><Text style={styles.coverageName}>{item.name}</Text><Text style={styles.coverageDetail}>{item.detail}</Text></View><Text style={styles.arrow}>›</Text></Pressable>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function DetailScreen({ route }: { route: { params: { coverage: Coberturas } } }) {
  const { coverage } = route.params;
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  return <SafeAreaView style={styles.safeArea}><View style={styles.detailContent}><Text style={styles.eyebrow}>{coverage.category.toUpperCase()}</Text><Text style={styles.detailTitle}>{coverage.name}</Text><Text style={styles.detailText}>{coverage.detail}</Text><View style={styles.infoCard}><Text style={styles.infoKicker}>PLAN ACTIVO: {selectedPlan.toUpperCase()}</Text><Text style={styles.infoTitle}>Incluido en tu plan</Text><Text style={styles.infoText}>Consulta la elegibilidad, la red de proveedores y los beneficios con un asesor.</Text></View></View></SafeAreaView>;
}

function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#008F5A', tabBarInactiveTintColor: '#8A918D' }}><Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} /><Tabs.Screen name="Coberturass" component={CoberturassScreen} options={{ title: 'Coberturas' }} /></Tabs.Navigator>;
}

export default function App() {
  const isAuthenticated = useHealthStore((state) => state.isAuthenticated);
  return <QueryClientProvider client={queryClient}><NavigationContainer><StatusBar style="dark" /><Stack.Navigator>{isAuthenticated ? <><Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} /><Stack.Screen name="CoberturasDetail" component={DetailScreen} options={{ title: 'Detalle de cobertura' }} /><Stack.Screen name="Enrollment" component={EnrollmentScreen} options={{ title: 'Afiliación' }} /></> : <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />}</Stack.Navigator></NavigationContainer></QueryClientProvider>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7FAF8' },
  homeContent: { flexGrow: 1, gap: 18, padding: 22 },
  listContent: { gap: 12, padding: 22, paddingBottom: 36 },
  detailContent: { gap: 18, padding: 22 },
  formContent: { flex: 1, gap: 14, padding: 22 },
  eyebrow: { color: '#008F5A', fontSize: 12, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#075E43', fontSize: 28, fontWeight: '800', marginTop: 7 },
  hero: { backgroundColor: '#DFF3E8', borderRadius: 22, gap: 12, padding: 22, marginTop: 10 },
  heroKicker: { color: '#008F5A', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: '#075E43', fontSize: 24, fontWeight: '800', lineHeight: 29 },
  heroText: { color: '#4E625E', fontSize: 14, lineHeight: 20 },
  sectionTitle: { color: '#075E43', fontSize: 21, fontWeight: '800' },
  actionCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 18 },
  actionTitle: { color: '#075E43', fontSize: 17, fontWeight: '800' },
  actionText: { color: '#68716E', fontSize: 13, marginTop: 5 },
  planHint: { color: '#008F5A', fontSize: 12, fontWeight: '700', marginTop: 10 },
  networkStatus: { color: '#77817E', fontSize: 11, marginTop: 10 },
  emptyText: { color: '#68716E', fontSize: 14, paddingVertical: 20, textAlign: 'center' },
  arrow: { color: '#008F5A', fontSize: 30, fontWeight: '300' },
  infoCard: { backgroundColor: '#075E43', borderRadius: 18, gap: 7, padding: 19 },
  infoKicker: { color: '#BDEBD3', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  infoTitle: { color: '#FFF9F2', fontSize: 21, fontWeight: '800' },
  infoText: { color: '#D8F0E3', fontSize: 13, lineHeight: 19 },
  searchInput: { backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 12, borderWidth: 1, color: '#075E43', fontSize: 14, marginTop: 18, padding: 14 },
  formInput: { backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 12, borderWidth: 1, color: '#075E43', fontSize: 15, padding: 14 },
  errorText: { color: '#B54232', fontSize: 12 },
  successText: { color: '#008F5A', fontSize: 13, fontWeight: '700' },
  contactButton: { alignSelf: 'flex-start', backgroundColor: '#F2C94C', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 12 },
  contactButtonText: { color: '#FFF9F2', fontSize: 13, fontWeight: '800' },
  signOutText: { color: '#008F5A', fontSize: 13, fontWeight: '800', textAlign: 'center' },
  coverageCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  coverageCopy: { flex: 1, gap: 4 },
  coverageCategory: { color: '#F2C94C', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  coverageName: { color: '#075E43', fontSize: 17, fontWeight: '800' },
  coverageDetail: { color: '#68716E', fontSize: 12, lineHeight: 17 },
  detailTitle: { color: '#075E43', fontSize: 32, fontWeight: '800' },
  detailText: { color: '#68716E', fontSize: 17, lineHeight: 26 },
});


