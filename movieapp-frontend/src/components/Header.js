import React, { useEffect, useState, useMemo } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { RiStarSmileFill } from "react-icons/ri";
import ProfileDropdown from './ProfileDropdown';
import tmdbService from '../services/tmdbService';
import { useTranslation } from 'react-i18next';

const CATEGORY_CONFIG = [
  { key: 'popular', label: 'Popüler', fetch: () => tmdbService.getPopularMovies() },
  { key: 'trending', label: 'Trend', fetch: () => tmdbService.getTrendingMovies() },
  { key: 'action', label: 'Aksiyon', fetch: () => tmdbService.getMoviesByGenre(28) },
  { key: 'comedy', label: 'Komedi', fetch: () => tmdbService.getMoviesByGenre(35) },
  { key: 'drama', label: 'Drama', fetch: () => tmdbService.getMoviesByGenre(18) },
];

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_CONFIG[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Login state takip
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('user'));
    window.addEventListener('storage', checkLogin);
    window.addEventListener('userChanged', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('userChanged', checkLogin);
    };
  }, []);

  // Sayfa değiştiğinde kategori sıfırla
  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedCategory(CATEGORY_CONFIG[0]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Kategoriye göre yönlendir
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    navigate(`/category/${cat.key}`);
  };

  // Arama gönder
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSuggestions([]);
    }
  };

  // Otomatik tamamlama (suggestions)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const query = searchInput.trim();
      if (query.length >= 3) {
        setLoadingSuggestions(true);
        tmdbService.search(query)
          .then(res => setSuggestions(res.results.slice(0, 5)))
          .catch(() => setSuggestions([]))
          .finally(() => setLoadingSuggestions(false));
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  // Arka plan efektleri
  const starElements = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.3,
      className: `star star-${(i % 4) + 1}`
    }));
  }, []);

  const meteorElements = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 1}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${4 + Math.random() * 2}s`
    }));
  }, []);

  return (
    <>
      <header className='fixed top-0 w-full h-16 bg-gradient-to-r from-indigo-900 via-purple-800 to-black bg-opacity-90 shadow-lg shadow-purple-900/40 backdrop-blur-md z-50 transition-all duration-300'>
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          {meteorElements.map((meteor) => (
            <div
              key={meteor.id}
              className="meteor"
              style={{
                top: meteor.top,
                left: meteor.left,
                animationDelay: meteor.animationDelay,
                animationDuration: meteor.animationDuration,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          {starElements.map((star) => (
            <div
              key={star.id}
              className={star.className}
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.animationDelay,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        <div className='container mx-auto px-3 flex items-center h-full'>
          <Link to={"/"} className="transition-transform duration-300 hover:scale-105">
            <img src={logo} alt='logo' width={240} />
          </Link>

          <div className='hidden lg:flex items-center gap-4 ml-5'>
            {CATEGORY_CONFIG.map(cat => (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400/60 border border-transparent backdrop-blur-md
                  ${selectedCategory.key === cat.key
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white hover:shadow-lg'}`}
                style={{ letterSpacing: '0.03em' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className='ml-auto flex items-center gap-5'>
            <form className='relative flex items-center gap-2' onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Search...'
                className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block transition-all duration-300 focus:bg-white/10 rounded-md text-white'
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
              <button type="submit" className='text-2xl text-white transition-all duration-300 hover:scale-110'>
                <IoSearchOutline />
              </button>

              {/* Otomatik öneri listesi */}
              {suggestions.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-white text-black rounded-md shadow-lg z-50 max-h-72 overflow-y-auto">
                  {suggestions.map((movie) => (
                    <li
                      key={movie.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                        setSuggestions([]);
                        setSearchInput('');
                      }}
                    >
                      {movie.title || movie.name}
                    </li>
                  ))}
                </ul>
              )}
            </form>

            <div className="flex items-center gap-3">
              {isLoggedIn && (
                <Link to="/favorites" className="text-white text-xl hover:text-purple-400 transition-all duration-300 hover:scale-110">
                  <RiStarSmileFill />
                </Link>
              )}
              {isLoggedIn ? (
                <ProfileDropdown />
              ) : (
                <Link
                  to="/login"
                  className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {t('Giriş Yap')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
