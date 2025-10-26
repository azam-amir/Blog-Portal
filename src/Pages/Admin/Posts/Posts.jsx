import React from "react";
import ReusableHeader from "../../../common/Header/ReusableHeader";
import PostsTable from "./PostsTable/PostsTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import { usePostStore } from "../../../store/postsStore/postsStore";
import BreadCrumbs from "../../../components/common/BreadCrumbs/BreadCrumbs";

function Posts() {
  const navigate = useNavigate();

  const { data } = usePostStore();

  return (
    <div>
      <BreadCrumbs items={[{ title: "Posts" }]} />
      <ReusableHeader
        heading="Posts"
        btnName="+ Add Posts"
        buttonClick={() => navigate(ROUTE_CONSTANT.ADD_POSTS)}
      />
      <PostsTable data={data} />
    </div>
  );
}

export default Posts;
