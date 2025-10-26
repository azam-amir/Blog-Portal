import { Button, Image, Popconfirm, Tag } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../components/common/CustomTable/CustomTable";
import { usePostStore } from "../../../../store/postsStore/postsStore";
import { ROUTE_CONSTANT } from "../../../Routes/route.constant";

function PostsTable({ data }) {
  const navigate = useNavigate();
  const { remove } = usePostStore();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => text || "--",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => text || "--",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (text) => text || "--",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "--"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Published"
            ? "green"
            : status === "Draft"
            ? "orange"
            : "default";
        return <Tag color={color}>{status || "--"}</Tag>;
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) =>
        tags ? (
          <div>
            {tags.split(",").map((tag, index) => (
              <Tag key={index}>{tag.trim()}</Tag>
            ))}
          </div>
        ) : (
          "--"
        ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        if (!image) return "--";

        if (typeof image === "string") {
          return <Image src={image} width={60} height={60} />;
        }
        if (image instanceof File || image instanceof Blob) {
          return (
            <Image src={URL.createObjectURL(image)} width={60} height={60} />
          );
        }
        if (Array.isArray(image) && image[0]?.originFileObj) {
          return (
            <Image
              src={URL.createObjectURL(image[0].originFileObj)}
              width={60}
              height={60}
            />
          );
        }

        return "--";
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        date ? dayjs(date).format("YYYY-MM-DD hh:mm A") : "--",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) =>
        date ? dayjs(date).format("YYYY-MM-DD hh:mm A") : "--",
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            onClick={() =>
              navigate(ROUTE_CONSTANT.EDIT_POSTS.replace(":id", row?.id))
            }
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this post?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => remove(row?.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="common_table_class">
      <CustomTable dataSource={data} columns={columns} />
    </div>
  );
}

export default PostsTable;
