import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, KeyboardAvoidingView, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { fetchCoverages } from './src/api';
import { useHealthStore } from './src/store';

type Coverage = { id: string; name: string; category: string; detail: string };
type RootStackParamList = { Auth: undefined; MainTabs: undefined; CoverageDetail: { coverage: Coverage }; Enrollment: undefined };
type TabParamList = { Home: undefined; Coverages: undefined };

const coverages: Coverage[] = [
  { id: '1', name: 'General medicine', category: 'Consultation', detail: 'In-person and virtual appointments for your health.' },
  { id: '2', name: 'Family medicine', category: 'Consultation', detail: 'Care for everyone in your household.' },
  { id: '3', name: 'Pediatrics', category: 'Specialty', detail: 'Specialized care for children and teenagers.' },
  { id: '4', name: 'Emergency care', category: 'Immediate care', detail: 'A provider network available around the clock.' },
  { id: '5', name: 'Telemedicine', category: 'Digital', detail: 'Talk to a healthcare professional from home.' },
  { id: '6', name: 'Dental care', category: 'Wellness', detail: 'Preventive and restorative dental services.' },
  { id: '7', name: 'Mental health', category: 'Wellness', detail: 'Counseling and emotional support.' },
  { id: '8', name: 'Laboratory services', category: 'Diagnostics', detail: 'Tests with preferred provider rates.' },
  { id: '9', name: 'Maternity care', category: 'Specialty', detail: 'Support before and after delivery.' },
  { id: '10', name: 'Annual checkup', category: 'Prevention', detail: 'A complete health review every year.' },
];

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();
const queryClient = new QueryClient();

function HomeScreen({ navigation }: { navigation: any }) {
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  const signOut = useHealthStore((state) => state.signOut);
  const entrance = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entrance, { toValue: 1, duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [entrance, slide]);

  const animatedStyle = { opacity: entrance, transform: [{ translateY: slide }] };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.homeContent}>
        <Text style={styles.eyebrow}>HEALTH COVERAGE COLOMBIA</Text>
        <Text style={styles.title}>Tu cobertura de salud en Colombia.</Text>
        <Animated.View style={[styles.hero, animatedStyle]}>
          <Text style={styles.heroKicker}>SISTEMA DE SALUD COLOMBIANO</Text>
          <Text style={styles.heroTitle}>Compara planes, copagos y beneficios.</Text>
          <Text style={styles.heroText}>Consulta opciones de cobertura y redes EPS e IPS.</Text>
        </Animated.View>
        <Text style={styles.sectionTitle}>Quick access</Text>
        <Animated.View style={animatedStyle}><Pressable style={styles.actionCard} onPress={() => navigation.navigate('Coverages')}>
          <View><Text style={styles.actionTitle}>Explore coverage</Text><Text style={styles.actionText}>Browse services by category.</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable></Animated.View>
        <Animated.View style={animatedStyle}><Pressable style={styles.actionCard} onPress={() => navigation.navigate('Enrollment')}>
          <View><Text style={styles.actionTitle}>Request enrollment</Text><Text style={styles.actionText}>Submit your member information.</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable></Animated.View>
        <View style={styles.infoCard}><Text style={styles.infoKicker}>PLAN ACTIVO</Text><Text style={styles.infoTitle}>{selectedPlan}</Text><Text style={styles.infoText}>Proteccion para tu hogar con copagos y red nacional. Tu preferencia se guarda localmente.</Text></View>
        <Pressable onPress={signOut}><Text style={styles.signOutText}>Sign out</Text></Pressable>
      </View>
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
      setError('Enter a valid email and a password with at least 8 characters.');
      return;
    }
    setError('');
    signIn();
  };

  return <SafeAreaView style={styles.safeArea}><View style={styles.formContent}><Text style={styles.eyebrow}>MEMBER ACCESS</Text><Text style={styles.title}>Sign in to your coverage</Text><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="Email address" placeholderTextColor="#8A918D" style={styles.formInput} /><TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" placeholderTextColor="#8A918D" style={styles.formInput} />{error ? <Text style={styles.errorText}>{error}</Text> : null}<Pressable style={styles.contactButton} onPress={submit}><Text style={styles.contactButtonText}>Sign in</Text></Pressable></View></SafeAreaView>;
}

function EnrollmentScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [memberId, setMemberId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const submit = () => {
    const nextErrors: string[] = [];
    if (name.trim().length < 2) nextErrors.push('Enter your full name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.push('Enter a valid email address.');
    if (!/^HI-\d{6}$/.test(memberId.trim())) nextErrors.push('Use a member ID such as HI-123456.');
    setErrors(nextErrors);
    setSubmitted(nextErrors.length === 0);
  };

  return (
    <KeyboardAvoidingView style={styles.safeArea} behavior="padding">
      <View style={styles.formContent}>
        <Text style={styles.eyebrow}>MEMBER ENROLLMENT</Text>
        <Text style={styles.title}>Request coverage</Text>
        <Text style={styles.detailText}>Share your details and a representative will contact you.</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor="#8A918D" style={styles.formInput} />
        <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="Email address" placeholderTextColor="#8A918D" style={styles.formInput} />
        <TextInput value={memberId} onChangeText={setMemberId} autoCapitalize="characters" placeholder="Member ID (HI-123456)" placeholderTextColor="#8A918D" style={styles.formInput} />
        {errors.map((error) => <Text key={error} style={styles.errorText}>{error}</Text>)}
        {submitted ? <Text style={styles.successText}>Your enrollment request is ready to review.</Text> : null}
        <Pressable style={styles.contactButton} onPress={submit}><Text style={styles.contactButtonText}>Submit request</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function CoveragesScreen({ navigation }: { navigation: any }) {
  const [query, setQuery] = useState('');
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  const favoriteCoverages = useHealthStore((state) => state.favoriteCoverages);
  const { data = [], isError, isFetching, isLoading, refetch } = useQuery({ queryKey: ['coverages'], queryFn: fetchCoverages });
  const filtered = data.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View><Text style={styles.eyebrow}>RED DE ATENCION</Text><Text style={styles.title}>Coberturas</Text><Text style={styles.planHint}>Plan activo: {selectedPlan} · {favoriteCoverages.length} favoritas</Text><TextInput value={query} onChangeText={setQuery} placeholder="Buscar servicio o IPS..." placeholderTextColor="#8A918D" style={styles.searchInput} /><Text style={styles.networkStatus}>{isFetching ? 'Actualizando cobertura...' : 'Datos sincronizados'}</Text></View>}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => void refetch()} tintColor="#1E6F63" />}
        ListEmptyComponent={<Text style={styles.emptyText}>{isLoading ? 'Loading coverage...' : isError ? 'Coverage could not be loaded. Pull to retry.' : 'No coverage found.'}</Text>}
        renderItem={({ item }) => <Pressable style={styles.coverageCard} onPress={() => navigation.navigate('CoverageDetail', { coverage: item })}><View style={styles.coverageCopy}><Text style={styles.coverageCategory}>{item.category}</Text><Text style={styles.coverageName}>{item.name}</Text><Text style={styles.coverageDetail}>{item.detail}</Text></View><Text style={styles.arrow}>›</Text></Pressable>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function DetailScreen({ route }: { route: { params: { coverage: Coverage } } }) {
  const { coverage } = route.params;
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  return <SafeAreaView style={styles.safeArea}><View style={styles.detailContent}><Text style={styles.eyebrow}>{coverage.category.toUpperCase()}</Text><Text style={styles.detailTitle}>{coverage.name}</Text><Text style={styles.detailText}>{coverage.detail}</Text><View style={styles.infoCard}><Text style={styles.infoKicker}>ACTIVE PLAN: {selectedPlan.toUpperCase()}</Text><Text style={styles.infoTitle}>Included in your plan</Text><Text style={styles.infoText}>Review eligibility, provider network, and benefits with your insurance representative.</Text></View></View></SafeAreaView>;
}

function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#1E6F63', tabBarInactiveTintColor: '#8A918D' }}><Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} /><Tabs.Screen name="Coverages" component={CoveragesScreen} options={{ title: 'Coverage' }} /></Tabs.Navigator>;
}

export default function App() {
  const isAuthenticated = useHealthStore((state) => state.isAuthenticated);
  return <QueryClientProvider client={queryClient}><NavigationContainer><StatusBar style="dark" /><Stack.Navigator>{isAuthenticated ? <><Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} /><Stack.Screen name="CoverageDetail" component={DetailScreen} options={{ title: 'Coverage detail' }} /><Stack.Screen name="Enrollment" component={EnrollmentScreen} options={{ title: 'Enrollment' }} /></> : <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />}</Stack.Navigator></NavigationContainer></QueryClientProvider>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F3EE' },
  homeContent: { flex: 1, gap: 18, padding: 22 },
  listContent: { gap: 12, padding: 22, paddingBottom: 36 },
  detailContent: { gap: 18, padding: 22 },
  formContent: { flex: 1, gap: 14, padding: 22 },
  eyebrow: { color: '#1E6F63', fontSize: 12, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#263B54', fontSize: 28, fontWeight: '800', marginTop: 7 },
  hero: { backgroundColor: '#DDEDE5', borderRadius: 22, gap: 12, padding: 22, marginTop: 10 },
  heroKicker: { color: '#1E6F63', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: '#263B54', fontSize: 24, fontWeight: '800', lineHeight: 29 },
  heroText: { color: '#4E625E', fontSize: 14, lineHeight: 20 },
  sectionTitle: { color: '#263B54', fontSize: 21, fontWeight: '800' },
  actionCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 18 },
  actionTitle: { color: '#263B54', fontSize: 17, fontWeight: '800' },
  actionText: { color: '#68716E', fontSize: 13, marginTop: 5 },
  planHint: { color: '#1E6F63', fontSize: 12, fontWeight: '700', marginTop: 10 },
  networkStatus: { color: '#77817E', fontSize: 11, marginTop: 10 },
  emptyText: { color: '#68716E', fontSize: 14, paddingVertical: 20, textAlign: 'center' },
  arrow: { color: '#1E6F63', fontSize: 30, fontWeight: '300' },
  infoCard: { backgroundColor: '#263B54', borderRadius: 18, gap: 7, padding: 19 },
  infoKicker: { color: '#B8DACA', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  infoTitle: { color: '#FFF9F2', fontSize: 21, fontWeight: '800' },
  infoText: { color: '#D6E1DD', fontSize: 13, lineHeight: 19 },
  searchInput: { backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 12, borderWidth: 1, color: '#263B54', fontSize: 14, marginTop: 18, padding: 14 },
  formInput: { backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 12, borderWidth: 1, color: '#263B54', fontSize: 15, padding: 14 },
  errorText: { color: '#B54232', fontSize: 12 },
  successText: { color: '#1E6F63', fontSize: 13, fontWeight: '700' },
  contactButton: { alignSelf: 'flex-start', backgroundColor: '#D86A3B', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 12 },
  contactButtonText: { color: '#FFF9F2', fontSize: 13, fontWeight: '800' },
  signOutText: { color: '#1E6F63', fontSize: 13, fontWeight: '800', textAlign: 'center' },
  coverageCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  coverageCopy: { flex: 1, gap: 4 },
  coverageCategory: { color: '#D86A3B', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  coverageName: { color: '#263B54', fontSize: 17, fontWeight: '800' },
  coverageDetail: { color: '#68716E', fontSize: 12, lineHeight: 17 },
  detailTitle: { color: '#263B54', fontSize: 32, fontWeight: '800' },
  detailText: { color: '#68716E', fontSize: 17, lineHeight: 26 },
});
