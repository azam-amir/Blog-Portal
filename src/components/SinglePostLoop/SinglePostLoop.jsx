/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import { UnAuthenticatedRoutesNames } from "../../utilities/util.constant";
import { UtilServices } from "../../utilities/util.service";

function SinglePostLoop({ singlePost }) {
  const navigate = useNavigate();
  return (
    <>
      <h2>
        <a
          className="cursor-pointer"
          onClick={() => {
            navigate(
              UnAuthenticatedRoutesNames.POST_DETAIL.replace(
                ":id",
                singlePost?.id
              )
            );
          }}
        >
          {singlePost?.post_title}
        </a>
      </h2>
      <p class="lead">
        by <a href="index.php">{singlePost?.post_author}</a>
      </p>
      <p>
        <span class="glyphicon glyphicon-time"></span> Posted on
        {/* 28, 2013 at 10:00 PM */}
        &nbsp; {UtilServices.convertDateToOurFormat(singlePost?.post_date)}
      </p>
      <hr />

      {singlePost?.image ? (
        <img
          onClick={() => {
            navigate(
              UnAuthenticatedRoutesNames.POST_DETAIL.replace(
                ":id",
                singlePost?.id
              )
            );
          }}
          class="img-responsive cursor-pointer"
          src={singlePost?.image}
          alt=""
        />
      ) : (
        <img
          onClick={() => {
            navigate(
              UnAuthenticatedRoutesNames.POST_DETAIL.replace(
                ":id",
                singlePost?.id
              )
            );
          }}
          class="img-responsive cursor-pointer"
          src={"http://placehold.it/900x300"}
          alt=""
        />
      )}

      <hr />

      <p>{singlePost?.post_content}</p>
      <a class="btn btn-primary" href="#">
        Read More <span class="glyphicon glyphicon-chevron-right"></span>
      </a>

      <hr />
    </>
  );
}

export default SinglePostLoop;
