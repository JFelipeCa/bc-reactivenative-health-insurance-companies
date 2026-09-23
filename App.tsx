import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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

const plans: Plan[] = [
  {
    id: 'essential',
    name: 'Individual',
    price: '$89.900 COP / mes',
    accent: '#008F5A',
    description: 'Cobertura base para tus necesidades de salud en Colombia.',
    benefits: ['Consulta general', 'Red de urgencias', 'Telemedicina 24/7'],
  },
  {
    id: 'family',
    name: 'Familiar',
    price: '$159.900 COP / mes',
    accent: '#F2C94C',
    description: 'Proteccion para tu hogar con acceso a una red nacional.',
    benefits: ['Consulta general', 'Pediatria incluida', 'Atencion odontologica'],
  },
  {
    id: 'premium',
    name: 'Preferente',
    price: '$249.900 COP / mes',
    accent: '#075E43',
    description: 'Acceso preferente a especialistas y servicios complementarios.',
    benefits: ['Habitacion individual', 'Especialistas', 'Chequeo anual'],
  },
];

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('family');
  const activePlan = plans.find((plan) => plan.id === selectedPlan) ?? plans[1];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>COBERTURA DE SALUD COLOMBIA</Text>
            <Text style={styles.title}>Tu cobertura de salud en Colombia.</Text>
          </View>
          <View style={styles.headerMark}>
            <Text style={styles.headerMarkText}>+</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>SISTEMA DE SALUD COLOMBIANO</Text>
            <Text style={styles.heroTitle}>Compara planes, copagos y beneficios.</Text>
            <Text style={styles.heroText}>
              Consulta opciones de cobertura y redes EPS e IPS.
            </Text>
          </View>
          <Image
            accessibilityLabel="Familiar during a healthcare consultation"
            source={{ uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500' }}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>OPCIONES DE COBERTURA</Text>
            <Text style={styles.sectionTitle}>Planes de salud</Text>
          </View>
          <Text style={styles.counter}>03 opciones</Text>
        </View>

        <View style={styles.planList}>
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlan;
            return (
              <Pressable
                key={plan.id}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => setSelectedPlan(plan.id)}
                style={[styles.planCard, isSelected && styles.planCardSelected]}
              >
                <View style={[styles.planAccent, { backgroundColor: plan.accent }]} />
                <View style={styles.planBody}>
                  <View style={styles.planTopline}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    {isSelected ? <Text style={styles.selectedLabel}>SELECCIONADO</Text> : null}
                  </View>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                  <View style={styles.benefitRow}>
                    {plan.benefits.map((benefit) => (
                      <Text key={benefit} style={styles.benefit}>
                        {`â€¢ ${benefit}`}
                      </Text>
                    ))}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryEyebrow}>PLAN SELECCIONADO</Text>
            <Text style={styles.summaryTitle}>{activePlan.name}</Text>
            <Text style={styles.summaryText}>Consulta copagos, red IPS y condiciones de atencion.</Text>
          </View>
          <TouchableOpacity accessibilityRole="button" style={styles.contactButton} onPress={() => undefined}>
            <Text style={styles.contactButtonText}>Consultar plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7FAF8' },
  content: { padding: 22, paddingBottom: 36, gap: 24 },
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
  summary: { backgroundColor: '#075E43', borderRadius: 18, padding: 18, gap: 16 },
  summaryEyebrow: { color: '#BDEBD3', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  summaryTitle: { color: '#FFF9F2', fontSize: 22, fontWeight: '800', marginTop: 5 },
  summaryText: { color: '#D8F0E3', fontSize: 12, lineHeight: 18, marginTop: 5 },
  contactButton: { alignSelf: 'flex-start', backgroundColor: '#F2C94C', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 15 },
  contactButtonText: { color: '#FFF9F2', fontSize: 13, fontWeight: '800' },
});