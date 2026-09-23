import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { fetchCoverages } from './src/api';
import { useHealthStore } from './src/store';

type Coverage = { id: string; name: string; category: string; detail: string };
type RootStackParamList = { MainTabs: undefined; CoverageDetail: { coverage: Coverage } };
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
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.homeContent}>
        <Text style={styles.eyebrow}>HEALTH COVERAGE COLOMBIA</Text>
        <Text style={styles.title}>Tu cobertura de salud en Colombia.</Text>
        <View style={styles.hero}>
          <Text style={styles.heroKicker}>SISTEMA DE SALUD COLOMBIANO</Text>
          <Text style={styles.heroTitle}>Compara planes, copagos y beneficios.</Text>
          <Text style={styles.heroText}>Consulta opciones de cobertura y redes EPS e IPS.</Text>
        </View>
        <Text style={styles.sectionTitle}>Quick access</Text>
        <Pressable style={styles.actionCard} onPress={() => navigation.navigate('Coverages')}>
          <View><Text style={styles.actionTitle}>Explore coverage</Text><Text style={styles.actionText}>Browse services by category.</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
        <View style={styles.infoCard}><Text style={styles.infoKicker}>ACTIVE PLAN</Text><Text style={styles.infoTitle}>{selectedPlan}</Text><Text style={styles.infoText}>Balanced protection for your everyday health needs.</Text></View>
      </View>
    </SafeAreaView>
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
        ListHeaderComponent={<View><Text style={styles.eyebrow}>YOUR BENEFITS</Text><Text style={styles.title}>Coverage</Text><Text style={styles.planHint}>Active plan: {selectedPlan} · {favoriteCoverages.length} favorites</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search coverage..." placeholderTextColor="#8A918D" style={styles.searchInput} /><Text style={styles.networkStatus}>{isFetching ? 'Updating coverage...' : 'Data synchronized'}</Text></View>}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => void refetch()} tintColor="#008F5A" />}
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
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#008F5A', tabBarInactiveTintColor: '#8A918D' }}><Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} /><Tabs.Screen name="Coverages" component={CoveragesScreen} options={{ title: 'Coverage' }} /></Tabs.Navigator>;
}

export default function App() {
  return <QueryClientProvider client={queryClient}><NavigationContainer><StatusBar style="dark" /><Stack.Navigator><Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} /><Stack.Screen name="CoverageDetail" component={DetailScreen} options={{ title: 'Detalle' }} /></Stack.Navigator></NavigationContainer></QueryClientProvider>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7FAF8' },
  homeContent: { flex: 1, gap: 18, padding: 22 },
  listContent: { gap: 12, padding: 22, paddingBottom: 36 },
  detailContent: { gap: 18, padding: 22 },
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
  coverageCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  coverageCopy: { flex: 1, gap: 4 },
  coverageCategory: { color: '#F2C94C', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  coverageName: { color: '#075E43', fontSize: 17, fontWeight: '800' },
  coverageDetail: { color: '#68716E', fontSize: 12, lineHeight: 17 },
  detailTitle: { color: '#075E43', fontSize: 32, fontWeight: '800' },
  detailText: { color: '#68716E', fontSize: 17, lineHeight: 26 },
});
