import { ApiService } from "../utilities/Api.service";

const userServicesUrl = {
  login: "/login",
  users: "/users",
};

const login = (data) => {
  const response = ApiService.post(userServicesUrl.login, data);
  return response;
};

const getUsers = () => {
  const response = ApiService.get(userServicesUrl.users);
  return response;
};

const deleteUserById = (userId) => {
  const response = ApiService.delete(`${userServicesUrl.users}/${userId}`);
  return response;
};

export const UserServices = {
  login,
  getUsers,
  deleteUserById,
};
