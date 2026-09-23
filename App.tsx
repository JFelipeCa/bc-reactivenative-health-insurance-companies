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
    name: 'Essential',
    price: '$89.900 / mes',
    accent: '#1E6F63',
    description: 'Core coverage for everyday healthcare needs.',
    benefits: ['General medicine', 'Emergency network', '24/7 telemedicine'],
  },
  {
    id: 'family',
    name: 'Family',
    price: '$159.900 / mes',
    accent: '#D86A3B',
    description: 'Balanced protection for you and your household.',
    benefits: ['Everything essential', 'Pediatric care', 'Dental care'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$249.900 / mes',
    accent: '#263B54',
    description: 'Preferred health services with comprehensive support.',
    benefits: ['Private room', 'Specialists without copay', 'Annual checkup'],
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
            <Text style={styles.eyebrow}>HEALTH INSURANCE</Text>
            <Text style={styles.title}>Coverage that supports your health.</Text>
          </View>
          <View style={styles.headerMark}>
            <Text style={styles.headerMarkText}>+</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>HEALTH COVERAGE</Text>
            <Text style={styles.heroTitle}>Plans designed for your peace of mind.</Text>
            <Text style={styles.heroText}>
              Explore plans built around your healthcare needs.
            </Text>
          </View>
          <Image
            accessibilityLabel="Family during a healthcare consultation"
            source={{ uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500' }}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>CHOOSE YOUR COVERAGE</Text>
            <Text style={styles.sectionTitle}>Health plans</Text>
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
                    {isSelected ? <Text style={styles.selectedLabel}>SELECTED</Text> : null}
                  </View>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                  <View style={styles.benefitRow}>
                    {plan.benefits.map((benefit) => (
                      <Text key={benefit} style={styles.benefit}>
                        {`• ${benefit}`}
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
            <Text style={styles.summaryEyebrow}>YOUR SELECTION</Text>
            <Text style={styles.summaryTitle}>{activePlan.name}</Text>
            <Text style={styles.summaryText}>Review your plan benefits with a health insurance representative.</Text>
          </View>
          <TouchableOpacity accessibilityRole="button" style={styles.contactButton} onPress={() => undefined}>
            <Text style={styles.contactButtonText}>Contact a representative</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F3EE' },
  content: { padding: 22, paddingBottom: 36, gap: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { color: '#1E6F63', fontSize: 12, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#263B54', fontSize: 25, fontWeight: '800', marginTop: 7, maxWidth: 280 },
  headerMark: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#D86A3B', alignItems: 'center', justifyContent: 'center' },
  headerMarkText: { color: '#FFF9F2', fontSize: 27, fontWeight: '300' },
  hero: { backgroundColor: '#DDEDE5', borderRadius: 22, overflow: 'hidden', minHeight: 220, flexDirection: 'row' },
  heroCopy: { flex: 1, padding: 20, justifyContent: 'center' },
  heroKicker: { color: '#1E6F63', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: '#263B54', fontSize: 23, lineHeight: 28, fontWeight: '800', marginTop: 10 },
  heroText: { color: '#4E625E', fontSize: 13, lineHeight: 19, marginTop: 10 },
  heroImage: { width: 116, height: '100%', minHeight: 220 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  sectionEyebrow: { color: '#D86A3B', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
  sectionTitle: { color: '#263B54', fontSize: 24, fontWeight: '800', marginTop: 4 },
  counter: { color: '#77817E', fontSize: 12, paddingBottom: 3 },
  planList: { gap: 12 },
  planCard: { flexDirection: 'row', backgroundColor: '#FFFCF8', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E9E4DC' },
  planCardSelected: { borderColor: '#1E6F63', borderWidth: 2 },
  planAccent: { width: 7 },
  planBody: { flex: 1, padding: 15 },
  planTopline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planName: { color: '#263B54', fontSize: 19, fontWeight: '800' },
  selectedLabel: { color: '#1E6F63', fontSize: 9, fontWeight: '800' },
  planPrice: { color: '#D86A3B', fontSize: 14, fontWeight: '800', marginTop: 4 },
  planDescription: { color: '#68716E', fontSize: 12, lineHeight: 17, marginTop: 7 },
  benefitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 11 },
  benefit: { color: '#4E625E', fontSize: 11 },
  summary: { backgroundColor: '#263B54', borderRadius: 18, padding: 18, gap: 16 },
  summaryEyebrow: { color: '#B8DACA', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  summaryTitle: { color: '#FFF9F2', fontSize: 22, fontWeight: '800', marginTop: 5 },
  summaryText: { color: '#D6E1DD', fontSize: 12, lineHeight: 18, marginTop: 5 },
  contactButton: { alignSelf: 'flex-start', backgroundColor: '#D86A3B', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 15 },
  contactButtonText: { color: '#FFF9F2', fontSize: 13, fontWeight: '800' },
});