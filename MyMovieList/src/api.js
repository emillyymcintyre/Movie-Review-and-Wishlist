const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovies(search) {
  const endpoint = search
    ? `/search/movie?query=${search}`
    : `/movie/popular`;

  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results || [];
}