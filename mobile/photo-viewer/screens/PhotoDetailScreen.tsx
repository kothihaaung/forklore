import { useNavigation, useTheme } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useMemo, useEffect, useState } from 'react';
import { Photo } from '@/models/photo';

const screenWidth = Dimensions.get('window').width;

export default function PhotoDetailScreen() {
  const { photo } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const parsedPhoto = useMemo<Photo | null>(() => {
    if (typeof photo !== 'string') return null;
    try {
      return JSON.parse(photo);
    } catch {
      return null;
    }
  }, [photo]);

  // Set dynamic screen title
  useEffect(() => {
    navigation.setOptions({ headerBackTitle: 'Back', title: '' });
  }, [parsedPhoto, navigation]);

  // Dynamically calculate image height based on its original dimensions
  useEffect(() => {
    if (parsedPhoto?.image_url) {
      Image.getSize(
        parsedPhoto.image_url,
        (width, height) => {
          const ratio = height / width;
          setImageHeight(screenWidth * ratio);
        },
        (error) => {
          console.warn('Failed to get image size:', error);
          setImageHeight(300); // fallback
        }
      );
    }
  }, [parsedPhoto?.image_url]);

  if (!parsedPhoto) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Invalid photo</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      {imageHeight ? (
        <Image
          source={{ uri: parsedPhoto.image_url }}
          style={{
            width: screenWidth,
            height: imageHeight,
            borderRadius: 12,
            marginBottom: 16,
          }}
        />
      ) : (
        <View
          style={{
            width: screenWidth,
            height: 200,
            borderRadius: 12,
            marginBottom: 16,
            backgroundColor: '#ccc',
          }}
        />
      )}

      <Text style={[styles.title, { color: colors.text }]}>{parsedPhoto.title}</Text>
      <Text style={[styles.photographer, { color: colors.text }]}>📷 {parsedPhoto.photographer}</Text>
      <Text style={[styles.category, { color: colors.text }]}>🍽️ {parsedPhoto.category}</Text>

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
  container: {
    padding: 16,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
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
