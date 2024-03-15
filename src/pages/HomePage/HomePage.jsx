import { useEffect, useState } from 'react';

import { fetchTrends } from '../../api/movies-api.js';

import MovieList from '../../components/MovieList/MovieList.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import Loading from '../../components/Loading/Loading.jsx';

export default function Homepage() {
  const [trendMovies, setTrendMovies] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const data = await fetchTrends();
        setTrendMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [setError]);

  return (
    <>
      {error ? <ErrorMessage msg={error} /> : <h2>Tranding today:</h2>}
      {trendMovies && <MovieList movies={trendMovies} />}
      {isLoading && <Loading />}
    </>
  );
}
