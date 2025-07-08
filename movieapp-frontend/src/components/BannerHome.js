import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight, FaStar, FaClock, FaFilm, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const BannerHome = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const bannerRef = useRef(null);
  const featuredMovies = movies.slice(0, 5);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        handleSlideChange((currentSlide + 1) % featuredMovies.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isHovered, featuredMovies.length]);

  const handleSlideChange = (newIndex) => {
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handlePrevSlide = () => {
    handleSlideChange((currentSlide - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const handleNextSlide = () => {
    handleSlideChange((currentSlide + 1) % featuredMovies.length);
  };

  const genres = {
    28: t('Aksiyon'),
    12: t('Macera'),
    16: t('Animasyon'),
    35: t('Komedi'),
    80: t('Suç'),
    99: t('Belgesel'),
    18: t('Drama'),
    10751: t('Aile'),
    14: t('Fantastik'),
    36: t('Tarih'),
    27: t('Korku'),
    10402: t('Müzik'),
    9648: t('Gizem'),
    10749: t('Romantik'),
    878: t('Bilim Kurgu'),
    10770: t('TV Filmi'),
    53: t('Gerilim'),
    10752: t('Savaş'),
    37: t('Western')
  };

  return (
    <div 
      ref={bannerRef}
      className="relative h-[75vh] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute w-full h-full transition-all duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-110'
          }`}
        >
          {/* Full Screen Backdrop with Parallax Effect */}
          <div className="absolute inset-0 transform transition-transform duration-1000 hover:scale-105">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
                {/* Poster with 3D Effect */}
                <div className="w-56 md:w-72 transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative group perspective">
                  <div className="relative transform transition-transform duration-500 group-hover:rotate-y-10">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded-xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full transform hover:scale-110 transition-all duration-300 glow">
                        <FaPlay className="text-white text-xl" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Movie Info with Glassmorphism */}
                <div className="flex-1 text-white max-w-xl backdrop-blur-sm bg-black/20 p-6 rounded-2xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 title-gradient">
                    {movie.title}
                  </h1>

                  {/* Meta Info with Hover Effects */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg transform hover:scale-105 transition-all duration-300">
                      <FaStar className="text-yellow-400 mr-2 animate-pulse" />
                      <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg transform hover:scale-105 transition-all duration-300">
                      <FaClock className="text-gray-400 mr-2" />
                      <span className="font-medium">{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg transform hover:scale-105 transition-all duration-300">
                      <FaFilm className="text-gray-400 mr-2" />
                      <span className="font-medium">{movie.genre_ids?.map(id => {
                        return genres[id] || '';
                      }).filter(Boolean).join(', ')}</span>
                    </div>
                  </div>

                  {/* Overview with Fade Effect */}
                  <p className="text-base md:text-lg mb-6 text-gray-300 line-clamp-2 leading-relaxed">
                    {movie.overview}
                  </p>

                  {/* Action Buttons with Glassmorphism */}
                  <div className="flex gap-3">
                    <Link 
                      to={`/movie/${movie.id}`}
                      className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 hover:shadow-lg button-hover glow"
                    >
                      <FaPlay className="text-lg" />
                      <span className="font-semibold">Fragmanı İzle</span>
                    </Link>
                    <Link 
                      to={`/movie/${movie.id}`}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-md hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg button-hover"
                    >
                      <FaInfoCircle className="text-lg" />
                      <span className="font-semibold">Film Hakkında</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons with Glassmorphism */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={handlePrevSlide}
          className="p-3 bg-black/30 backdrop-blur-sm text-white rounded-r-lg hover:bg-black/50 transition-all duration-300 transform hover:scale-110 glow"
        >
          <FaChevronLeft className="text-xl" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={handleNextSlide}
          className="p-3 bg-black/30 backdrop-blur-sm text-white rounded-l-lg hover:bg-black/50 transition-all duration-300 transform hover:scale-110 glow"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>

      {/* Navigation Dots with Glow Effect */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentSlide 
                ? 'bg-white scale-125 glow' 
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar with Glow */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-800">
        <div 
          className="h-full bg-red-600 transition-all duration-1000 glow"
          style={{ 
            width: `${((currentSlide + 1) / featuredMovies.length) * 100}%`,
            transition: isTransitioning ? 'none' : 'width 5s linear'
          }}
        />
      </div>

      {/* Volume Control with Glassmorphism */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-all duration-300 transform hover:scale-110 glow"
      >
        {isMuted ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
      </button>
    </div>
  );
};

export default BannerHome;
