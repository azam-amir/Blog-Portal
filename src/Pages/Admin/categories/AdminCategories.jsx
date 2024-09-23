import { Button, Modal,  message } from "antd";
import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CategoriesServices } from "../../../services/categories.services";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";
import { UtilServices } from "../../../utilities/util.service";
import GridViewTable from "../../../components/GridViewTable/GridViewTable";
const { confirm } = Modal;
// const dataSource = [
//   {
//     cat_id: 17,
//     cat_title: "Prof. Kyler Bruen",
//     created_at: "2022-11-17T15:42:40.000000Z",
//     updated_at: "2022-11-17T15:42:40.000000Z",
//   },
//   {
//     cat_id: 19,
//     cat_title: "Wilfrid Johnson",
//     created_at: "2022-11-17T15:42:40.000000Z",
//     updated_at: "2022-11-17T15:42:40.000000Z",
//   },
// ];

function AdminCategories() {
  const navigate = useNavigate();
  const {
    data: categoryData,
    isLoading: categoryLoading,
    refetch: categoryRefresh,
  } = useQuery("categories", () => CategoriesServices.getCategories());
  const [messageApi, contextHolder] = message.useMessage();

  const {
    mutateAsync: deleteCategoryRequest,
    isLoading: categoryDeletingLoader,
  } = useMutation(CategoriesServices.deleteCategoryById);

  const catData = useMemo(
    () => categoryData?.data?.results,
    [categoryData?.data?.results]
  );

  const deleteCategory = (singleCategory) => {
    const { cat_id: categoryId } = singleCategory;
    confirm({
      title: "Do you want to delete this category ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteCategoryRequest(categoryId, {
          onSuccess: () => {
            messageApi.success("category is deleted sucessfully!");
            categoryRefresh();
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Id",
      key: "id",
      render: (singleData) => {
        return singleData.cat_id;
      },
    },
    {
      title: "Category Title",
      key: "categoryTitle",
      render: (singleData) => {
        return singleData.cat_title;
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
      render: (singleCategory) => {
        return (
          <Button
            type="primary"
            onClick={() =>
              navigate(
                AuthenticatedRoutesNames.CATEGORY_EDIT.replace(
                  ":id",
                  singleCategory.cat_id
                )
              )
            }
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (singleCategory) => {
        return (
          <Button type="default" onClick={() => deleteCategory(singleCategory)}>
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <GridViewTable
        loading={categoryLoading || categoryDeletingLoader}
        dataSource={catData}
        columns={columns}
        heading="Categories"
        addBtnText="+ Add Category"
        addBtnClick={() => {
          navigate(AuthenticatedRoutesNames.CATEGORY_ADD);
        }}
      />
    </div>
  );
}

export default AdminCategories;
