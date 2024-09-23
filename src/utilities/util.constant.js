export const UnAuthenticatedRoutesNames = {
  HOME: "/",
  POST_DETAIL: "/post/:id",
  CATEGORY_DETAIL: "/category/:id",
  LOGIN: "/login",
  REGISTER: "/register",
  SEARCH_DETAIL: "/search/:searchDetail",
};
export const AuthenticatedRoutesNames = {
  HOME: "admin/",
  CATEGORIES: "/admin/categories",
  CATEGORY_ADD: "/admin/category/add",
  CATEGORY_EDIT: "/admin/category/edit/:id",
  POSTS: "/admin/posts",
  CREATE_POST: "/admin/post/create",
  EDIT_POST: "/admin/post/edit/:postId",
  USERS: "/admin/users",
  COMMENTS: "/admin/comments",
};

export const AuthUtilsConstant = {
  USER_TOKEN: "token",
};
