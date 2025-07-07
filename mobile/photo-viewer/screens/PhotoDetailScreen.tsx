import { useNavigation, useTheme } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useMemo, useEffect, useState } from 'react';
import { Photo } from '@/models/photo';

const screenWidth = Dimensions.get('window').width;
const contentPadding = 16;
const contentWidth = screenWidth - contentPadding * 2;

export default function PhotoDetailScreen() {
  const { photo } = useLocalSearchParams();
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

  useEffect(() => {
    navigation.setOptions({ headerBackTitle: 'Back', title: '' });
  }, [parsedPhoto, navigation]);

  useEffect(() => {
    if (parsedPhoto?.image_url) {
      Image.getSize(
        parsedPhoto.image_url,
        (width, height) => {
          const ratio = height / width;
          setImageHeight(contentWidth * ratio);
        },
        () => {
          setImageHeight(300); // fallback height
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
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{parsedPhoto.title}</Text>

      {imageHeight ? (
        <Image
          source={{ uri: parsedPhoto.image_url }}
          style={{
            width: contentWidth,
            height: imageHeight,
            borderRadius: 12,
            marginBottom: 16,
          }}
        />
      ) : (
        <View
          style={{
            width: contentWidth,
            height: 200,
            borderRadius: 12,
            marginBottom: 16,
            backgroundColor: '#ccc',
          }}
        />
      )}

      <Text style={[styles.photographer, { color: colors.text }]}>📷 {parsedPhoto.photographer}</Text>
      <Text style={[styles.category, { color: colors.text }]}>🍽️ {parsedPhoto.category}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // No alignItems, so all content is left-aligned
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  photographer: {
    fontSize: 16,
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    marginBottom: 20,
  },
});
