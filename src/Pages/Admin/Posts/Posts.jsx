import React from "react";
import ReusableHeader from "../../../common/Header/ReusableHeader";
import PostsTable from "./PostsTable/PostsTable";

function Posts() {
  return (
    <div>
      <ReusableHeader heading="Posts" btnName="+ Add Posts" />
      <PostsTable />
    </div>
  );
}

export default Posts;
