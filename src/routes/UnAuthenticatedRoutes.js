import React from "react";
import { Routes, Route } from "react-router-dom";
import FrontendLayout from "../components/FrontendLayout/FrontendLayout";
import Home from "../pages/Home";
import PostDetail from "../pages/PostDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UnAuthenticatedRoutesNames } from "../utilities/util.constant";
import CategoryDetail from "../pages/CategoryDetail";
import SearchDetail from "../pages/SearchDetail";

function UnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<FrontendLayout />}>
        <Route path={UnAuthenticatedRoutesNames.HOME} element={<Home />} />
        <Route
          path={UnAuthenticatedRoutesNames.POST_DETAIL}
          element={<PostDetail />}
        />

        <Route
          path={UnAuthenticatedRoutesNames.CATEGORY_DETAIL}
          element={<CategoryDetail />}
        />
        <Route path={UnAuthenticatedRoutesNames.LOGIN} element={<Login />} />
        <Route
          path={UnAuthenticatedRoutesNames.REGISTER}
          element={<Register />}
        />

        <Route
          path={UnAuthenticatedRoutesNames.SEARCH_DETAIL}
          element={<SearchDetail />}
        />
      </Route>
    </Routes>
  );
}

export default UnAuthenticatedRoutes;
