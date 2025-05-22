import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom/dist";
import AdminHome from "../Admin/AdminHome";
import { Route, Routes } from "react-router-dom/dist";
import MainLayout from "../../components/Layout/Layout";
import Categories from "../Admin/Caegories/Categories";
import Comments from "../Admin/Comments/Comments";
import Posts from "../Admin/Posts/Posts";
import Users from "../Admin/Users/Users";
import AddEditCategories from "../Admin/Caegories/AddEditCategory";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<AdminHome />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/category_add_edit" element={<AddEditCategories />} />
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
