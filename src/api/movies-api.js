import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';

export function fetchTrends() {
  const config = {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTczOTkxN2NlN2Q3ZWU4ZDc5NDQ2YzY3MWEyYTQ2MyIsInN1YiI6IjY1ZWYyMWNiMzA4MTMxMDE2MzIyZTAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mjw5pyH1A1UdEgfWbmjIe8aswcxc8SvNMGdqQddJXEw',
    },
  };

  const response = axios.get('/3/trending/movie/day?language=en-US', config);
  return response;
}
