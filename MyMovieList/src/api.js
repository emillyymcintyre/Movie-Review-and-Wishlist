const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovies(search) {
  if (!API_KEY) {
    throw new Error("Missing TMDB API key. Add VITE_TMDB_KEY to your environment.");
  }

  const url = search
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

  console.log("SEARCH:", search);
  console.log("URL:", url);

  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error("Unable to reach TMDB. Check your internet connection and try again.");
  }

  if (!res.ok) {
    let message = `TMDB request failed with status ${res.status}.`;

    try {
      const errorData = await res.json();
      if (errorData?.status_message) {
        message = errorData.status_message;
      }
    } catch {
      // Ignore JSON parsing errors and fall back to the default message.
    }

    throw new Error(message);
  }

  const data = await res.json();

  if (!Array.isArray(data.results)) {
    throw new Error("TMDB returned an unexpected response.");
  }

  return data.results || [];
}
