import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRecipes } from '@/hooks/useRecipes';
import { RecipeCard } from '@/components/RecipeCard';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function RecipeGridScreen() {
    const {
        filteredRecipes,
        loading,
        selectedCategory,
        setSelectedCategory,
        categories,
        isPro,
    } = useRecipes();

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const renderCategory = (category: string) => (
        <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
                styles.categoryButton,
                {
                    backgroundColor:
                        selectedCategory === category ? theme.tint : 'transparent',
                    borderColor: theme.tint,
                },
            ]}
        >
            <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                        selectedCategory === category ? '#FFF' : theme.text,
                  }
                ]}
            >
                {category}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <Text style={[styles.greeting, { color: theme.icon }]}>Hello, Gourmet!</Text>
                {isPro && (
                  <View style={[styles.proBadge, { backgroundColor: theme.premium }]}>
                    <Text style={styles.proBadgeText}>PRO</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.headline, { color: theme.text }]}>What are we cooking today?</Text>
            </View>

            <View style={styles.filterBar}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => renderCategory(item)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.categoryList}
                />
            </View>

            {loading ? (
                <View style={styles.loader}>
                  <ActivityIndicator size="large" color={theme.tint} />
                  <Text style={[styles.loaderText, { color: theme.text }]}>Preparing your menu...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredRecipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <RecipeCard recipe={item} />}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    greeting: {
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
    proBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    proBadgeText: {
      color: '#FFF',
      fontSize: 10,
      fontWeight: '900',
    },
    headline: {
      fontSize: 28,
      fontWeight: '800',
      lineHeight: 34,
    },
    filterBar: {
        paddingVertical: 16,
    },
    categoryList: {
      paddingHorizontal: 20,
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1.5,
        marginRight: 10,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '700',
    },
    grid: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    row: {
        justifyContent: 'space-between',
        gap: 16,
    },
    loader: {
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderText: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: '600',
      opacity: 0.7,
    },
});
