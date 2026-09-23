import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

type Coverage = { id: string; name: string; category: string; detail: string };
type RootStackParamList = { MainTabs: undefined; CoverageDetail: { coverage: Coverage } };
type TabParamList = { Home: undefined; Coverages: undefined };

const coverages: Coverage[] = [
  { id: '1', name: 'Consulta general', category: 'Consulta', detail: 'Citas presenciales y virtuales en tu red de atencion.' },
  { id: '2', name: 'Medicina familiar', category: 'Consulta', detail: 'Acompanamiento para todas las personas de tu hogar.' },
  { id: '3', name: 'Pediatria', category: 'Especialidad', detail: 'Cuidado especializado para ninos y adolescentes.' },
  { id: '4', name: 'Urgencias', category: 'Atencion inmediata', detail: 'Red disponible las 24 horas, todos los dias.' },
  { id: '5', name: 'Telemedicina', category: 'Digital', detail: 'Habla con un profesional sin salir de casa.' },
  { id: '6', name: 'Odontologia', category: 'Bienestar', detail: 'Prevencion y tratamientos dentales.' },
  { id: '7', name: 'Salud mental', category: 'Bienestar', detail: 'Psicologia y acompanamiento emocional.' },
  { id: '8', name: 'Laboratorio', category: 'Diagnostico', detail: 'Examenes con tarifas preferenciales.' },
  { id: '9', name: 'Maternidad', category: 'Especialidad', detail: 'Acompanamiento antes y despues del parto.' },
  { id: '10', name: 'Chequeo anual', category: 'Prevencion', detail: 'Una revision completa cada ano.' },
];

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.homeContent}>
        <View style={styles.brandRow}><View style={styles.brandMark}><Text style={styles.brandMarkText}>+</Text></View><Text style={styles.brandName}>HEALTH COVERAGE COLOMBIA</Text><Text style={styles.navLabel}>Inicio   Coberturas</Text></View>
        <Text style={styles.eyebrow}>SEGUROS DE SALUD</Text>
        <Text style={styles.title}>Tu cobertura de salud en Colombia.</Text>
        <View style={styles.hero}>
          <Text style={styles.heroKicker}>COLOMBIA · EPS + IPS</Text>
          <Text style={styles.heroTitle}>Compara planes, copagos y beneficios.</Text>
          <Text style={styles.heroText}>Consulta opciones de cobertura y redes de atencion.</Text>
        </View>
        <Text style={styles.sectionTitle}>Encuentra tu cobertura</Text>
        <Pressable style={styles.actionCard} onPress={() => navigation.navigate('Coverages')}>
          <View><Text style={styles.actionTitle}>Explorar cobertura</Text><Text style={styles.actionText}>Consulta servicios y red IPS.</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
        <View style={styles.benefits}><Text style={styles.sectionTitle}>Beneficios esenciales</Text><View style={styles.benefitRow}><Text style={styles.benefitPill}>✓ Medicina general</Text><Text style={styles.benefitPill}>✓ Urgencias 24/7</Text><Text style={styles.benefitPill}>✓ Telemedicina</Text></View></View>
      </View>
    </SafeAreaView>
  );
}

function CoveragesScreen({ navigation }: { navigation: any }) {
  const [query, setQuery] = useState('');
  const filtered = coverages.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View><Text style={styles.eyebrow}>RED DE ATENCION</Text><Text style={styles.title}>Coberturas</Text><TextInput value={query} onChangeText={setQuery} placeholder="Buscar servicio o IPS..." placeholderTextColor="#8A918D" style={styles.searchInput} /></View>}
        renderItem={({ item }) => <Pressable style={styles.coverageCard} onPress={() => navigation.navigate('CoverageDetail', { coverage: item })}><View style={styles.coverageCopy}><Text style={styles.coverageCategory}>{item.category}</Text><Text style={styles.coverageName}>{item.name}</Text><Text style={styles.coverageDetail}>{item.detail}</Text></View><Text style={styles.arrow}>›</Text></Pressable>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function DetailScreen({ route }: { route: { params: { coverage: Coverage } } }) {
  const { coverage } = route.params;
  return <SafeAreaView style={styles.safeArea}><View style={styles.detailContent}><Text style={styles.eyebrow}>{coverage.category.toUpperCase()}</Text><Text style={styles.detailTitle}>{coverage.name}</Text><Text style={styles.detailText}>{coverage.detail}</Text><View style={styles.infoCard}><Text style={styles.infoKicker}>HEALTH COVERAGE COLOMBIA</Text><Text style={styles.infoTitle}>Disponible en tu plan</Text><Text style={styles.infoText}>Consulta copago, red IPS y condiciones de atencion para este servicio.</Text></View></View></SafeAreaView>;
}

function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#1E6F63', tabBarInactiveTintColor: '#8A918D' }}><Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} /><Tabs.Screen name="Coverages" component={CoveragesScreen} options={{ title: 'Cobertura' }} /></Tabs.Navigator>;
}

export default function App() {
  return <NavigationContainer><StatusBar style="dark" /><Stack.Navigator><Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} /><Stack.Screen name="CoverageDetail" component={DetailScreen} options={{ title: 'Detalle' }} /></Stack.Navigator></NavigationContainer>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F3EE' },
  homeContent: { flex: 1, gap: 18, padding: 22 },
  listContent: { gap: 12, padding: 22, paddingBottom: 36 },
  detailContent: { gap: 18, padding: 22 },
  eyebrow: { color: '#1E6F63', fontSize: 12, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#263B54', fontSize: 28, fontWeight: '800', marginTop: 7 },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 8 },
  brandMark: { alignItems: 'center', backgroundColor: '#009B63', borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  brandMarkText: { color: '#FFFFFF', fontSize: 21, fontWeight: '800' },
  brandName: { color: '#173B35', flex: 1, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  navLabel: { color: '#63736E', fontSize: 9 },
  hero: { backgroundColor: '#008F5B', borderRadius: 22, gap: 12, padding: 22, marginTop: 10 },
  heroKicker: { color: '#D6F5E8', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', lineHeight: 29 },
  heroText: { color: '#E3FFF2', fontSize: 14, lineHeight: 20 },
  sectionTitle: { color: '#263B54', fontSize: 21, fontWeight: '800' },
  actionCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#DDE8E2', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 18 },
  actionTitle: { color: '#263B54', fontSize: 17, fontWeight: '800' },
  actionText: { color: '#68716E', fontSize: 13, marginTop: 5 },
  arrow: { color: '#1E6F63', fontSize: 30, fontWeight: '300' },
  benefits: { gap: 10 },
  benefitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  benefitPill: { backgroundColor: '#FFF2B8', borderRadius: 18, color: '#35564B', fontSize: 12, fontWeight: '700', paddingHorizontal: 12, paddingVertical: 9 },
  infoCard: { backgroundColor: '#263B54', borderRadius: 18, gap: 7, padding: 19 },
  infoKicker: { color: '#B8DACA', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  infoTitle: { color: '#FFF9F2', fontSize: 21, fontWeight: '800' },
  infoText: { color: '#D6E1DD', fontSize: 13, lineHeight: 19 },
  searchInput: { backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 12, borderWidth: 1, color: '#263B54', fontSize: 14, marginTop: 18, padding: 14 },
  coverageCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  coverageCopy: { flex: 1, gap: 4 },
  coverageCategory: { color: '#D86A3B', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  coverageName: { color: '#263B54', fontSize: 17, fontWeight: '800' },
  coverageDetail: { color: '#68716E', fontSize: 12, lineHeight: 17 },
  detailTitle: { color: '#263B54', fontSize: 32, fontWeight: '800' },
  detailText: { color: '#68716E', fontSize: 17, lineHeight: 26 },
});
