import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { Recipe } from '@/models/Recipe';
import { useStripe } from '@stripe/stripe-react-native';

const { width } = Dimensions.get('window');
const API_BASE_URL = 'http://172.20.10.12:3000/api/v1';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      // 1. Fetch PaymentIntent client secret from backend
      const response = await axios.post(`${API_BASE_URL}/checkout/create-payment-intent`, {
        recipe_id: id,
      });
      
      const { paymentIntent, publishableKey } = response.data;

      // 2. Initialize Payment Sheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: 'Forklore Recipes',
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });

      if (initError) {
        alert(`Error: ${initError.message}`);
        return;
      }

      // 3. Present Payment Sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        alert(`Error: ${presentError.message}`);
      } else {
        alert('Success! Your recipe is now unlocked.');
        // In a real app, we would refresh the state to show ingredients
      }
    } catch (e) {
      console.log(e);
    } finally {
      setPurchasing(false);
    }
  };

  if (loading || !recipe) {
    return (
      <View style={[styles.loader, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  const ingredients = JSON.parse(recipe.ingredients || "[]");
  const instructions = JSON.parse(recipe.instructions || "[]");

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.header}>
        <Image source={{ uri: recipe.image_url }} style={styles.image} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <BlurView intensity={20} style={styles.backBlur}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </BlurView>
        </TouchableOpacity>
        
        {recipe.premium && (
           <View style={styles.premiumOverlay}>
              <BlurView intensity={30} style={styles.premiumBadgeLarge}>
                <Ionicons name="sparkles" size={20} color={theme.premium} />
                <Text style={[styles.premiumTextLarge, { color: theme.premium }]}>PREMIUM RECIPE</Text>
              </BlurView>
           </View>
        )}
      </View>

      {/* Content */}
      <View style={[styles.content, { borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -30, backgroundColor: theme.background }]}>
        <View style={styles.metaRow}>
          <Text style={[styles.category, { color: theme.tint }]}>{recipe.category.name}</Text>
          <View style={styles.timeTag}>
            <Ionicons name="time-outline" size={16} color={theme.icon} />
            <Text style={[styles.timeText, { color: theme.icon }]}>{recipe.cooking_time} min</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>{recipe.title}</Text>
        <Text style={[styles.description, { color: theme.icon }]}>{recipe.description}</Text>

        {recipe.premium ? (
          <View style={[styles.lockedArea, { backgroundColor: theme.card, borderColor: theme.border }]}>
             <Ionicons name="lock-closed" size={48} color={theme.tint} style={{ marginBottom: 16 }} />
             <Text style={[styles.lockedTitle, { color: theme.text }]}>Unlock this Recipe</Text>
             <Text style={[styles.lockedDesc, { color: theme.icon }]}>Get full access to ingredients and step-by-step instructions for a small one-time payment.</Text>
             
             <TouchableOpacity 
              style={[styles.buyButton, { backgroundColor: theme.tint }]}
              onPress={handlePurchase}
              disabled={purchasing}
             >
                {purchasing ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buyButtonText}>Unlock for ${recipe.price || "4.99"}</Text>
                )}
             </TouchableOpacity>

             <TouchableOpacity style={styles.subscribeLink} onPress={() => router.push('/subscription')}>
                <Text style={[styles.subscribeText, { color: theme.tint }]}>Or subscribe for full access</Text>
             </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.recipeContent}>
             <Text style={[styles.sectionTitle, { color: theme.text }]}>Ingredients</Text>
             {ingredients.map((item: string, index: number) => (
                <View key={index} style={styles.ingredientRow}>
                   <View style={[styles.dot, { backgroundColor: theme.tint }]} />
                   <Text style={[styles.ingredientText, { color: theme.text }]}>{item}</Text>
                </View>
             ))}

             <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 32 }]}>Instructions</Text>
             {instructions.map((item: string, index: number) => (
                <View key={index} style={styles.stepRow}>
                   <View style={[styles.stepNumber, { backgroundColor: theme.tint }]}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                   </View>
                   <Text style={[styles.stepText, { color: theme.text }]}>{item}</Text>
                </View>
             ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 400,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  backBlur: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  premiumOverlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  premiumBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  premiumTextLarge: {
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
    letterSpacing: 1,
  },
  content: {
    padding: 24,
    minHeight: 500,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    opacity: 0.8,
  },
  lockedArea: {
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  lockedTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  lockedDesc: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buyButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  subscribeLink: {
    padding: 8,
  },
  subscribeText: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  recipeContent: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    lineHeight: 24,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});
