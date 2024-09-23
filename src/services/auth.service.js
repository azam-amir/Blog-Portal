import { AuthUtilsConstant } from "../utilities/util.constant";

const isUserIsLoggedIn = () => {
  const token = getUserToken();
  if (!token) {
    return false;
  }

  return true;
};

const getUserToken = () => {
  const token = localStorage.getItem(AuthUtilsConstant.USER_TOKEN);
  return token;
};

export const AuthService = {
  isUserIsLoggedIn,
  getUserToken,
};
