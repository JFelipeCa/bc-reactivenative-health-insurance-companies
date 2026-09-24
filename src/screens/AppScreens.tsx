import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useHealthStore } from '../store';

type Coberturas = { id: string; name: string; category: string; detail: string };
type RootStackParamList = { MainTabs: undefined; CoberturasDetail: { coverage: Coberturas } };
type TabParamList = { Home: undefined; coverages: undefined };

const coverages: Coberturas[] = [
  { id: '1', name: 'Medicina general', category: 'Consulta', detail: 'Citas presenciales y virtuales para cuidar tu salud.' },
  { id: '2', name: 'Medicina familiar', category: 'Consulta', detail: 'acompañamiento para todas las personas de tu hogar.' },
  { id: '3', name: 'pediatría', category: 'Especialidad', detail: 'Cuidado especializado para niños y adolescentes.' },
  { id: '4', name: 'Urgencias', category: 'atención inmediata', detail: 'Red disponible las 24 horas, todos los días.' },
  { id: '5', name: 'Telemedicina', category: 'Digital', detail: 'Habla con un profesional sin salir de casa.' },
  { id: '6', name: 'odontología', category: 'Bienestar', detail: 'prevención y tratamientos dentales.' },
  { id: '7', name: 'Salud mental', category: 'Bienestar', detail: 'psicología y acompañamiento emocional.' },
  { id: '8', name: 'Laboratorio', category: 'diagnóstico', detail: 'exámenes con tarifas preferenciales.' },
  { id: '9', name: 'Maternidad', category: 'Especialidad', detail: 'acompañamiento antes y después del parto.' },
  { id: '10', name: 'Chequeo anual', category: 'prevención', detail: 'Una revisión completa cada año.' },
];

const heroImage = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85';
const careImage = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85';

function coverageEmoji(coverage: Coberturas): string {
  const name = `${coverage.name} ${coverage.category}`.toLowerCase();
  if (name.includes('urgencia')) return String.fromCodePoint(0x1F691);
  if (name.includes('telemedicina')) return String.fromCodePoint(0x1F4F1);
  if (name.includes('odontologia')) return String.fromCodePoint(0x1F9B7);
  if (name.includes('mental') || name.includes('psicologia')) return String.fromCodePoint(0x1F9E0);
  if (name.includes('laboratorio')) return String.fromCodePoint(0x1F9EA);
  if (name.includes('maternidad')) return String.fromCodePoint(0x1F930);
  if (name.includes('pediatria')) return String.fromCodePoint(0x1F476);
  if (name.includes('familiar')) return String.fromCodePoint(0x1F46A);
  return String.fromCodePoint(0x1FA7A);
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function HomeScreen({ navigation }: { navigation: any }) {
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>{String.fromCodePoint(0x1F3E5)}  COBERTURA DE SALUD COLOMBIA</Text>
        <Text style={styles.title}>Tu cobertura de salud en Colombia.</Text>
        <ImageBackground source={{ uri: heroImage }} imageStyle={styles.heroImage} style={styles.hero}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroKicker}>{String.fromCodePoint(0x1F49A)}  SISTEMA DE SALUD COLOMBIANO</Text>
            <Text style={styles.heroTitle}>Compara planes, copagos y beneficios.</Text>
            <Text style={styles.heroText}>Consulta opciones de cobertura y redes EPS e IPS.</Text>
          </View>
        </ImageBackground>
        <Text style={styles.sectionTitle}>{String.fromCodePoint(0x2728)}  Accesos rapidos</Text>
        <Pressable style={styles.actionCard} onPress={() => navigation.navigate('coverages')}>
          <View><Text style={styles.actionTitle}>{String.fromCodePoint(0x1F50D)}  Explorar cobertura</Text><Text style={styles.actionText}>Consulta servicios y red IPS.</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
        <View style={styles.infoCard}><Text style={styles.infoKicker}>PLAN ACTIVO</Text><Text style={styles.infoTitle}>{selectedPlan}</Text><Text style={styles.infoText}>protección para tu hogar con copagos y red nacional.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function coveragesScreen({ navigation }: { navigation: any }) {
  const [query, setQuery] = useState('');
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  const favoritecoverages = useHealthStore((state) => state.favoritecoverages);
  const filtered = coverages.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View><ImageBackground source={{ uri: careImage }} imageStyle={styles.coverageHeroImage} style={styles.coverageHero}><Text style={styles.coverageHeroText}>{String.fromCodePoint(0x1F468, 0x200D, 0x2695, 0xFE0F)}  Cuidamos de ti y de tu familia</Text></ImageBackground><Text style={styles.eyebrow}>{String.fromCodePoint(0x1F3E5)}  RED DE ATENCION</Text><Text style={styles.title}>Coberturas</Text><Text style={styles.planHint}>Plan activo: {selectedPlan} · {favoritecoverages.length} favoritas</Text><TextInput value={query} onChangeText={setQuery} placeholder="Buscar servicio o IPS..." placeholderTextColor="#8A918D" style={styles.searchInput} /></View>}
        renderItem={({ item }) => <Pressable style={styles.coverageCard} onPress={() => navigation.navigate('CoberturasDetail', { coverage: item })}><View style={styles.coverageIcon}><Text style={styles.coverageEmoji}>{coverageEmoji(item)}</Text></View><View style={styles.coverageCopy}><Text style={styles.coverageCategory}>{item.category}</Text><Text style={styles.coverageName}>{item.name}</Text><Text style={styles.coverageDetail}>{item.detail}</Text></View><Text style={styles.arrow}>›</Text></Pressable>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function DetailScreen({ route }: { route: { params: { coverage: Coberturas } } }) {
  const { coverage } = route.params;
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  return <SafeAreaView style={styles.safeArea}><View style={styles.detailContent}><Text style={styles.eyebrow}>{coverage.category.toUpperCase()}</Text><Text style={styles.detailTitle}>{coverage.name}</Text><Text style={styles.detailText}>{coverage.detail}</Text><View style={styles.infoCard}><Text style={styles.infoKicker}>COBERTURA DE SALUD COLOMBIA</Text><Text style={styles.infoTitle}>Disponible en tu plan</Text><Text style={styles.infoText}>Consulta copago, red IPS y condiciones de atenci para este servicio.</Text></View></View></SafeAreaView>;
}

function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#008F5A', tabBarInactiveTintColor: '#8A918D' }}><Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} /><Tabs.Screen name="coverages" component={coveragesScreen} options={{ title: 'Coberturas' }} /></Tabs.Navigator>;
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
  hero: { backgroundColor: '#075E43', borderRadius: 22, height: 250, justifyContent: 'flex-end', marginTop: 10, overflow: 'hidden' },
  heroImage: { borderRadius: 22 },
  heroOverlay: { backgroundColor: 'rgba(3, 54, 39, 0.70)', gap: 12, padding: 22 },
  coverageHero: { backgroundColor: '#075E43', borderRadius: 20, height: 150, justifyContent: 'flex-end', marginBottom: 18, overflow: 'hidden' },
  coverageHeroImage: { borderRadius: 20 },
  coverageHeroText: { backgroundColor: 'rgba(3, 54, 39, 0.64)', color: 'white', fontSize: 18, fontWeight: '800', padding: 16 },
  heroKicker: { color: '#BDEBD3', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: '#FFF9F2', fontSize: 24, fontWeight: '800', lineHeight: 29 },
  heroText: { color: '#F0F7F2', fontSize: 14, lineHeight: 20 },
  sectionTitle: { color: '#075E43', fontSize: 21, fontWeight: '800' },
  actionCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 18 },
  actionTitle: { color: '#075E43', fontSize: 17, fontWeight: '800' },
  actionText: { color: '#68716E', fontSize: 13, marginTop: 5 },
  planHint: { color: '#008F5A', fontSize: 12, fontWeight: '700', marginTop: 10 },
  arrow: { color: '#008F5A', fontSize: 30, fontWeight: '300' },
  infoCard: { backgroundColor: '#075E43', borderRadius: 18, gap: 7, padding: 19 },
  infoKicker: { color: '#BDEBD3', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  infoTitle: { color: '#FFF9F2', fontSize: 21, fontWeight: '800' },
  infoText: { color: '#D8F0E3', fontSize: 13, lineHeight: 19 },
  searchInput: { backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 12, borderWidth: 1, color: '#075E43', fontSize: 14, marginTop: 18, padding: 14 },
  coverageCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  coverageIcon: { alignItems: 'center', backgroundColor: '#E3F4EA', borderRadius: 16, height: 54, justifyContent: 'center', marginRight: 13, width: 54 },
  coverageEmoji: { fontSize: 28 },
  coverageCopy: { flex: 1, gap: 4 },
  coverageCategory: { color: '#F2C94C', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  coverageName: { color: '#075E43', fontSize: 17, fontWeight: '800' },
  coverageDetail: { color: '#68716E', fontSize: 12, lineHeight: 17 },
  detailTitle: { color: '#075E43', fontSize: 32, fontWeight: '800' },
  detailText: { color: '#68716E', fontSize: 17, lineHeight: 26 },
});
