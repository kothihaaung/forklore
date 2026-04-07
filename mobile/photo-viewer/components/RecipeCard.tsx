import { Recipe } from '@/models/Recipe';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: recipe.id } })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image_url }} style={styles.image} resizeMode="cover" />
        {recipe.premium && (
          <BlurView intensity={20} style={styles.premiumBadge}>
            <Ionicons name="sparkles" size={12} color={theme.premium} />
            <Text style={[styles.premiumText, { color: theme.premium }]}>PREMIUM</Text>
          </BlurView>
        )}
        <View style={styles.timeTag}>
          <BlurView intensity={20} style={styles.timeBlur}>
             <Ionicons name="time-outline" size={12} color="#FFF" />
             <Text style={styles.timeText}>{recipe.cooking_time} min</Text>
          </BlurView>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.category, { color: theme.tint }]}>{recipe.category.name}</Text>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>{recipe.title}</Text>
        
        <View style={styles.footer}>
            <View style={styles.metaItem}>
                <Ionicons name="stats-chart" size={14} color="#687076" />
                <Text style={styles.metaText}>{recipe.difficulty}</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
  },
  timeTag: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    overflow: 'hidden',
    borderRadius: 12,
  },
  timeBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  timeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    padding: 14,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#687076',
    marginLeft: 4,
  },
});
