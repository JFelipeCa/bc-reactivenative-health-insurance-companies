import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/coverage';
import { useHealthStore } from '../store';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CoverageDetail'>;

export function CoverageDetailScreen({ route }: Props) {
  const { coverage } = route.params;
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  const favorite = useHealthStore((state) => state.favoriteCoverages.includes(coverage.id));
  return <ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>{coverage.category.toLocaleUpperCase('es-CO')}</Text>
    <Text style={styles.title}>{coverage.name}</Text>
    <Text style={styles.body}>{coverage.detail}</Text>
    <View style={styles.card}>
      <Text style={styles.kicker}>PLAN DE REFERENCIA · {selectedPlan.toLocaleUpperCase('es-CO')}</Text>
      <Text style={styles.cardTitle}>Copago de ejemplo</Text>
      <Text style={styles.price}>{coverage.monthlyCopay === 0 ? 'Sin copago de referencia' : `$${coverage.monthlyCopay.toLocaleString('es-CO')} COP`}</Text>
      <Text style={styles.cardBody}>El valor es ilustrativo y no representa tarifas de una entidad real. Confirma cobertura y copagos con tu asegurador.</Text>
    </View>
    <Text style={styles.favorite}>{favorite ? '★ Guardada en tus favoritas' : '☆ Puedes guardarla desde la lista de coberturas'}</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({
  content: { backgroundColor: colors.background, flexGrow: 1, gap: 18, padding: 22 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.3 },
  title: { color: colors.primaryDark, fontSize: 31, fontWeight: '800' },
  body: { color: colors.muted, fontSize: 17, lineHeight: 26 },
  card: { backgroundColor: colors.primaryDark, borderRadius: 18, gap: 8, padding: 20 },
  kicker: { color: '#BDEBD3', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  cardTitle: { color: '#FFF9F2', fontSize: 21, fontWeight: '800' },
  price: { color: '#BDEBD3', fontSize: 18, fontWeight: '800' },
  cardBody: { color: '#D8F0E3', fontSize: 13, lineHeight: 19 },
  favorite: { color: colors.primary, fontSize: 13, fontWeight: '700' },
});
