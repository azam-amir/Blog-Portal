import { AuthUtilsConstant } from "./util.constant";

const saveToken = (token) => {
  if (!token) {
    return;
  }
  localStorage.setItem(AuthUtilsConstant.USER_TOKEN, token);
};

const removeToken = () => {
  localStorage.removeItem(AuthUtilsConstant.USER_TOKEN);
};

export const AuthUtils = {
  saveToken,
  removeToken,
};
