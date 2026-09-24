import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = { title: string; description: string; onPress: () => void };

export function ActionCard({ title, description, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" style={styles.card} onPress={onPress}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 18 },
  copy: { flex: 1, gap: 5 },
  title: { color: colors.primaryDark, fontSize: 17, fontWeight: '800' },
  description: { color: colors.muted, fontSize: 13 },
  arrow: { color: colors.primary, fontSize: 30 },
});
