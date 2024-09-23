import { ApiService } from "../utilities/Api.service";

const CategoriesServiceUrls = {
  getCategoriesUrl: "/categories",
};

const getCategories = () => {
  const response = ApiService.get(CategoriesServiceUrls.getCategoriesUrl);
  return response;
};

const getCategoryById = (categoryId) => {
  const response = ApiService.get(
    `${CategoriesServiceUrls.getCategoriesUrl}/${categoryId}`
  );
  return response;
};

const deleteCategoryById = (categoryId) => {
  const response = ApiService.delete(
    `${CategoriesServiceUrls.getCategoriesUrl}/${categoryId}`
  );
  return response;
};

const addCategory = (payload) => {
  const response = ApiService.post(
    CategoriesServiceUrls.getCategoriesUrl,
    payload
  );
  return response; //promise
};

const updateCategory = (categoryId, payload) => {
  const response = ApiService.put(
    `${CategoriesServiceUrls.getCategoriesUrl}/${categoryId}`,
    payload
  );
  return response; //promise
};

export const CategoriesServices = {
  getCategories,
  getCategoryById,
  deleteCategoryById,
  addCategory,
  updateCategory,
};
