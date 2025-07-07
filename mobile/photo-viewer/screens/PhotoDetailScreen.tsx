import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';

type Photo = {
  id: number;
  title: string;
  photographer: string;
  category: string;
  image_url: string;
};

export default function PhotoDetailScreen() {
  const { photo } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();

  const parsedPhoto = useMemo<Photo | null>(() => {
    if (typeof photo !== 'string') return null;
    try {
      return JSON.parse(photo);
    } catch {
      return null;
    }
  }, [photo]);

  if (!parsedPhoto) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Invalid photo</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
    >
      <Image source={{ uri: parsedPhoto.image_url }} style={styles.image} />
      <Text style={[styles.title, { color: colors.text }]}>{parsedPhoto.title}</Text>
      <Text style={[styles.photographer, { color: colors.text }]}>
        📷 {parsedPhoto.photographer}
      </Text>
      <Text style={[styles.category, { color: colors.text }]}>
        🍽️ {parsedPhoto.category}
      </Text>

      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.backButton, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.backButtonText, { color: '#fff' }]}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
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
    marginTop: 24,
  },
  backButtonText: {
    fontSize: 16,
  },
});
