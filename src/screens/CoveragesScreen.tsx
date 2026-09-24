import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CoverageCard } from '../components/CoverageCard';
import { useCoverages } from '../hooks/useCoverages';
import { useHealthStore } from '../store';
import type { RootStackParamList } from '../types/coverage';
import { colors } from '../theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function CoveragesScreen() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<Navigation>();
  const { data = [], isError, isFetching, isLoading, refetch } = useCoverages();
  const favorites = useHealthStore((state) => state.favoriteCoverages);
  const toggleFavorite = useHealthStore((state) => state.toggleFavorite);
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  const filtered = useMemo(() => data.filter((item) => `${item.name} ${item.category}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())), [data, search]);

  return <FlatList
    style={styles.list}
    contentContainerStyle={styles.content}
    data={filtered}
    keyExtractor={(item) => item.id}
    keyboardShouldPersistTaps="handled"
    refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => void refetch()} tintColor={colors.primary} />}
    ListHeaderComponent={<View style={styles.header}><Text style={styles.eyebrow}>RED DE ATENCIÓN</Text><Text style={styles.title}>Coberturas</Text><Text style={styles.summary}>Plan: {selectedPlan} · {favorites.length} favoritas</Text><TextInput accessibilityLabel="Buscar coberturas" value={search} onChangeText={setSearch} placeholder="Buscar servicio o especialidad…" placeholderTextColor="#8A918D" style={styles.search} /><Text style={styles.status}>{isFetching ? 'Actualizando coberturas…' : 'Catálogo de demostración'}</Text></View>}
    ListEmptyComponent={<Text style={styles.empty}>{isLoading ? 'Cargando coberturas…' : isError ? 'No se pudieron cargar las coberturas. Desliza para reintentar.' : 'No hay coberturas que coincidan con la búsqueda.'}</Text>}
    renderItem={({ item }) => <CoverageCard item={item} favorite={favorites.includes(item.id)} onPress={() => navigation.navigate('CoverageDetail', { coverage: item })} onToggleFavorite={() => toggleFavorite(item.id)} />}
    showsVerticalScrollIndicator={false}
  />;
}

const styles = StyleSheet.create({
  list: { backgroundColor: colors.background },
  content: { gap: 12, padding: 22, paddingBottom: 36 },
  header: { gap: 8, marginBottom: 6 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.3 },
  title: { color: colors.primaryDark, fontSize: 28, fontWeight: '800' },
  summary: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  search: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.primaryDark, fontSize: 14, marginTop: 8, padding: 14 },
  status: { color: colors.muted, fontSize: 11 },
  empty: { color: colors.muted, fontSize: 14, paddingVertical: 20, textAlign: 'center' },
});
