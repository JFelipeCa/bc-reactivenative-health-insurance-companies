import { useEffect, useRef } from 'react';
import { Animated, Easing, LayoutAnimation, Platform, Pressable, ScrollView, StyleSheet, Text, UIManager, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ActionCard } from '../components/ActionCard';
import { useHealthStore } from '../store';
import { useLogout } from '../hooks/useAuth';
import type { TabParamList } from '../types/coverage';
import { colors } from '../theme';

type Navigation = BottomTabNavigationProp<TabParamList>;

const plans = [
  { name: 'Individual', price: '$89.900 COP / mes', benefits: 'Cobertura esencial para una persona.' },
  { name: 'Familiar', price: '$159.900 COP / mes', benefits: 'Opciones de atención para tu hogar.' },
  { name: 'Integral', price: '$219.900 COP / mes', benefits: 'Servicios ampliados de bienestar y prevención.' },
];

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const selectedPlan = useHealthStore((state) => state.selectedPlan);
  const selectPlan = useHealthStore((state) => state.selectPlan);
  const logout = useLogout();
  const entrance = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) UIManager.setLayoutAnimationEnabledExperimental(true);
    Animated.parallel([
      Animated.timing(entrance, { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, damping: 18, stiffness: 120, useNativeDriver: true }),
    ]).start();
  }, [entrance, slide]);

  const select = (plan: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    selectPlan(plan);
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.eyebrow}>COBERTURA DE SALUD · COLOMBIA</Text>
      <Text style={styles.title}>Cuida de tu salud y la de tu familia.</Text>
      <Animated.View style={[styles.hero, { opacity: entrance, transform: [{ translateY: slide }, { rotate: entrance.interpolate({ inputRange: [0, 1], outputRange: ['-2deg', '0deg'] }) }] }]}>
        <Text style={styles.kicker}>ORIENTACIÓN PARA AFILIADOS</Text>
        <Text style={styles.heroTitle}>Compara planes, copagos y servicios.</Text>
        <Text style={styles.body}>Explora opciones de cobertura y conoce cómo funciona la red de atención.</Text>
      </Animated.View>

      <Text style={styles.sectionTitle}>Elige un plan de referencia</Text>
      {plans.map((plan) => {
        const active = plan.name === selectedPlan;
        return <Pressable key={plan.name} accessibilityRole="button" onPress={() => select(plan.name)} style={({ pressed }) => [styles.plan, active && styles.planActive, pressed && styles.pressed]}>
          <View style={styles.planHeader}><Text style={styles.planName}>{plan.name}</Text><Text style={styles.check}>{active ? '✓' : '○'}</Text></View>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.body}>{plan.benefits}</Text>
        </Pressable>;
      })}
      <Text style={styles.sectionTitle}>Accesos rápidos</Text>
      <Animated.View style={{ opacity: entrance, transform: [{ translateY: slide }] }}>
        <ActionCard title="Explorar coberturas" description="Busca servicios y revisa sus detalles." onPress={() => navigation.navigate('Coverages')} />
      </Animated.View>
      <ActionCard title="Solicitar afiliación" description="Completa el formulario de orientación." onPress={() => navigation.getParent()?.navigate('Enrollment' as never)} />
      <View style={styles.info}><Text style={styles.kicker}>PLAN SELECCIONADO</Text><Text style={styles.planName}>{selectedPlan}</Text><Text style={styles.infoBody}>Precios y servicios de demostración para el proyecto académico.</Text></View>
      <Pressable accessibilityRole="button" onPress={() => void logout()}><Text style={styles.signOut}>Cerrar sesión</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, gap: 16, padding: 22, backgroundColor: colors.background },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.4 },
  title: { color: colors.primaryDark, fontSize: 28, fontWeight: '800', lineHeight: 34 },
  hero: { backgroundColor: '#DFF3E8', borderRadius: 22, gap: 10, padding: 22 },
  kicker: { color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: colors.primaryDark, fontSize: 23, fontWeight: '800', lineHeight: 28 },
  body: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  sectionTitle: { color: colors.primaryDark, fontSize: 20, fontWeight: '800', marginTop: 5 },
  plan: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 15, borderWidth: 1, gap: 6, padding: 16 },
  planActive: { borderColor: colors.primary, borderWidth: 2 },
  planHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  planName: { color: colors.primaryDark, fontSize: 17, fontWeight: '800' },
  planPrice: { color: colors.primary, fontSize: 13, fontWeight: '800' },
  check: { color: colors.primary, fontSize: 20, fontWeight: '800' },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  info: { backgroundColor: colors.primaryDark, borderRadius: 18, gap: 7, padding: 19 },
  infoBody: { color: '#D8F0E3', fontSize: 13, lineHeight: 19 },
  signOut: { color: colors.primary, fontSize: 13, fontWeight: '800', padding: 10, textAlign: 'center' },
});
