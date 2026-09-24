import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Plan = {
  id: string;
  name: string;
  price: string;
  accent: string;
  description: string;
  benefits: string[];
};

type Coberturas = {
  id: string;
  name: string;
  category: string;
  detail: string;
  icon: string;
};

const plans: Plan[] = [
  { id: 'individual', name: 'Individual', price: '$89.900 COP / mes', accent: '#008F5A', description: 'Cobertura base para tus necesidades de salud en Colombia.', benefits: ['Consulta general', 'Red de urgencias', 'Telemedicina 24/7'] },
  { id: 'familiar', name: 'Familiar', price: '$159.900 COP / mes', accent: '#F2C94C', description: 'protección para tu hogar con acceso a una red nacional.', benefits: ['Consulta general', 'pediatría incluida', 'atención odontologica'] },
  { id: 'preferente', name: 'Preferente', price: '$249.900 COP / mes', accent: '#075E43', description: 'Acceso preferente a especialistas y servicios complementarios.', benefits: ['Habitacion individual', 'Especialistas', 'Chequeo anual'] },
];

const coverages: Coberturas[] = [
  { id: '1', name: 'Consulta general', category: 'Consulta', detail: 'Citas presenciales y virtuales en tu red de atención.', icon: '+' },
  { id: '2', name: 'Medicina familiar', category: 'Consulta', detail: 'acompañamiento para todos los miembros del hogar.', icon: '•' },
  { id: '3', name: 'pediatría', category: 'Especialidad', detail: 'atención especializada para niños y adolescentes.', icon: '♥' },
  { id: '4', name: 'Urgencias', category: 'atención inmediata', detail: 'Red IPS disponible las 24 horas.', icon: '+' },
  { id: '5', name: 'Telemedicina', category: 'Digital', detail: 'Consulta desde casa con profesionales de tu red.', icon: 'o' },
  { id: '6', name: 'odontología', category: 'Bienestar', detail: 'prevención y tratamientos con copago informado.', icon: '◇' },
  { id: '7', name: 'Salud mental', category: 'Bienestar', detail: 'psicología y acompañamiento emocional.', icon: 'o' },
  { id: '8', name: 'Laboratorio clinico', category: 'diagnóstico', detail: 'exámenes en IPS autorizadas.', icon: '#' },
  { id: '9', name: 'Maternidad', category: 'Especialidad', detail: 'acompañamiento antes y después del parto.', icon: '♥' },
  { id: '10', name: 'Chequeo anual', category: 'prevención', detail: 'revisión completa con tu red de atención.', icon: '✓' },
];

export default function HomeScreen() {
  const [selectedPlan, setSelectedPlan] = useState('familiar');
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const activePlan = plans.find((plan) => plan.id === selectedPlan) ?? plans[1];
  const normalizedQuery = query.trim().toLowerCase();
  const filteredcoverages = coverages.filter((coverage) =>
    `${coverage.name} ${coverage.category} ${coverage.detail}`.toLowerCase().includes(normalizedQuery),
  );

  const refreshcoverages = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        contentContainerStyle={styles.content}
        data={filteredcoverages}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshcoverages} tintColor="#008F5A" />}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>COBERTURA DE SALUD COLOMBIA</Text>
                <Text style={styles.title}>Tu cobertura de salud en Colombia.</Text>
              </View>
              <View style={styles.headerMark}><Text style={styles.headerMarkText}>+</Text></View>
            </View>
            <View style={styles.hero}>
              <View style={styles.heroCopy}>
                <Text style={styles.heroKicker}>SISTEMA DE SALUD COLOMBIANO</Text>
                <Text style={styles.heroTitle}>Compara planes, copagos y beneficios.</Text>
                <Text style={styles.heroText}>Consulta opciones de cobertura y redes EPS e IPS.</Text>
              </View>
              <Image
                accessibilityLabel="Familia durante una consulta de salud"
                source={{ uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500' }}
                style={styles.heroImage}
              />
            </View>
            <View style={styles.sectionHeading}>
              <View><Text style={styles.sectionEyebrow}>OPCIONES DE COBERTURA</Text><Text style={styles.sectionTitle}>Planes de salud</Text></View>
              <Text style={styles.counter}>03 opciones</Text>
            </View>
            <View style={styles.planList}>
              {plans.map((plan) => {
                const isSelected = plan.id === selectedPlan;
                return (
                  <Pressable key={plan.id} accessibilityRole="button" accessibilityState={{ selected: isSelected }} onPress={() => setSelectedPlan(plan.id)} style={[styles.planCard, isSelected && styles.planCardSelected]}>
                    <View style={[styles.planAccent, { backgroundColor: plan.accent }]} />
                    <View style={styles.planBody}>
                      <View style={styles.planTopline}><Text style={styles.planName}>{plan.name}</Text>{isSelected ? <Text style={styles.selectedLabel}>SELECCIONADO</Text> : null}</View>
                      <Text style={styles.planPrice}>{plan.price}</Text>
                      <Text style={styles.planDescription}>{plan.description}</Text>
                      <View style={styles.benefitRow}>{plan.benefits.map((benefit) => <Text key={benefit} style={styles.benefit}>{`• ${benefit}`}</Text>)}</View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.coverageHeading}>
              <View><Text style={styles.sectionEyebrow}>RED DE atención</Text><Text style={styles.sectionTitle}>Servicios incluidos</Text></View>
              <Text style={styles.counter}>{filteredcoverages.length} resultados</Text>
            </View>
            <TextInput accessibilityLabel="Buscar cobertura" onChangeText={setQuery} placeholder="Busca medicina, urgencias..." placeholderTextColor="#8A918D" style={styles.searchInput} value={query} />
          </View>
        }
        ListEmptyComponent={<Text style={styles.emptyText}>No encontramos una cobertura con ese nombre.</Text>}
        renderItem={({ item }) => (
          <View style={styles.coverageCard}>
            <View style={styles.coverageIcon}><Text style={styles.coverageIconText}>{item.icon}</Text></View>
            <View style={styles.coverageCopy}><Text style={styles.coverageCategory}>{item.category}</Text><Text style={styles.coverageName}>{item.name}</Text><Text style={styles.coverageDetail}>{item.detail}</Text></View>
            <Text style={styles.coverageArrow}>›</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.summary}>
            <View><Text style={styles.summaryEyebrow}>PLAN SELECCIONADO</Text><Text style={styles.summaryTitle}>{activePlan.name}</Text><Text style={styles.summaryText}>Consulta copagos, red IPS y condiciones de atención para este plan.</Text></View>
            <TouchableOpacity accessibilityRole="button" style={styles.contactButton} onPress={() => undefined}><Text style={styles.contactButtonText}>Consultar plan</Text></TouchableOpacity>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7FAF8' },
  content: { padding: 22, paddingBottom: 36, gap: 12 },
  headerContent: { gap: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { color: '#008F5A', fontSize: 12, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#075E43', fontSize: 25, fontWeight: '800', marginTop: 7, maxWidth: 280 },
  headerMark: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F2C94C', alignItems: 'center', justifyContent: 'center' },
  headerMarkText: { color: '#FFF9F2', fontSize: 27, fontWeight: '300' },
  hero: { backgroundColor: '#DFF3E8', borderRadius: 22, overflow: 'hidden', minHeight: 220, flexDirection: 'row' },
  heroCopy: { flex: 1, padding: 20, justifyContent: 'center' },
  heroKicker: { color: '#008F5A', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: '#075E43', fontSize: 23, lineHeight: 28, fontWeight: '800', marginTop: 10 },
  heroText: { color: '#4E625E', fontSize: 13, lineHeight: 19, marginTop: 10 },
  heroImage: { width: 116, height: '100%', minHeight: 220 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  coverageHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 2 },
  sectionEyebrow: { color: '#F2C94C', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
  sectionTitle: { color: '#075E43', fontSize: 24, fontWeight: '800', marginTop: 4 },
  counter: { color: '#77817E', fontSize: 12, paddingBottom: 3 },
  planList: { gap: 12 },
  planCard: { flexDirection: 'row', backgroundColor: '#FFFCF8', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E9E4DC' },
  planCardSelected: { borderColor: '#008F5A', borderWidth: 2 },
  planAccent: { width: 7 },
  planBody: { flex: 1, padding: 15 },
  planTopline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planName: { color: '#075E43', fontSize: 19, fontWeight: '800' },
  selectedLabel: { color: '#008F5A', fontSize: 9, fontWeight: '800' },
  planPrice: { color: '#F2C94C', fontSize: 14, fontWeight: '800', marginTop: 4 },
  planDescription: { color: '#68716E', fontSize: 12, lineHeight: 17, marginTop: 7 },
  benefitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 11 },
  benefit: { color: '#4E625E', fontSize: 11 },
  searchInput: { backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 12, borderWidth: 1, color: '#075E43', fontSize: 14, paddingHorizontal: 15, paddingVertical: 13 },
  coverageCard: { alignItems: 'center', backgroundColor: '#FFFCF8', borderColor: '#E9E4DC', borderRadius: 16, borderWidth: 1, flexDirection: 'row', marginBottom: 10, padding: 14 },
  coverageIcon: { alignItems: 'center', backgroundColor: '#EAF7F3', borderRadius: 12, height: 44, justifyContent: 'center', width: 44 },
  coverageIconText: { color: '#008F5A', fontSize: 22 },
  coverageCopy: { flex: 1, marginLeft: 12 },
  coverageCategory: { color: '#F2C94C', fontSize: 9, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  coverageName: { color: '#075E43', fontSize: 16, fontWeight: '800', marginTop: 3 },
  coverageDetail: { color: '#68716E', fontSize: 12, marginTop: 3 },
  coverageArrow: { color: '#008F5A', fontSize: 28, fontWeight: '300', marginLeft: 8 },
  emptyText: { color: '#68716E', fontSize: 14, paddingVertical: 20, textAlign: 'center' },
  summary: { backgroundColor: '#075E43', borderRadius: 18, gap: 16, marginTop: 14, padding: 18 },
  summaryEyebrow: { color: '#BDEBD3', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  summaryTitle: { color: '#FFF9F2', fontSize: 22, fontWeight: '800', marginTop: 5 },
  summaryText: { color: '#D8F0E3', fontSize: 12, lineHeight: 18, marginTop: 5 },
  contactButton: { alignSelf: 'flex-start', backgroundColor: '#F2C94C', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 12 },
  contactButtonText: { color: '#FFF9F2', fontSize: 13, fontWeight: '800' },
});
