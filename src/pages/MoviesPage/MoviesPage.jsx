import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchMoviesByQuery } from '../../api/movies-api.js';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import SearchForm from '../../components/SearchForm/SearchForm.jsx';
import MoviesList from '../../components/MovieList/MovieList.jsx';
import Loading from '../../components/Loading/Loading.jsx';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [params, setParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const movieFilter = params.get('movie') ?? '';
  function setMovieFilter(newFilter) {
    params.set('movie', newFilter);
    setParams(params);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const editedValue = e.target.elements.searchInput.value
      .toLowerCase()
      .trim();

    setMovieFilter(editedValue);

    e.target.reset();
  }

  useEffect(() => {
    if (!movieFilter) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const moviesData = await fetchMoviesByQuery(movieFilter);
        setMovies(moviesData.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [movieFilter, setError]);

  return (
    <>
      {error && <ErrorMessage msg={error} />}
      {!error && <SearchForm handleSubmit={handleSubmit} />}
      {movies && <MoviesList movies={movies} />}
      {isLoading && <Loading />}
    </>
  );
}
