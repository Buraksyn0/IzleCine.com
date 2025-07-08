import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      // Eğer film zaten listede yoksa ekle
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearWatchlist: (state) => {
      state.items = [];
    }
  }
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer; 