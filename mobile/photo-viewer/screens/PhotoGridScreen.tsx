import React from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { usePhotos } from "../hooks/usePhotos";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const spacing = 16;
const itemSize = (screenWidth - spacing * (numColumns + 1)) / numColumns;

export default function PhotoGridScreen() {
  const { photos, loading, error } = usePhotos();

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.photographer}>📷 {item.photographer}</Text>
    </View>
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
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: spacing,
  },
  item: {
    width: itemSize,
    backgroundColor: "#fff",
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
    color: "#666",
  },
});
