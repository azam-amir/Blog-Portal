import { create } from "apisauce";

const apiSauceInstance = create({
  baseURL: process.env.REACT_APP_API_URL,
});
const get = (url, queryParams = {}) => {
  const response = apiSauceInstance.get(url, queryParams);
  return response;
};
const post = (url, data = {}) => {
  const response = apiSauceInstance.post(url, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return response;
};
const put = (url, data = {}) => {
  const response = apiSauceInstance.put(url, data);
  return response;
};
const petch = (url, data = {}) => {
  const response = apiSauceInstance.petch(url, data);
  return response;
};
const deleteRequest = (url, queryParams) => {
  const response = apiSauceInstance.delete(url, queryParams);
  return response;
};
