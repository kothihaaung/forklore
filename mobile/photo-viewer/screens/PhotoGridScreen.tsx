import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
    ActivityIndicator,
} from 'react-native';
import { usePhotos } from '@/hooks/usePhotos';
import { PhotoCard } from '@/components/PhotoCard';
import { Colors } from '@/constants/Colors';

export default function PhotoGridScreen() {
    const {
        filteredPhotos,
        loading,
        selectedCategory,
        setSelectedCategory,
        categories,
    } = usePhotos();

    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const renderCategory = (category: string) => (
        <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
                styles.categoryButton,
                {
                    backgroundColor:
                        selectedCategory === category ? themeColors.tint : themeColors.background,
                    borderColor: themeColors.tint,
                },
            ]}
        >
            <Text
                style={{
                    color:
                        selectedCategory === category ? themeColors.background : themeColors.text,
                }}
            >
                {category}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.filterBar}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => renderCategory(item)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="small" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredPhotos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PhotoCard photo={item} />}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 12 }}
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
        paddingHorizontal: 16,
    },
    filterBar: {
        flexDirection: 'row',
        paddingVertical: 12,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 8,
    },
    grid: {
        gap: 12,
        paddingBottom: 20,
    },
});
