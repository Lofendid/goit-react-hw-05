// import css from './App.module.css'

import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage.jsx')
);

const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'));

import Navigation from '../Navigation/Navigation.jsx';
import Loading from '../Loading/Loading.jsx';

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="reviews" element={<MovieReviews />}></Route>
            <Route path="cast" element={<MovieCast />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
