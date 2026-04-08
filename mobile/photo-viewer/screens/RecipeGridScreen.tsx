import React, { useRef } from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRecipes } from '@/hooks/useRecipes';
import { RecipeCard } from '@/components/RecipeCard';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 120; // Height of the greeting + headline area

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

  // We must use useNativeDriver: false because we are animating 'height', 
  // which is a layout property not supported by the native driver.
  const scrollY = useRef(new Animated.Value(0)).current;

  // Interpolations for header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [HEADER_MAX_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

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
      {/* Animated Header Section */}
      <View>
        <Animated.View style={[
          styles.header,
          {
            opacity: headerOpacity,
            height: headerHeight,
            overflow: 'hidden',
            transform: [{ translateY: headerTranslateY }]
          }
        ]}>
          <View style={styles.titleRow}>
            <Text style={[styles.greeting, { color: theme.icon }]}>Hello, Gourmet!</Text>
            {isPro && (
              <View style={[styles.proBadge, { backgroundColor: theme.premium }]}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
            )}
          </View>
          <Text style={[styles.headline, { color: theme.text }]}>What are we cooking today?</Text>
        </Animated.View>

        {/* Sticky Category Bar - This stays relatively positioned but stays top when header is 0 */}
        <View style={[styles.filterBarContainer, { backgroundColor: theme.background }]}>
          <FlatList
            data={categories}
            renderItem={({ item }) => renderCategory(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoryList}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.tint} />
          <Text style={[styles.loaderText, { color: theme.text }]}>Preparing your menu...</Text>
        </View>
      ) : (
        <Animated.FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } // MUST BE FALSE for height animation
          )}
          scrollEventThrottle={16}
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
  filterBarContainer: {
    paddingVertical: 16,
    zIndex: 5,
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
