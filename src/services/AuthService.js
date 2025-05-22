import { authUtilsConstants } from "../utilities/UtilConstants";

const isUserLoggedIn = () => {
  const token = getUserToken();
  if (!token) {
    return false;
  }
  return true;
};

const getUserToken = () => {
  const token = localStorage.getItem(authUtilsConstants.USER_TOKEN);
  return token;
};

export const AuthService = {
  isUserLoggedIn,
  getUserToken,
};
