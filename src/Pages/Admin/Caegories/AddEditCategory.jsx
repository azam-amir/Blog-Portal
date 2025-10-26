import { App, Button, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryStore } from "../../../store/categoryStore/categoryStore";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import BreadCrumbs from "../../../components/common/BreadCrumbs/BreadCrumbs";

export default function AddEditCategories() {
  const { id } = useParams();

  const { message } = App.useApp();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { data, add, update } = useCategoryStore();
  const [form] = Form.useForm();

  const getDataById = data?.find((item) => item?.id === id);

  useEffect(() => {
    if (getDataById) {
      form.setFieldsValue({
        cat_title: getDataById?.title,
      });
    }
  }, [getDataById, id, form]);

  const onSubmitHandler = async (data) => {
    const payload = {
      title: data?.cat_title,
    };
    const updatePayload = {
      ...getDataById,
      title: data?.cat_title,
    };
    if (id) {
      try {
        await update(updatePayload);
        message.success("Category is updated successfully!");
        navigate(ROUTE_CONSTANT.CATEGORIES);
      } catch (error) {
        message.error("Something went wrong!");
      }
    } else {
      try {
        await add(payload);
        message.success("Category is created successfully!");
        navigate(ROUTE_CONSTANT.CATEGORIES);
      } catch (error) {
        message.error("Something went wrong!");
      }
    }
  };
  return (
    <div>
      <BreadCrumbs
        items={[
          { title: "Category", path: ROUTE_CONSTANT.CATEGORIES },
          { title: id ? "Update" : "Create" },
        ]}
      />

      <Title level={3}>{id ? "Update" : "Create"} Category</Title>
      <Form
        form={form}
        onFinish={onSubmitHandler}
        name="basic"
        autoComplete="off"
      >
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
          <Button type="primary" htmlType="submit">
            {id ? "Update" : "Create"} Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
