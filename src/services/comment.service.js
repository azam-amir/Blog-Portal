import { ApiService } from "../utilities/Api.service";

const commentUrl = {
  name: "comments",
};

const getComments = () => {
  const response = ApiService.get(commentUrl.name);
  return response;
};

const storeComment = (payload) => {
  const response = ApiService.post(commentUrl.name, payload);
  return response;
};

const deleteCommentById = (commentId) => {
  const response = ApiService.delete(`${commentUrl.name}/${commentId}`);
  return response;
};

const approveCommentById = (commentId) => {
  const response = ApiService.get(`${commentUrl.name}/approve/${commentId}`);
  return response;
};
const unapproveCommentById = (commentId) => {
  const response = ApiService.get(`${commentUrl.name}/unapprove/${commentId}`);
  return response;
};

export const CommentService = {
  getComments,
  deleteCommentById,
  approveCommentById,
  unapproveCommentById,
  storeComment,
};
