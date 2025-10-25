import { Button, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../../../../store/categoryStore/categoryStore";
import { ROUTE_CONSTANT } from "../../../Routes/route.constant";

function CategoryTable({ data }) {
  const navigate = useNavigate();
  const { remove } = useCategoryStore();

  const columns = [
    {
      title: "Category Title",
      id: "title",
      render: (row) => {
        return row?.title || "--";
      },
    },
    {
      title: "Created At",
      id: "createdAt",
      render: (row) => {
        return row?.createdAt
          ? dayjs(row?.createdAt).format("YYYY-MM-DD HH:mm:ss")
          : "--";
      },
    },
    {
      title: "Updated At",
      id: "updatedAt",
      render: (row) => {
        return row?.updatedAt
          ? dayjs(row?.updatedAt).format("YYYY-MM-DD HH:mm:ss")
          : "--";
      },
    },
    {
      title: "Edit",
      id: "edit",
      render: (row) => {
        return (
          <Button
            type="primary"
            onClick={() =>
              navigate(ROUTE_CONSTANT.EDIT_CATEGORY.replace(":id", row?.id))
            }
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      id: "delete",
      render: (row) => {
        return (
          <Popconfirm
            title="Are you sure to delete this user?"
            description="This action cannot be undone."
            okText="Yes"
            cancelText="No"
            onConfirm={() => remove(row?.id)}
            // okButtonProps={{ loading: isLoading }}
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <div
      style={{ marginTop: "50px", background: "white", borderRadius: "15px" }}
    >
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default CategoryTable;
