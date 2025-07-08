import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbService from '../services/tmdbService';
import MovieRow from '../components/MovieRow';

const CATEGORY_CONFIG = [
  { key: 'popular', label: 'Popüler', fetch: () => tmdbService.getPopularMovies() },
  { key: 'trending', label: 'Trend', fetch: () => tmdbService.getTrendingMovies() },
  { key: 'action', label: 'Aksiyon', fetch: () => tmdbService.getMoviesByGenre(28) },
  { key: 'comedy', label: 'Komedi', fetch: () => tmdbService.getMoviesByGenre(35) },
  { key: 'drama', label: 'Drama', fetch: () => tmdbService.getMoviesByGenre(18) },
];

const CategoryPage = () => {
  const { key } = useParams();
  const category = CATEGORY_CONFIG.find(cat => cat.key === key) || CATEGORY_CONFIG[0];
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    category.fetch()
      .then(data => setMovies(data.results || []))
      .catch(() => setError('Filmler yüklenemedi.'))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 px-4">
      {loading ? (
        <div className="text-white py-8">Filmler yükleniyor...</div>
      ) : error ? (
        <div className="text-red-400 py-8">{error}</div>
      ) : (
        <MovieRow title={category.label + ' Filmleri'} movies={movies} />
      )}
    </div>
  );
};

export default CategoryPage; 