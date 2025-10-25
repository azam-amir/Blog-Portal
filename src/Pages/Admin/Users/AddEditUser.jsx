import { App, Button, Form, Input, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../../store/usersStore/usersStore";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import { useEffect } from "react";

export default function AddEditUser() {
  const { id } = useParams();

  const { message } = App.useApp();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { data, add, update } = useUserStore();
  const [form] = Form.useForm();

  const getDataById = data?.find((item) => item?.id === id);

  useEffect(() => {
    if (getDataById) {
      form.setFieldsValue({
        user_title: getDataById?.title,
      });
    }
  }, [getDataById, id, form]);

  const onFinish = async (data) => {
    const payload = {
      title: data?.user_title,
    };
    const updatePayload = {
      ...getDataById,
      title: data?.user_title,
    };
    if (id) {
      try {
        await update(updatePayload);
        message.success("User is updated successfully!");
        navigate(ROUTE_CONSTANT.USERS);
      } catch (error) {
        message.error("Something went wrong!");
      }
    } else {
      try {
        await add(payload);
        message.success("User is created successfully!");
        navigate(ROUTE_CONSTANT.USERS);
      } catch (error) {
        message.error("Something went wrong!");
      }
    }
  };
  return (
    <div>
      <Title level={3}>{id ? "Update" : "Create"} User</Title>
      <Form form={form} onFinish={onFinish} name="basic" autoComplete="off">
        <Form.Item
          name="user_title"
          rules={[
            {
              required: true,
              message: "Please input your user title!",
            },
          ]}
        >
          <Input placeholder="User Title" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? "Update" : "Create"} User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
