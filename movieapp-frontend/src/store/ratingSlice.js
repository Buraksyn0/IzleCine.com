import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ratings: {} // Format: { movieId: { userId: rating } }
};

const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    addRating: (state, action) => {
      const { movieId, userId, rating } = action.payload;
      if (!state.ratings[movieId]) {
        state.ratings[movieId] = {};
      }
      state.ratings[movieId][userId] = rating;
    },
    updateRating: (state, action) => {
      const { movieId, userId, rating } = action.payload;
      if (state.ratings[movieId]) {
        state.ratings[movieId][userId] = rating;
      }
    },
    removeRating: (state, action) => {
      const { movieId, userId } = action.payload;
      if (state.ratings[movieId]) {
        delete state.ratings[movieId][userId];
      }
    }
  }
});

export const { addRating, updateRating, removeRating } = ratingSlice.actions;
export default ratingSlice.reducer; 