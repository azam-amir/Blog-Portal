import { create } from "apisauce";
import { AuthService } from "../services/auth.service";

const apiSauceInstance = create({
  baseURL: process.env.REACT_APP_API_URL,
});

//singleton instance // singleton design pattern

// https://blog-api-testing.squadcodersdev.com?page=2&size=40

//https://google.com?queryParamOne=1&queryParamTwo=2&queryParamThree=3
const get = (url, queryParams = {}) => {
  const response = apiSauceInstance.get(url, queryParams);
  return response;
};

const post = (url, data) => {
  const response = apiSauceInstance.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Include any other headers your API might require
    },
  });
  return response;
};

const put = (url, data) => {
  const response = apiSauceInstance.put(url, data);
  return response;
};

const patch = (url, data) => {
  const response = apiSauceInstance.patch(url, data);
  return response;
};

const deleteRequest = (url, queryParams) => {
  const response = apiSauceInstance.delete(url, queryParams);
  return response;
};

apiSauceInstance.addRequestTransform((request) => {
  const authenticated = AuthService.isUserIsLoggedIn();
  if (authenticated) {
    request.headers["Authorization"] = `Bearer ${AuthService.getUserToken()}`;
  }
});

export const ApiService = {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
