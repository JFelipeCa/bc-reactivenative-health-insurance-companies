import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Coverage } from '../types/coverage';
import { colors } from '../theme';

type Props = { item: Coverage; favorite: boolean; onPress: () => void; onToggleFavorite: () => void };

export function CoverageCard({ item, favorite, onPress, onToggleFavorite }: Props) {
  return (
    <View style={styles.card}>
      <Pressable accessibilityRole="button" style={styles.copy} onPress={onPress}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>{item.detail}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={favorite ? 'Quitar de favoritas' : 'Añadir a favoritas'} onPress={onToggleFavorite} hitSlop={10}>
        <Text style={styles.favorite}>{favorite ? '★' : '☆'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, flexDirection: 'row', gap: 12, padding: 16 },
  copy: { flex: 1, gap: 4 },
  category: { color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  name: { color: colors.primaryDark, fontSize: 17, fontWeight: '800' },
  detail: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  favorite: { color: colors.primary, fontSize: 27 },
});
