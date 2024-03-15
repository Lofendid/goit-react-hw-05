import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

import { fetchMovieDetails } from '../../api/movies-api.js';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import MovieDetails from '../../components/MovieDetails/MovieDetails.jsx';

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const movieDetails = await fetchMovieDetails(movieId);
        setMovieDetails(movieDetails);
      } catch (err) {
        if (err.response.status === 404) {
          navigate('/*');
        } else setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [movieId, navigate, setError]);

  return (
    <>
      <Link to={location.state ?? '/'}>Go back</Link>
      {error && <ErrorMessage msg={error} />}
      {movieDetails && (
        <MovieDetails
          movieDetails={movieDetails}
          errorConfig={{ error, setError }}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}
