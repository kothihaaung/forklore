import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export default function SubscriptionScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // 1. Create subscription intent on backend
      const response = await axios.post(`${API_BASE_URL}/checkout/create-subscription`);
      const { paymentIntent, publishableKey } = response.data;

      // 2. Initialize Payment Sheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: 'Forklore Pro',
        allowsDelayedPaymentMethods: true,
        appearance: {
          colors: {
            primary: theme.tint,
          },
        },
      });

      if (initError) {
        Alert.alert('Error', initError.message);
        return;
      }

      // 3. Present Payment Sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code !== 'Canceled') {
          Alert.alert('Error', presentError.message);
        }
      } else {
        Alert.alert('Succes!', 'You are now a PRO member. All recipes are unlocked.');
        router.replace('/(tabs)');
      }
    } catch (e: any) {
      console.log(e);
      Alert.alert('Error', 'Could not initiate subscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Go Pro</Text>
      <Text style={[styles.subtitle, { color: theme.icon }]}>Unlock all recipes with a full access subscription.</Text>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.tint }]} 
        onPress={handleSubscribe}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Subscribe for $9.99/mo</Text>
        )}
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
