import React, { useMemo } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import GridViewTable from "../../../components/GridViewTable/GridViewTable";
import { Button, Modal, message } from "antd";
import { UtilServices } from "../../../utilities/util.service";
import { useMutation, useQuery } from "react-query";
import { CommentService } from "../../../services/comment.service";
const { confirm } = Modal;
function AdminComments() {
  const [messageApi, messageHtml] = message.useMessage();
  const {
    data: commentData,
    isLoading: commentLoader,
    refetch: refetchAllComments,
  } = useQuery("comments", CommentService.getComments);

  const { mutateAsync: commentDeleteRequest, isLoading: deleteCommentLoader } =
    useMutation(CommentService.deleteCommentById);
  const {
    mutateAsync: approveCommentRequest,
    isLoading: approveCommentLoader,
  } = useMutation(CommentService.approveCommentById);

  const {
    mutateAsync: unapproveCommentRequest,
    isLoading: unapproveCommentLoader,
  } = useMutation(CommentService.unapproveCommentById);

  const deleteCommentHandler = (commentId) => {
    confirm({
      title: "Do you want to delete this comment ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        commentDeleteRequest(commentId, {
          onSuccess: () => {
            refetchAllComments();
            messageApi.success("your comment is deleted successfully!");
          },
        });
      },
    });
  };

  const unApproveBtnHandler = (commentId) => {
    approveCommentRequest(commentId, {
      onSuccess: () => {
        refetchAllComments();
        messageApi.success("your comment is approved successfully!");
      },
    });
  };

  const approveBtnHandler = (commentId) => {
    unapproveCommentRequest(commentId, {
      onSuccess: () => {
        refetchAllComments();
        messageApi.success("your comment is unapproved successfully!");
      },
    });
  };
  const columns = [
    {
      title: "Comment Id",
      key: "commentId",
      render: (singleData) => {
        return singleData.comment_id;
      },
    },
    {
      title: "User Name",
      key: "userName",
      render: (singleData) => {
        if (!singleData?.user?.username) {
          return <p style={{ color: "red" }}>User Not Found!</p>;
        }
        return singleData?.user?.username;
      },
    },
    {
      title: "Post Name",
      key: "postName",
      render: (singleData) => {
        if (!singleData?.post?.post_title) {
          return <p style={{ color: "red" }}>Post Not Found!</p>;
        }
        return singleData?.post?.post_title;
      },
    },

    {
      title: "Comment Content",
      key: "commentContent",
      render: (singleData) => {
        return singleData?.comment_content;
      },
    },

    {
      title: "Comment Status",
      key: "commentStatus",
      render: (singleData) => {
        if (singleData?.comment_status === "approved") {
          return (
            <Button
              type="primary"
              onClick={() => approveBtnHandler(singleData?.comment_id)}
            >
              {singleData?.comment_status?.toUpperCase()}
            </Button>
          );
        } else {
          return (
            <Button
              type="default"
              danger
              onClick={() => unApproveBtnHandler(singleData?.comment_id)}
            >
              {singleData?.comment_status?.toUpperCase()}
            </Button>
          );
        }
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
      title: "Delete",
      key: "delete",
      render: (singleData) => {
        return (
          <Button
            type="default"
            onClick={() => deleteCommentHandler(singleData?.comment_id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const mappedCommentData = useMemo(
    () => commentData?.data?.results,
    [commentData]
  );
  return (
    <div>
      {messageHtml}
      <GridViewTable
        loading={
          commentLoader ||
          deleteCommentLoader ||
          approveCommentLoader ||
          unapproveCommentLoader
        }
        dataSource={mappedCommentData}
        columns={columns}
        heading="Comments"
      />
    </div>
  );
}

export default AdminComments;
