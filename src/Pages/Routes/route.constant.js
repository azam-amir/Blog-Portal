import AdminHome from "../Admin/AdminHome";
import AddEditCategories from "../Admin/Caegories/AddEditCategory";
import Categories from "../Admin/Caegories/Categories";
import AddEditComment from "../Admin/Comments/AddEditComments";
import Comments from "../Admin/Comments/Comments";
import LoginPage from "../Admin/LoginPage/LoginPage";
import AddEditPost from "../Admin/Posts/AddEditPost";
import Posts from "../Admin/Posts/Posts";
import AddEditUser from "../Admin/Users/AddEditUser";
import Users from "../Admin/Users/Users";

export const ROUTE_CONSTANT = {
  HOME: "/",
  CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories/add",
  EDIT_CATEGORY: "/categories/:id",
  COMMENTS: "/comments",
  ADD_COMMENTS: "/comments/add",
  EDIT_COMMENTS: "/comments/:id",
  POSTS: "/posts",
  ADD_POSTS: "/posts/add",
  EDIT_POSTS: "/posts/:id",
  USERS: "/users",
  ADD_USERS: "/users/add",
  EDIT_USERS: "/users/:id",
};
export const UNAUTHENTICATED_ROUTE_CONSTANT = {
  LOGIN: "/",
};

export const ROUTES = [
  {
    path: ROUTE_CONSTANT.HOME,
    element: <AdminHome />,
  },
  {
    path: ROUTE_CONSTANT.CATEGORIES,
    element: <Categories />,
  },
  {
    path: ROUTE_CONSTANT.ADD_CATEGORY,
    element: <AddEditCategories />,
  },
  {
    path: ROUTE_CONSTANT.EDIT_CATEGORY,
    element: <AddEditCategories />,
  },
  {
    path: ROUTE_CONSTANT.COMMENTS,
    element: <Comments />,
  },
  {
    path: ROUTE_CONSTANT.ADD_COMMENTS,
    element: <AddEditComment />,
  },
  {
    path: ROUTE_CONSTANT.EDIT_COMMENTS,
    element: <AddEditComment />,
  },
  {
    path: ROUTE_CONSTANT.POSTS,
    element: <Posts />,
  },
  {
    path: ROUTE_CONSTANT.ADD_POSTS,
    element: <AddEditPost />,
  },
  {
    path: ROUTE_CONSTANT.EDIT_POSTS,
    element: <AddEditPost />,
  },
  {
    path: ROUTE_CONSTANT.USERS,
    element: <Users />,
  },
  {
    path: ROUTE_CONSTANT.ADD_USERS,
    element: <AddEditUser />,
  },
  {
    path: ROUTE_CONSTANT.EDIT_USERS,
    element: <AddEditUser />,
  },
];

export const UNAUTHENTICATED_ROUTES = [
  {
    path: UNAUTHENTICATED_ROUTE_CONSTANT.LOGIN,
    element: <LoginPage />,
  },
];
