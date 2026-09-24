import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen } from '../screens/AuthScreen';
import { readTokens } from '../api/tokenStorage';
import { CoverageDetailScreen } from '../screens/CoverageDetailScreen';
import { CoveragesScreen } from '../screens/CoveragesScreen';
import { EnrollmentScreen } from '../screens/EnrollmentScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { useHealthStore } from '../store';
import type { RootStackParamList, TabParamList } from '../types/coverage';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted }}>
    <Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
    <Tabs.Screen name="Coverages" component={CoveragesScreen} options={{ title: 'Coberturas' }} />
  </Tabs.Navigator>;
}

export function AppNavigator() {
  const isAuthenticated = useHealthStore((state) => state.isAuthenticated);
  const authReady = useHealthStore((state) => state.authReady);
  const setAuthReady = useHealthStore((state) => state.setAuthReady);
  const signIn = useHealthStore((state) => state.signIn);
  const signOut = useHealthStore((state) => state.signOut);
  const [hydrated, setHydrated] = useState(useHealthStore.persist.hasHydrated());
  useEffect(() => {
    const unsubscribe = useHealthStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useHealthStore.persist.hasHydrated());
    return unsubscribe;
  }, []);

  useEffect(() => {
    let active = true;
    void readTokens().then((tokens) => {
      if (!active) return;
      if (tokens) signIn();
      else signOut();
      setAuthReady(true);
    }).catch(() => {
      if (active) {
        signOut();
        setAuthReady(true);
      }
    });
    return () => { active = false; };
  }, [setAuthReady, signIn, signOut]);

  if (!hydrated || !authReady) return <SafeAreaView style={styles.loading}><ActivityIndicator color={colors.primary} /></SafeAreaView>;
  return <Stack.Navigator>
    {isAuthenticated ? <>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="CoverageDetail" component={CoverageDetailScreen} options={{ title: 'Detalle de cobertura' }} />
      <Stack.Screen name="Enrollment" component={EnrollmentScreen} options={{ title: 'Afiliación' }} />
    </> : <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />}
  </Stack.Navigator>;
}

const styles = StyleSheet.create({ loading: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center' } });
