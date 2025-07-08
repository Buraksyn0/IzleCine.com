import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaImage, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../store/watchlistSlice';

const Watchlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageErrors, setImageErrors] = useState({});
  const watchlist = useSelector(state => state.watchlist.items);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleImageError = (movieId) => {
    setImageErrors(prev => ({
      ...prev,
      [movieId]: true
    }));
  };

  const handleRemoveFromWatchlist = (e, movieId) => {
    e.stopPropagation(); // Film detayına gitmeyi engelle
    dispatch(removeFromWatchlist(movieId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white mb-8 transition-all duration-300 hover:scale-105"
        >
          <FaArrowLeft className="mr-2 text-xl" />
          <span className="text-lg font-medium">Geri Dön</span>
        </button>

        <h1 className="text-4xl font-bold mb-8">İzleme Listem</h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">İzleme listenizde henüz film bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group relative"
              >
                <div className="relative aspect-[2/3]">
                  {imageErrors[movie.id] ? (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <FaImage className="text-4xl text-gray-500" />
                    </div>
                  ) : (
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(movie.id)}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-white">{movie.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span>{movie.year}</span>
                    <span>{movie.category}</span>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => handleRemoveFromWatchlist(e, movie.id)}
                  className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  title="İzleme Listesinden Kaldır"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist; 