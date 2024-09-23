import React from "react";
import GridViewTable from "../../../components/GridViewTable/GridViewTable";
import { Button, Modal, message } from "antd";
import { UtilServices } from "../../../utilities/util.service";
import { useMutation, useQuery } from "react-query";
import { UserServices } from "../../../services/users.services";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";

function AdminUsers() {
  const [showMessageFunction, messageHtml] = message.useMessage();
  const {
    data: userData,
    isLoading: userLoading,
    refetch: userRefershCall,
  } = useQuery("users", UserServices.getUsers);

  const { mutateAsync: deleteUserRequest, isLoading: deleteUserLoader } =
    useMutation(UserServices.deleteUserById);

  const deleteUserHandler = (userId) => {
    Modal.confirm({
      title: "Do you want to delete this user ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteUserRequest(userId, {
          onSuccess: () => {
            showMessageFunction.success("user is deleted sucessfully!");
            userRefershCall();
          },
        });
      },
    });
  };
  const columns = [
    {
      title: "User Id",
      key: "userId",
      render: (singleData) => {
        return singleData.user_id;
      },
    },
    {
      title: "User Name",
      key: "userName",
      render: (singleData) => {
        return singleData.username;
      },
    },
    {
      title: "First Name",
      key: "First Name",
      dataIndex: "user_firstname",
    },
    {
      title: "Last Name",
      key: "Last Name",
      dataIndex: "user_lastname",
    },
    {
      title: "Email",
      key: "Email",
      dataIndex: "email",
    },
    {
      title: "User Role",
      key: "userRole",
      dataIndex: "user_role",
    },
    {
      title: "User Image",
      key: "userImage",
      render: (singleData) => {
        if (!singleData.user_image) {
          return <p>No Image Found!</p>;
        }
        return (
          <img
            src={singleData.user_image}
            alt={singleData.username}
            width="100"
          />
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
      render: (singleUser) => {
        return <Button type="primary">Edit</Button>;
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (singleUser) => {
        return (
          <Button
            type="default"
            onClick={() => deleteUserHandler(singleUser.user_id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const mappedUserDaa = userData?.data?.results;
  return (
    <div>
      {messageHtml}
      <GridViewTable
        loading={userLoading || deleteUserLoader}
        dataSource={mappedUserDaa}
        columns={columns}
        heading="Users"
        addBtnText="+ Add User"
        addBtnClick={() => {}}
      />
    </div>
  );
}

export default AdminUsers;
