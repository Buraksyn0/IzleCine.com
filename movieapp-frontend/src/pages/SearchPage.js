import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import tmdbService from '../services/tmdbService';
import MovieRow from '../components/MovieRow';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      try {
        const data = await tmdbService.search(query);
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-2xl font-bold mb-4">“{query}” için Arama Sonuçları:</h1>
      {results.length > 0 ? (
        <MovieRow title="Sonuçlar" movies={results} />
      ) : (
        <p>Sonuç bulunamadı.</p>
      )}
    </div>
  );
};

export default SearchPage;
