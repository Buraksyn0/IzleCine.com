import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';

const EditMovies = () => {
  const [movies, setMovies] = useState([
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
    {
      id: 4,
      title: 'The Shawshank Redemption',
      genre: 'Drama',
      year: 1994,
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      genre: 'Crime',
      year: 1994,
    },
  ]);

  const handleDelete = (id) => {
    // In a real app, this would make an API call
    console.log(`Delete movie with id: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Edit Movies</h1>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
                  Actions
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
                    <div className="flex justify-end space-x-3">
                      <Link
                        to={`/admin/edit-movie/${movie.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <Edit2 className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditMovies; 