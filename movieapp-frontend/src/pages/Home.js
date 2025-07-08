import React, { useState, useEffect } from 'react';
import BannerHome from '../components/BannerHome';
import MovieRow from '../components/MovieRow';
import tmdbService from '../services/tmdbService';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [
          popularMovies,
          topRatedMovies,
          upcomingMovies,
          actionMoviesData,
          comedyMoviesData,
          dramaMoviesData,
          horrorMoviesData
        ] = await Promise.all([
          tmdbService.getPopularMovies(1),
          tmdbService.getPopularMovies(2),
          tmdbService.getPopularMovies(3),
          tmdbService.getMoviesByGenre(28, 1), // Action
          tmdbService.getMoviesByGenre(35, 1), // Comedy
          tmdbService.getMoviesByGenre(18, 1), // Drama
          tmdbService.getMoviesByGenre(27, 1)  // Horror
        ]);

        setTrendingMovies(popularMovies.results || []);
        setNewMovies(upcomingMovies.results || []);
        setRecommendedMovies(topRatedMovies.results || []);
        setActionMovies(actionMoviesData.results || []);
        setComedyMovies(comedyMoviesData.results || []);
        setDramaMovies(dramaMoviesData.results || []);
        setHorrorMovies(horrorMoviesData.results || []);
        setError(null);
      } catch (err) {
        setError('Filmler yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center text-red-500">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {trendingMovies.length > 0 && <BannerHome movies={trendingMovies} />}
      
      <div className="container mx-auto px-4 py-8 space-y-16">
        {trendingMovies.length > 0 && (
          <div className="category-section animate-fade-in">
            <MovieRow title={t('Trend Filmler')} movies={trendingMovies} />
          </div>
        )}

        {newMovies.length > 0 && (
          <div className="category-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MovieRow title={t('Yeni Gelenler')} movies={newMovies} />
          </div>
        )}

        {actionMovies.length > 0 && (
          <div className="category-section animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <MovieRow title={t('Aksiyon Filmleri')} movies={actionMovies} />
          </div>
        )}

        {comedyMovies.length > 0 && (
          <div className="category-section animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <MovieRow title={t('Komedi Filmleri')} movies={comedyMovies} />
          </div>
        )}

        {dramaMovies.length > 0 && (
          <div className="category-section animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <MovieRow title={t('Drama Filmleri')} movies={dramaMovies} />
          </div>
        )}

        {horrorMovies.length > 0 && (
          <div className="category-section animate-fade-in" style={{ animationDelay: '1s' }}>
            <MovieRow title="Korku Filmleri" movies={horrorMovies} />
          </div>
        )}

        {recommendedMovies.length > 0 && (
          <div className="category-section animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <MovieRow title="İlginizi Çekebilir" movies={recommendedMovies} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
