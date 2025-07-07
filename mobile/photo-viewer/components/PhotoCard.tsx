import { useTheme, useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Photo } from '@/models/photo';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const contentPadding = 16;
const gap = 12;
const cardWidth = (screenWidth - contentPadding * 2 - gap) / 2;

type Props = {
    photo: Photo;
};

export function PhotoCard({ photo }: Props) {
    const { colors } = useTheme();

    const router = useRouter();

    const onPress = () => {
        router.push({
            pathname: "/detail",
            params: { photo: JSON.stringify(photo) },
        })
    };

    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: colors.card }]}>
            <Image source={{ uri: photo.image_url }} style={styles.image} />
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                {photo.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 120,
    },
    title: {
        fontSize: 14,
        padding: 8,
    },
});
