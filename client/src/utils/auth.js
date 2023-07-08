import decode from 'jwt-decode';

const getProfile = () => {
  const token = getToken();
  if (token) {
    try {
      return decode(token);
    } catch (error) {
      return null;
    }
  }
  return null;
};

const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

const isTokenExpired = (token) => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return true; // Treat any error as an expired token
  }
};

const getToken = () => {
  return localStorage.getItem('id_token');
};

const login = (idToken, email) => {
  localStorage.setItem('id_token', idToken);
  localStorage.setItem('email', JSON.stringify(email));
  window.location.assign('/profile');
};

const logout = () => {
  localStorage.removeItem('id_token');
  window.location.assign('/');
};

const Auth = {
  getProfile,
  loggedIn,
  isTokenExpired,
  getToken,
  login,
  logout,
};

export default Auth;
