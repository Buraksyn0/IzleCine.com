import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  favorites: []
};

export const IzleCine = createSlice({
  name: 'IzleCine',
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.some(movie => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
    }
  }
});

export const { setBannerData, addToFavorites, removeFromFavorites } = IzleCine.actions;
export default IzleCine.reducer;
