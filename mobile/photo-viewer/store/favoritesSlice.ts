import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../models/Recipe';

interface FavoritesState {
  items: Recipe[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Recipe>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    addFavorite: (state, action: PayloadAction<Recipe>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { toggleFavorite, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
