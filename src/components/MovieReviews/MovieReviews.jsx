import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { fetchMovieReviews } from '../../api/movies-api.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import Loading from '../Loading/Loading.jsx';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { error, setError } = useOutletContext();

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const movieReviews = await fetchMovieReviews(movieId);
        setMovieReviews(movieReviews);
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
      {movieReviews && (
        <ul>
          {movieReviews.results.map(result => {
            const cleanContent = result.content.replace(/<\/?[^>]+(>|$)/g, '');
            return (
              <li key={result.id}>
                <ul>
                  <li>
                    <p>
                      <span>Author:</span> {result.author}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Review:</span> {cleanContent}
                    </p>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      )}
      {movieReviews && movieReviews.total_results === 0 && (
        <p>This movie has no reviews yet.</p>
      )}
      {isLoading && <Loading />}
    </>
  );
}
