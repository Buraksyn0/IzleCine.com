import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';

const DeleteMovie = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchMovies = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockMovies = [
          {
            id: 1,
            title: 'Inception',
            genre: 'Sci-Fi',
            year: 2010,
          },
          {
            id: 2,
            title: 'The Dark Knight',
            genre: 'Action',
            year: 2008,
          },
          {
            id: 3,
            title: 'Interstellar',
            genre: 'Sci-Fi',
            year: 2014,
          },
        ];
        
        setMovies(mockMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (movieId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this movie?`);
    
    if (confirmDelete) {
      try {
        setIsLoading(true);
        // In a real app, this would make an API call to delete the movie
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate successful deletion
        setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
        console.log(`Movie with id ${movieId} deleted successfully`);
      } catch (error) {
        console.error('Error deleting movie:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/admin')}
          className="text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-white">Delete Movies</h1>
      </div>

      {/* Movies List */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-300">Loading movies...</div>
        ) : movies.length === 0 ? (
          <div className="p-8 text-center text-gray-300">No movies found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {movies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {movie.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {movie.genre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {movie.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(movie.id)}
                        disabled={isLoading}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteMovie; 