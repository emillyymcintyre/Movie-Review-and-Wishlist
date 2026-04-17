const DEFAULT_USERS = [
  { username: "admin", password: "macy123" },
  
];

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
    localStorage.setItem("user", username);
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
  localStorage.setItem("user", username);
  return { success: true };
}

export function logout() {
  localStorage.removeItem("user");
}

export function getStoredUser() {
  return localStorage.getItem("user");
}