import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { removeFromFavorites } from '../store/izleCine';

const Favorites = () => {
  const favorites = useSelector(state => state.IzleCineData.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleRemoveFavorite = (e, movieId) => {
    e.stopPropagation();
    dispatch(removeFromFavorites(movieId));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <FaHeart className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Henüz Favori Filminiz Yok</h2>
          <p className="text-gray-400">Beğendiğiniz filmleri favorilere ekleyerek burada görüntüleyebilirsiniz.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Favori Filmlerim</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="group relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-lg font-semibold mb-2 text-white">{movie.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{movie.year} • {movie.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-white font-medium">{movie.rating}</span>
                    </div>
                    <button
                      onClick={(e) => handleRemoveFavorite(e, movie.id)}
                      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites; 