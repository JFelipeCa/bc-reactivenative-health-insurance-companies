import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type Coberturas = { id: string; name: string; category: string; detail: string };
type RootStackParamList = { MainTabs: undefined; CoberturasDetail: { coverage: Coberturas } };
type TabParamList = { Home: undefined; Coberturass: undefined };

const coverages: Coberturas[] = [
  { id: '1', name: 'Consulta general', category: 'Consulta', detail: 'Citas presenciales y virtuales en tu red de atencion.' },
  { id: '2', name: 'Medicina familiar', category: 'Consulta', detail: 'acompañamiento para todas las personas de tu hogar.' },
  { id: '3', name: 'pediatría', category: 'Especialidad', detail: 'Cuidado especializado para niños y adolescentes.' },
  { id: '4', name: 'Urgencias', category: 'atención inmediata', detail: 'Red disponible las 24 horas, todos los días.' },
  { id: '5', name: 'Telemedicina', category: 'Digital', detail: 'Habla con un profesional sin salir de casa.' },
  { id: '6', name: 'odontología', category: 'Bienestar', detail: 'prevención y tratamientos dentales.' },
  { id: '7', name: 'Salud mental', category: 'Bienestar', detail: 'Psicologia y acompanamiento emocional.' },
  { id: '8', name: 'Laboratorio', category: 'Diagnostico', detail: 'Examenes con tarifas preferenciales.' },
  { id: '9', name: 'Maternidad', category: 'Especialidad', detail: 'acompañamiento antes y despues del parto.' },
  { id: '10', name: 'Chequeo anual', category: 'prevención', detail: 'Una revision completa cada ano.' },
];

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}><View style={styles.brandMark}><Text style={styles.brandMarkText}>+</Text></View><Text style={styles.brandName}>COBERTURA DE SALUD COLOMBIA</Text><Text style={styles.navLabel}>Inicio   Coberturas</Text></View>
        <Text style={styles.eyebrow}>SEGUROS DE SALUD</Text>
        <Text style={styles.title}>Tu cobertura de salud en Colombia.</Text>
        <View style={styles.hero}>
          <Text style={styles.heroKicker}>COLOMBIA · EPS + IPS</Text>
          <Text style={styles.heroTitle}>Compara planes, copagos y beneficios.</Text>
          <Text style={styles.heroText}>Consulta opciones de cobertura y redes de atencion.</Text>
        </View>
        <Text style={styles.sectionTitle}>Encuentra tu cobertura</Text>
        <Pressable style={styles.actionCard} onPress={() => navigation.navigate('Coberturass')}>
          <View><Text style={styles.actionTitle}>Explorar cobertura</Text><Text style={styles.actionText}>Consulta servicios y red IPS.</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
        <View style={styles.benefits}><Text style={styles.sectionTitle}>Beneficios esenciales</Text><View style={styles.benefitRow}><Text style={styles.benefitPill}>Ã¢Å“â€œ Medicina general</Text><Text style={styles.benefitPill}>Ã¢Å“â€œ Urgencias 24/7</Text><Text style={styles.benefitPill}>Ã¢Å“â€œ Telemedicina</Text></View></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CoberturassScreen({ navigation }: { navigation: any }) {
  const [query, setQuery] = useState('');
  const filtered = coverages.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View><Text style={styles.eyebrow}>RED DE ATENCION</Text><Text style={styles.title}>Coberturas</Text><TextInput value={query} onChangeText={setQuery} placeholder="Buscar servicio o IPS..." placeholderTextColor="#8A918D" style={styles.searchInput} /></View>}
        renderItem={({ item }) => <Pressable style={styles.coverageCard} onPress={() => navigation.navigate('CoberturasDetail', { coverage: item })}><View style={styles.coverageCopy}><Text style={styles.coverageCategory}>{item.category}</Text><Text style={styles.coverageName}>{item.name}</Text><Text style={styles.coverageDetail}>{item.detail}</Text></View><Text style={styles.arrow}>›</Text></Pressable>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function DetailScreen({ route }: { route: { params: { coverage: Coberturas } } }) {
  const { coverage } = route.params;
  return <SafeAreaView style={styles.safeArea}><View style={styles.detailContent}><Text style={styles.eyebrow}>{coverage.category.toUpperCase()}</Text><Text style={styles.detailTitle}>{coverage.name}</Text><Text style={styles.detailText}>{coverage.detail}</Text><View style={styles.infoCard}><Text style={styles.infoKicker}>COBERTURA DE SALUD COLOMBIA</Text><Text style={styles.infoTitle}>Disponible en tu plan</Text><Text style={styles.infoText}>Consulta copago, red IPS y condiciones de atencion para este servicio.</Text></View></View></SafeAreaView>;
}

function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#008F5A', tabBarInactiveTintColor: '#8A918D' }}><Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} /><Tabs.Screen name="Coberturass" component={CoberturassScreen} options={{ title: 'Cobertura' }} /></Tabs.Navigator>;
}

export default function App() {
  return <NavigationContainer><StatusBar style="dark" /><Stack.Navigator><Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} /><Stack.Screen name="CoberturasDetail" component={DetailScreen} options={{ title: 'Detalle' }} /></Stack.Navigator></NavigationContainer>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7FAF8' },
  homeContent: { flexGrow: 1, gap: 18, padding: 22 },
  listContent: { gap: 12, padding: 22, paddingBottom: 36 },
  detailContent: { gap: 18, padding: 22 },
  eyebrow: { color: '#008F5A', fontSize: 12, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#075E43', fontSize: 28, fontWeight: '800', marginTop: 7 },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 8 },
  brandMark: { alignItems: 'center', backgroundColor: '#009B63', borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  brandMarkText: { color: '#FFFFFF', fontSize: 21, fontWeight: '800' },
  brandName: { color: '#173B35', flex: 1, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  navLabel: { color: '#63736E', fontSize: 9 },
  hero: { backgroundColor: '#008F5B', borderRadius: 22, gap: 12, padding: 22, marginTop: 10 },
  heroKicker: { color: '#D6F5E8', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', lineHeight: 29 },
  heroText: { color: '#E3FFF2', fontSize: 14, lineHeight: 20 },
  sectionTitle: { color: '#075E43', fontSize: 21, fontWeight: '800' },
  actionCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#DDE8E2', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 18 },
  actionTitle: { color: '#075E43', fontSize: 17, fontWeight: '800' },
  actionText: { color: '#68716E', fontSize: 13, marginTop: 5 },
  arrow: { color: '#008F5A', fontSize: 30, fontWeight: '300' },
  benefits: { gap: 10 },
  benefitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  benefitPill: { backgroundColor: '#FFF2B8', borderRadius: 18, color: '#35564B', fontSize: 12, fontWeight: '700', paddingHorizontal: 12, paddingVertical: 9 },
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


