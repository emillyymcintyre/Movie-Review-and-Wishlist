const DEFAULT_USERS = [
  { username: "admin", password: "macy123" },
  
];

const CURRENT_USER_KEY = "user";
const LEGACY_WATCHLIST_KEY = "watchlist";
const LEGACY_RATINGS_KEY = "ratingsData";

function getUsers() {
  const stored = localStorage.getItem("users");
  if (stored) return JSON.parse(stored);
  // First load — seed with default users
  localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function login(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, username);
    return true;
  }
  return false;
}

export function register(username, password) {
  const users = getUsers();
  if (users.find((u) => u.username === username)) {
    return { success: false, error: "Username already taken." };
  }
  saveUsers([...users, { username, password }]);
  localStorage.setItem(CURRENT_USER_KEY, username);
  return { success: true };
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getStoredUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function getWatchlistStorageKey(username) {
  return username ? `watchlist:${username}` : null;
}

export function getStoredWatchlist(username) {
  if (!username) return [];

  const watchlistKey = getWatchlistStorageKey(username);
  const storedWatchlist = localStorage.getItem(watchlistKey);

  if (storedWatchlist) {
    return JSON.parse(storedWatchlist);
  }

  const legacyWatchlist = localStorage.getItem(LEGACY_WATCHLIST_KEY);
  if (legacyWatchlist) {
    const parsedWatchlist = JSON.parse(legacyWatchlist);
    localStorage.setItem(watchlistKey, legacyWatchlist);
    return parsedWatchlist;
  }

  return [];
}

export function saveStoredWatchlist(username, watchlist) {
  if (!username) return;

  localStorage.setItem(
    getWatchlistStorageKey(username),
    JSON.stringify(watchlist)
  );
}

export function getRatingsStorageKey(username) {
  return username ? `ratings:${username}` : null;
}

export function getStoredRatingsData(username) {
  if (!username) {
    return { ratings: {}, reviews: {} };
  }

  const ratingsKey = getRatingsStorageKey(username);
  const storedRatingsData = localStorage.getItem(ratingsKey);

  if (storedRatingsData) {
    return JSON.parse(storedRatingsData);
  }

  const legacyRatingsData = localStorage.getItem(LEGACY_RATINGS_KEY);
  if (legacyRatingsData) {
    const parsedRatingsData = JSON.parse(legacyRatingsData);
    localStorage.setItem(ratingsKey, legacyRatingsData);
    return {
      ratings: parsedRatingsData.ratings || {},
      reviews: parsedRatingsData.reviews || {},
    };
  }

  return { ratings: {}, reviews: {} };
}

export function saveStoredRatingsData(username, ratingsData) {
  if (!username) return;

  localStorage.setItem(
    getRatingsStorageKey(username),
    JSON.stringify({
      ratings: ratingsData.ratings || {},
      reviews: ratingsData.reviews || {},
    })
  );
}
