import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function SubscriptionScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Go Pro</Text>
      <Text style={[styles.subtitle, { color: theme.icon }]}>Unlock all recipes with a full access subscription.</Text>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.tint }]}>
        <Text style={styles.buttonText}>Subscribe for $9.99/mo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={[styles.backText, { color: theme.icon }]}>Not now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '800', marginBottom: 16 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 40 },
  button: { width: '100%', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  backText: { fontSize: 16, textDecorationLine: 'underline' },
});
