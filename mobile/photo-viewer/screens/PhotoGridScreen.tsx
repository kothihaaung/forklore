import React, { useEffect } from "react";
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    Text,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { usePhotos } from "../hooks/usePhotos";
import { useTheme } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const spacing = 16;
const itemSize = (screenWidth - spacing * (numColumns + 1)) / numColumns;

export default function PhotoGridScreen() {
    const { photos, loading, error } = usePhotos();
    const { colors } = useTheme();

    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: '' });
    }, [navigation]);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "/detail",
                    params: { photo: JSON.stringify(item) },
                })
            }
            style={[styles.item, { backgroundColor: colors.card }]}
        >
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.photographer, { color: colors.text }]}>
                📷 {item.photographer}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    if (error) {
        return <Text style={{ marginTop: 50, textAlign: "center" }}>{error}</Text>;
    }

    return (
        <FlatList
            data={photos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.container}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: spacing,
    },
    item: {
        width: itemSize,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
    },
    image: {
        width: itemSize,
        height: itemSize,
        resizeMode: "cover",
    },
    title: {
        fontWeight: "600",
        fontSize: 14,
        paddingHorizontal: 8,
        paddingTop: 6,
    },
    photographer: {
        fontSize: 12,
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
});