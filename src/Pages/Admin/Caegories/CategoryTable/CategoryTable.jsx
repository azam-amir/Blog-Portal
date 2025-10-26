import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../components/common/CustomTable/CustomTable";
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
          ? dayjs(row?.createdAt).format("YYYY-MM-DD hh:mm A:ss")
          : "--";
      },
    },
    {
      title: "Updated At",
      id: "updatedAt",
      render: (row) => {
        return row?.updatedAt
          ? dayjs(row?.updatedAt).format("YYYY-MM-DD hh:mm A:ss")
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
    <div className="common_table_class">
      <CustomTable dataSource={data} columns={columns} />
    </div>
  );
}

export default CategoryTable;
