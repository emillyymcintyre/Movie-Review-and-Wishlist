const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovies(search) {
  const url = search
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    console.log("SEARCH:", search);
console.log("URL:", url);

  const res = await fetch(url);
  const data = await res.json();

  return data.results || [];
}