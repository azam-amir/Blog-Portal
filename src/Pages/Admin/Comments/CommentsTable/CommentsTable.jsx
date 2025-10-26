import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../components/common/CustomTable/CustomTable";
import { useCommentsStore } from "../../../../store/commentsStore/commentsStore";
import { ROUTE_CONSTANT } from "../../../Routes/route.constant";

function CommentsTable({ data }) {
  const navigate = useNavigate();
  const { remove } = useCommentsStore();

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (value) => value || "--",
    },
    {
      title: "Post Name",
      dataIndex: "postName",
      key: "postName",
      render: (value) => value || "--",
    },
    {
      title: "Comment Content",
      dataIndex: "commentContent",
      key: "commentContent",
      render: (value) =>
        value?.length > 60 ? value.slice(0, 60) + "..." : value || "--",
    },
    {
      title: "Status",
      dataIndex: "commentStatus",
      key: "commentStatus",
      render: (status) => {
        const color =
          status === "approved"
            ? "green"
            : status === "pending"
            ? "orange"
            : "red";
        return (
          <span
            style={{
              color,
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {status || "--"}
          </span>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        date ? dayjs(date).format("YYYY-MM-DD hh:mm:ss A") : "--",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) =>
        date ? dayjs(date).format("YYYY-MM-DD hh:mm:ss A") : "--",
    },
    {
      title: "Edit",
      key: "edit",
      render: (row) => (
        <Button
          type="primary"
          onClick={() =>
            navigate(ROUTE_CONSTANT.EDIT_COMMENTS.replace(":id", row?.id))
          }
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (row) => (
        <Popconfirm
          title="Are you sure to delete this comment?"
          description="This action cannot be undone."
          okText="Yes"
          cancelText="No"
          onConfirm={() => remove(row?.id)}
        >
          <Button danger type="primary">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="common_table_class">
      <CustomTable dataSource={data} columns={columns} />
    </div>
  );
}

export default CommentsTable;
