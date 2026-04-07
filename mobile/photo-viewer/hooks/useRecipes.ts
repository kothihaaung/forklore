import { Recipe } from '@/models/Recipe';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://172.20.10.12:3000/api/v1'; // Update to your active IP

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/recipes`)
      .then((response) => {
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch recipes:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter(r => r.category.name === selectedCategory));
    }
  }, [selectedCategory, recipes]);

  const categories = ['All', ...Array.from(new Set(recipes.map(r => r.category.name)))];

  return { filteredRecipes, loading, selectedCategory, setSelectedCategory, categories };
}
