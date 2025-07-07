import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { Photo } from "@/models/photo";

export default function DetailScreen() {
  const { photo } = useLocalSearchParams();
  const router = useRouter();

  const parsedPhoto = useMemo<Photo | null>(() => {
    if (typeof photo !== "string") return null;
    try {
      return JSON.parse(photo);
    } catch {
      return null;
    }
  }, [photo]);

  if (!parsedPhoto) {
    return <Text style={styles.error}>Invalid photo data</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: parsedPhoto.image_url }} style={styles.image} />
      <Text style={styles.title}>{parsedPhoto.title}</Text>
      <Text style={styles.photographer}>📷 {parsedPhoto.photographer}</Text>
      <Text style={styles.category}>🍽️ Category: {parsedPhoto.category}</Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: 50,
    textAlign: "center",
    color: "red",
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  photographer: {
    fontSize: 16,
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
