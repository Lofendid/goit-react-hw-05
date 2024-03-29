import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { fetchMovieCast } from '../../api/movies-api.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import Loading from '../Loading/Loading.jsx';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { error, setError } = useOutletContext();

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const movieCast = await fetchMovieCast(movieId);
        setMovieCast(movieCast);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [movieId, setError]);

  return (
    <>
      {error && <ErrorMessage msg={error} />}
      {movieCast && (
        <ul>
          {movieCast.cast.map(actor => {
            return (
              <li key={actor.id}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt="portrait of an actor/actress"
                  />
                </div>
                <ul>
                  <li>
                    <p>
                      <span>{actor.name}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Character:</span> {actor.character}
                    </p>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      )}
      {movieCast && movieCast.cast.length === 0 && (
        <p>Unnable to find a cast for this movie.</p>
      )}
      {isLoading && <Loading />}
    </>
  );
}
