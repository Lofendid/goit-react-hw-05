import css from './MovieDetails.module.css';

import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import Loading from '../Loading/Loading';

export default function MovieDetails({ movieDetails, errorConfig }) {
  function navStyles({ isActive }) {
    if (isActive) return css.active;
    else return css.NavLink;
  }

  return (
    <div className={css.detailsContainer}>
      <h2>{movieDetails.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt="movie poster"
      />
      <ul>
        <li>
          <p>
            <span>Tagline:</span> {movieDetails.tagline}
          </p>
        </li>
        <li>
          <p>
            <span>Release Date:</span> {movieDetails.release_date}
          </p>
        </li>
        <li>
          <p>
            <span>Genres:</span>{' '}
            {movieDetails.genres.map(genre => genre.name + ' ')}
          </p>
        </li>
        <li>
          <p>
            <span>Description:</span> {movieDetails.overview}
          </p>
        </li>
        <li>
          <p>
            <span>Original Languages:</span>{' '}
            {movieDetails.spoken_languages.map(lang => lang.name + ' ')}
          </p>
        </li>
        <li>
          <p>
            <span>Rating:</span>{' '}
            {Math.round(movieDetails.vote_average * 10) / 10}
          </p>
        </li>
      </ul>

      <ul className={css.navContainer}>
        <li>
          <NavLink to="reviews" className={navStyles}>
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="cast" className={navStyles}>
            Cast
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loading />}>
        <Outlet context={errorConfig} />
      </Suspense>
    </div>
  );
}
