import React from "react";
import ReusableHeader from "../../../common/Header/ReusableHeader";
import CommentsTable from "./CommentsTable/CommentsTable";
import { useNavigate } from "react-router-dom";
import { useCommentsStore } from "../../../store/commentsStore/commentsStore";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import BreadCrumbs from "../../../components/common/BreadCrumbs/BreadCrumbs";

function Comments() {
  const navigate = useNavigate();

  const { data } = useCommentsStore();

  return (
    <div>
      <BreadCrumbs items={[{ title: "Comments" }]} />
      <ReusableHeader
        heading="Comments"
        btnName="+ Add Comments"
        buttonClick={() => navigate(ROUTE_CONSTANT.ADD_COMMENTS)}
      />
      <CommentsTable data={data} />
    </div>
  );
}

export default Comments;
