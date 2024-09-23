import { ApiService } from "../utilities/Api.service";

const PostServicesUrls = {
  getPosts: "/posts",
};

const getPosts = () => {
  const response = ApiService.get(PostServicesUrls.getPosts);
  return response;
};

const getPostById = (postId) => {
  const response = ApiService.get(`${PostServicesUrls.getPosts}/${postId}`);
  return response;
};

const deletePostById = (postId) => {
  const response = ApiService.delete(`${PostServicesUrls.getPosts}/${postId}`);
  return response;
};

const addPost = (payload) => {
  const response = ApiService.post(PostServicesUrls.getPosts, payload);
  return response;
};

const updatePostById = (postId, payload) => {
  const response = ApiService.put(
    `${PostServicesUrls.getPosts}/${postId}`,
    payload
  );
  return response;
};

export const PostServices = {
  getPosts,
  getPostById,
  deletePostById,
  addPost,
  updatePostById,
};
