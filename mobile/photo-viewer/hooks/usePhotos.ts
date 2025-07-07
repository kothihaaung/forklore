import { useEffect, useState } from 'react';
import axios from 'axios';
import { Photo } from '@/models/photo';

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://192.168.1.100:3000/api/v1/photos') // ← your IP
      .then((response) => {
        setPhotos(response.data);
        setFilteredPhotos(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch photos:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category === selectedCategory));
    }
  }, [selectedCategory, photos]);

  const categories = ['All', ...Array.from(new Set(photos.map(p => p.category)))];

  return { filteredPhotos, loading, selectedCategory, setSelectedCategory, categories };
}
