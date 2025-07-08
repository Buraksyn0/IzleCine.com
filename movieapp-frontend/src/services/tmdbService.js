import axios from 'axios';

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

// Create a dedicated axios instance for TMDb API requests
const tmdbAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  },
  params: {
    language: 'tr-TR'
  }
});

const tmdbService = {
  // Popüler filmleri getir
  getPopularMovies: async (page = 1) => {
    try {
      const response = await tmdbAxios.get('/movie/popular', {
        params: {
          page: page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Film detaylarını getir
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbAxios.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'videos,credits,similar'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Popüler dizileri getir
  getPopularTVShows: async (page = 1) => {
    try {
      const response = await tmdbAxios.get('/tv/popular', {
        params: {
          page: page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      throw error;
    }
  },

  // Dizi detaylarını getir
  getTVShowDetails: async (tvId) => {
    try {
      const response = await tmdbAxios.get(`/tv/${tvId}`, {
        params: {
          append_to_response: 'videos,credits,similar'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      throw error;
    }
  },

  // Arama yap
  search: async (query, page = 1) => {
    try {
      const response = await tmdbAxios.get('/search/multi', {
        params: {
          query: query,
          page: page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  },

  // Kategoriye göre filmleri getir
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await tmdbAxios.get('/discover/movie', {
        params: {
          with_genres: genreId,
          page: page,
          sort_by: 'popularity.desc'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw error;
    }
  },

  // Film türlerini getir
  getMovieGenres: async () => {
    try {
      const response = await tmdbAxios.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching movie genres:', error);
      throw error;
    }
  },

  // Trend olan filmleri getir
  getTrendingMovies: async (page = 1) => {
    try {
      const response = await tmdbAxios.get('/trending/movie/week', {
        params: {
          page: page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  }
};

tmdbService.searchMovies = tmdbService.search;
export default tmdbService; 