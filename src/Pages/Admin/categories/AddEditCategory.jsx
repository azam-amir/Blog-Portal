import { Button, Form, Input, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesServices } from "../../../services/categories.services";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";

const { Title } = Typography;

function AddEditCategory() {
  const { id: categoryId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: addCategoryRequest, isLoading: addCategoryLoader } =
    useMutation(CategoriesServices.addCategory);

  const {
    mutateAsync: updateCategoryRequest,
    isLoading: updateCategoryLoader,
  } = useMutation((payload) =>
    CategoriesServices.updateCategory(categoryId, payload)
  );

  const [form] = Form.useForm();

  const { data: editCategoryData, isLoading: editCategoryLoader } = useQuery(
    ["category_id", categoryId],
    () => CategoriesServices.getCategoryById(categoryId)
  );

  useEffect(() => {
    if (categoryId) {
      setIsEditMode(true);
    }
  }, [categoryId]);

  useEffect(() => {
    if (editCategoryData) {
      const singleCategoryData = editCategoryData?.data?.results;
      form.setFieldsValue({
        cat_title: singleCategoryData?.cat_title,
      });
    }
  }, [editCategoryData]);

  const onFinish = (values) => {
    if (isEditMode) {
      updateCategoryRequest(values, {
        onSuccess: () => {
          messageApi.success("category is updated successfully!");
          setTimeout(() => {
            navigate(AuthenticatedRoutesNames.CATEGORIES);
          }, 1000);
        },
      });
    } else {
      addCategoryRequest(values, {
        onSuccess: () => {
          messageApi.success("category is created successfully!");

          setTimeout(() => {
            navigate(AuthenticatedRoutesNames.CATEGORIES);
          }, 1000);
        },
      });
    }
  };
  return (
    <div>
      {contextHolder}
      <Title level={3}>{isEditMode ? "Update" : "Create"} Category</Title>

      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.Item
          name="cat_title"
          rules={[
            {
              required: true,
              message: "Please input your category title!",
            },
          ]}
        >
          <Input placeholder="Category Title" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={
              addCategoryLoader || editCategoryLoader || updateCategoryLoader
            }
          >
            {isEditMode ? "Update" : "Create"} Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddEditCategory;
