export const REMOTE_URL = 'https://auth-mern-0pty.onrender.com'
export const { BASE_URL } = import.meta.env
export const IMG_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5173'
  : import.meta.env.VITE_LOCAL
    ? 'http://localhost:5000'
    : REMOTE_URL
