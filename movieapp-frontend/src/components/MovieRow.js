import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/izleCine';

const MovieRow = ({ title, movies = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageErrors, setImageErrors] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef(null);
  const favorites = useSelector(state => state.IzleCineData?.favorites || []);

  const handleMovieClick = (movieId) => {
    if (!movieId) {
      console.error('Movie ID is missing');
      return;
    }
    navigate(`/movie/${movieId}`);
  };

  const handleImageError = (movieId) => {
    setImageErrors(prev => ({ ...prev, [movieId]: true }));
  };

  const handleFavoriteClick = (e, movie) => {
    e.stopPropagation();
    if (!movie || !movie.id) {
      console.error('Invalid movie data for favorite action');
      return;
    }
    
    if (favorites.some(fav => fav.id === movie.id)) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  // Filter out movies without valid IDs
  const validMovies = movies.filter(movie => movie && movie.id);

  if (!validMovies.length) {
    return null; // Don't render if no valid movies
  }

  return (
    <div className="mb-16 relative group">
      <h2 className="text-3xl font-bold mb-6 text-white pl-4 border-l-4 border-red-600">{title}</h2>
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/90 hover:scale-110 transform"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        <div
          ref={rowRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {validMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="flex-none w-[220px] transform transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl group">
                {imageErrors[movie.id] ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <FaImage className="text-4xl text-gray-600" />
                  </div>
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || 'Movie'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => handleImageError(movie.id)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2">{movie.title || 'Unknown Title'}</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • {movie.genre_ids?.map(id => {
                        const genres = {
                          28: 'Aksiyon',
                          12: 'Macera',
                          16: 'Animasyon',
                          35: 'Komedi',
                          80: 'Suç',
                          99: 'Belgesel',
                          18: 'Drama',
                          10751: 'Aile',
                          14: 'Fantastik',
                          36: 'Tarih',
                          27: 'Korku',
                          10402: 'Müzik',
                          9648: 'Gizem',
                          10749: 'Romantik',
                          878: 'Bilim Kurgu',
                          10770: 'TV Filmi',
                          53: 'Gerilim',
                          10752: 'Savaş',
                          37: 'Western'
                        };
                        return genres[id] || '';
                      }).filter(Boolean).join(', ') || 'N/A'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-white font-medium">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                      </div>
                      <button
                        onClick={(e) => handleFavoriteClick(e, movie)}
                        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                          favorites.some(fav => fav.id === movie.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                        }`}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/90 hover:scale-110 transform"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow; 