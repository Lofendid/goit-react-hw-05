import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const headers = {
  accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTczOTkxN2NlN2Q3ZWU4ZDc5NDQ2YzY3MWEyYTQ2MyIsInN1YiI6IjY1ZWYyMWNiMzA4MTMxMDE2MzIyZTAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mjw5pyH1A1UdEgfWbmjIe8aswcxc8SvNMGdqQddJXEw',
};

const params = {
  language: 'en-US',
};

const config = {
  headers,
  params,
};

export async function fetchTrends() {
  const res = await axios.get('/trending/movie/day', config);
  return res.data;
}

export async function fetchMovieDetails(movie_id) {
  const res = await axios.get(`/movie/${movie_id}`, config);
  return res.data;
}

export async function fetchMovieReviews(movie_id) {
  const res = await axios.get(`/movie/${movie_id}/reviews`, config);
  return res.data;
}

export async function fetchMovieCast(movie_id) {
  const res = await axios.get(`/movie/${movie_id}/credits`, config);
  return res.data;
}

export async function fetchMoviesByQuery(query) {
  const res = await axios.get(`/search/movie`, {
    ...config,
    params: {
      ...params,
      include_adult: true,
      query,
    },
  });
  return res.data;
}
