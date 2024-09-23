import { Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { PostServices } from "../../../services/posts.services";
import { UtilServices } from "../../../utilities/util.service";
import GridViewTable from "../../../components/GridViewTable/GridViewTable";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";

function AdminPosts() {
  const {
    data: postData,
    isLoading: getPostLoader,
    refetch: refectPostAgain,
  } = useQuery("posts", PostServices.getPosts);

  const navigate = useNavigate();

  //if we have use before the function name
  //function lekin hook hai
  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading: deletePostLoader, mutateAsync: deletePostRequest } =
    useMutation(PostServices.deletePostById);
  // useMutation((postId) => PostServices.deletePostById(postId));

  const postDataForTable = useMemo(
    () => postData?.data?.results,
    [postData?.data?.results]
  );
  const columns = [
    {
      title: "Id",
      key: "id",
      render: (singleData) => {
        return singleData.id;
      },
    },
    {
      title: "Post Title",
      key: "postTitle",
      render: (singleData) => {
        return singleData.post_title;
      },
    },
    {
      title: "Post Author",
      key: "postAuthor",
      render: (singleData) => {
        return singleData.post_author;
      },
    },
    {
      title: "Post Image",
      key: "postImage",
      render: (singleData) => {
        if (!singleData.image) {
          return <p>No Image Found</p>;
        }
        return (
          <img src={singleData.image} alt={singleData.post_title} width="100" />
        );
      },
    },
    {
      title: "Created At",
      key: "createdAt",
      render: (singleData) => {
        return UtilServices.convertDateToOurFormat(singleData.created_at);
      },
    },
    {
      title: "Updated At",
      key: "updatedAt",
      render: (singleData) => {
        return UtilServices.convertDateToOurFormat(singleData.updated_at);
      },
    },
    {
      title: "Edit",
      key: "edit",
      render: (singlePost) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              navigate(
                AuthenticatedRoutesNames.EDIT_POST.replace(
                  ":postId",
                  singlePost.id
                )
              );
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (singlePost) => {
        return (
          <Button
            type="default"
            onClick={() => deletePostHandler(singlePost.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const deletePostHandler = (postId) => {
    Modal.confirm({
      title: "Do you want to delete this post ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        //delete post work
        deletePostRequest(postId, {
          onSuccess: () => {
            messageApi.success("post is deleted successfully!");
            refectPostAgain();
          },
        });
      },
      onCancel() {},
    });
  };
  return (
    <>
      {contextHolder}

      <GridViewTable
        loading={getPostLoader || deletePostLoader}
        dataSource={postDataForTable}
        columns={columns}
        heading="Posts"
        addBtnText="+ Add Post"
        addBtnClick={() => navigate(AuthenticatedRoutesNames.CREATE_POST)}
      />
    </>
  );
}

export default AdminPosts;
