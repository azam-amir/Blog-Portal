import React from "react";
import { AuthenticatedRoutesNames } from "../utilities/util.constant";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import AdminCategories from "../pages/admin/categories/AdminCategories";
import AddEditCategory from "../pages/admin/categories/AddEditCategory";
import AdminPosts from "../pages/admin/posts/AdminPosts";
import AddEditPost from "../pages/admin/posts/AddEditPost";
import AdminUsers from "../pages/admin/users/AdminUsers";
import AdminComments from "../pages/admin/comments/AdminComments";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path={AuthenticatedRoutesNames.HOME} element={<AdminHome />} />
        <Route
          path={AuthenticatedRoutesNames.CATEGORIES}
          element={<AdminCategories />}
        />

        <Route
          path={AuthenticatedRoutesNames.CATEGORY_ADD}
          element={<AddEditCategory />}
        />

        <Route
          path={AuthenticatedRoutesNames.CATEGORY_EDIT}
          element={<AddEditCategory />}
        />

        <Route path={AuthenticatedRoutesNames.POSTS} element={<AdminPosts />} />

        <Route
          path={AuthenticatedRoutesNames.CREATE_POST}
          element={<AddEditPost />}
        />

        <Route
          path={AuthenticatedRoutesNames.EDIT_POST}
          element={<AddEditPost />}
        />

        <Route path={AuthenticatedRoutesNames.USERS} element={<AdminUsers />} />

        <Route
          path={AuthenticatedRoutesNames.COMMENTS}
          element={<AdminComments />}
        />
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
