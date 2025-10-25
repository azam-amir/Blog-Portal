import { Button, Popconfirm, Table } from "antd";
import { useUserStore } from "../../../../store/usersStore/usersStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANT } from "../../../Routes/route.constant";
import dayjs from "dayjs";

function UsersTable({ data }) {
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();
  const { remove } = useUserStore();

  const columns = [
    {
      title: "User Title",
      id: "title",
      render: (row) => {
        return row?.title || "--";
      },
    },
    {
      title: "Created At",
      id: "createdAt",
      render: (row) => {
        return dayjs(row?.createdAt).format("YYYY-MM-DD HH:mm:ss") || "--";
      },
    },
    {
      title: "Updated At",
      id: "updatedAt",
      render: (row) => {
        return dayjs(row?.updatedAt).format("YYYY-MM-DD HH:mm:ss") || "--";
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
              navigate(ROUTE_CONSTANT.EDIT_USERS.replace(":id", row?.id))
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
            okButtonProps={{ loading: isLoading }}
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
      style={{
        marginTop: "50px",
        background: "white",
        borderRadius: "15px",
      }}
    >
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default UsersTable;
