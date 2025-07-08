import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdbService from '../services/tmdbService';
import '../styles/DetailsPage.css';

const DetailsPage = () => {
  const { id, type } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = type === 'movie' 
          ? await tmdbService.getMovieDetails(id)
          : await tmdbService.getTVShowDetails(id);
        setDetails(data);
        setError(null);
      } catch (err) {
        setError('Detaylar yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="error-container">
        <p>İçerik bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="backdrop-container">
        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt={details.title || details.name}
          className="backdrop-image"
        />
        <div className="backdrop-overlay"></div>
      </div>

      <div className="content-container">
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title || details.name}
            className="poster-image"
          />
        </div>

        <div className="info-container">
          <h1 className="title">{details.title || details.name}</h1>
          
          <div className="meta-info">
            <span className="rating">
              <i className="fas fa-star"></i> {typeof details.vote_average === 'number' && !isNaN(details.vote_average) ? details.vote_average.toFixed(1) : '-'}
            </span>
            <span className="year">
              {type === 'movie' 
                ? new Date(details.release_date).getFullYear()
                : new Date(details.first_air_date).getFullYear()}
            </span>
            <span className="runtime">
              {type === 'movie' 
                ? `${details.runtime} dakika`
                : `${details.episode_run_time?.[0] || 0} dakika`}
            </span>
          </div>

          <p className="overview">{details.overview}</p>

          <div className="genres">
            {Array.isArray(details.genres) && details.genres.length > 0 ? (
              details.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))
            ) : null}
          </div>

          {details.credits && (
            <div className="cast-section">
              <h2>Oyuncular</h2>
              <div className="cast-list">
                {details.credits.cast.slice(0, 6).map(actor => (
                  <div key={actor.id} className="cast-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="cast-image"
                    />
                    <p className="cast-name">{actor.name}</p>
                    <p className="cast-character">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {details.videos && details.videos.results.length > 0 && (
            <div className="trailer-section">
              <h2>Fragman</h2>
              <div className="trailer-container">
                <iframe
                  src={`https://www.youtube.com/embed/${details.videos.results[0].key}`}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                  className="trailer-video"
                ></iframe>
              </div>
            </div>
          )}

          {details.similar && (
            <div className="similar-section">
              <h2>Benzer İçerikler</h2>
              <div className="similar-list">
                {details.similar.results.slice(0, 6).map(item => (
                  <div key={item.id} className="similar-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                      alt={item.title || item.name}
                      className="similar-image"
                    />
                    <p className="similar-title">{item.title || item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
