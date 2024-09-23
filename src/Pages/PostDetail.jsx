/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PostServices } from "../services/posts.services";
import { UtilServices } from "../utilities/util.service";
import { CommentService } from "../services/comment.service";
import { message } from "antd";

function PostDetail() {
  const [commentContent, setCommentContent] = useState("");
  const [messageApi, messageHtml] = message.useMessage();
  const { id: postId } = useParams();

  const { data: getPostByIdData } = useQuery(
    ["posts", postId],
    () => PostServices.getPostById(postId),
    {
      enabled: Boolean(postId),
    }
  );

  const { mutateAsync: storeCommentRequest } = useMutation((payload) =>
    CommentService.storeComment(payload)
  );

  const getPostByIdDataMemo = useMemo(
    () => getPostByIdData?.data?.results,
    [getPostByIdData?.data?.results]
  );

  const storeCommentHandler = (event) => {
    event.preventDefault();
    if (!commentContent) {
      messageApi.error("please enter the comment!");
      return;
    }
    const payload = {
      comment_content: commentContent,
      post_id: postId,
    };
    storeCommentRequest(payload, {
      onSuccess: () => {
        messageApi.success("your comment is deleted successfully!");
      },
    });
  };

  return (
    <div>
      {messageHtml}
      <h1>{getPostByIdDataMemo?.post_title}</h1>

      <p className="lead">
        by <a href="#">{getPostByIdDataMemo?.post_author}</a>
      </p>

      <hr />

      <p>
        <span className="glyphicon glyphicon-time"></span> Posted on
        {UtilServices.convertDateToOurFormat(getPostByIdDataMemo?.post_date)}
      </p>

      <hr />

      {!getPostByIdDataMemo?.image ? (
        <img
          className="img-responsive"
          src="http://placehold.it/900x300"
          alt=""
        />
      ) : (
        <img
          className="img-responsive"
          src={getPostByIdDataMemo?.image}
          alt=""
        />
      )}

      <hr />

      <p className="lead">{getPostByIdDataMemo?.post_content}</p>

      <hr />

      <div className="well">
        <h4>Leave a Comment:</h4>
        <form role="form" onSubmit={storeCommentHandler}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <hr />

      <div className="media">
        <a className="pull-left" href="#">
          <img
            className="media-object"
            src="http://placehold.it/64x64"
            alt=""
          />
        </a>
        <div className="media-body">
          <h4 className="media-heading">
            Start Bootstrap
            <small>August 25, 2014 at 9:30 PM</small>
          </h4>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
