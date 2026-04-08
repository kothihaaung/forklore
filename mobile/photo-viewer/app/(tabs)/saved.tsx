import React from 'react';
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RecipeCard } from '@/components/RecipeCard';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

export default function SavedRecipesScreen() {
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    if (favorites.length === 0) {
      return (
        <View style={[styles.emptyContainer, { backgroundColor: theme.background }]}>
          <IconSymbol name="bookmark" size={64} color={theme.icon} style={{ opacity: 0.3, marginBottom: 16 }} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No saved dishes yet</Text>
          <Text style={[styles.emptySubtitle, { color: theme.icon }]}>
            Save recipes to access them offline and build your personal collection.
          </Text>
        </View>
      );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: theme.text }]}>Saved Recipes</Text>
              <Text style={[styles.subtitle, { color: theme.icon }]}>Your offline kitchen collection</Text>
            </View>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <RecipeCard recipe={item} />}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 4,
      opacity: 0.7,
    },
    grid: {
        paddingHorizontal: 16,
        paddingBottom: 100, // Space for tab bar
    },
    row: {
        justifyContent: 'space-between',
        gap: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 15,
      textAlign: 'center',
      lineHeight: 22,
      opacity: 0.7,
    },
});
