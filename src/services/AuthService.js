import { authUtilsConstants } from "../utilities/UtilConstants";

const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const saveToken = (token) => {
  if (!token) return;
  localStorage.setItem(authUtilsConstants.USER_TOKEN, token);
};

const getUserToken = () => {
  return localStorage.getItem(authUtilsConstants.USER_TOKEN);
};

const removeToken = () => {
  localStorage.removeItem(authUtilsConstants.USER_TOKEN);
};

const addUser = (payload) => {
  const token = generateToken();
  const userData = {
    ...payload,
    token,
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem(
    authUtilsConstants.USER_DETAILS,
    JSON.stringify(userData)
  );
  saveToken(token);
  window.location.href = "/";
  return userData;
};
const getUserDetails = () => {
  const userDetails = localStorage.getItem(authUtilsConstants.USER_DETAILS);
  return userDetails ? JSON.parse(userDetails) : null;
};

const isUserLoggedIn = () => {
  return !!getUserToken();
};

const logout = () => {
  localStorage.removeItem(authUtilsConstants.USER_DETAILS);
  removeToken();
  window.location.href = "/";
};

export const AuthService = {
  isUserLoggedIn,
  addUser,
  logout,
  getUserToken,
  getUserDetails,
};
