import { configureStore } from '@reduxjs/toolkit';
import IzleCineReducer from './izleCine'; // Küçük harfli dosya adıyla eşleşmeli
import watchlistReducer from './watchlistSlice';
import ratingReducer from './ratingSlice';

const store = configureStore({
  reducer: {
    IzleCineData: IzleCineReducer,
    watchlist: watchlistReducer,
    ratings: ratingReducer,
  },
});

export default store;
