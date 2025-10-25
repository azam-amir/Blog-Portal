import { App, Button, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../../store/postsStore/postsStore";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";

export default function AddEditPost() {
  const { id } = useParams();

  const { message } = App.useApp();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { data, add, update } = usePostStore();
  const [form] = Form.useForm();

  const getDataById = data?.find((item) => item?.id === id);

  useEffect(() => {
    if (getDataById) {
      form.setFieldsValue({
        post_title: getDataById?.title,
      });
    }
  }, [getDataById, id, form]);

  const onSubmitHandler = async (data) => {
    const payload = {
      title: data?.post_title,
    };
    const updatePayload = {
      ...getDataById,
      title: data?.post_title,
    };
    if (id) {
      try {
        await update(updatePayload);
        message.success("Post is updated successfully!");
        navigate(ROUTE_CONSTANT.POSTS);
      } catch (error) {
        message.error("Something went wrong!");
      }
    } else {
      try {
        await add(payload);
        message.success("Post is created successfully!");
        navigate(ROUTE_CONSTANT.POSTS);
      } catch (error) {
        message.error("Something went wrong!");
      }
    }
  };
  return (
    <div>
      <Title level={3}>Create Post</Title>
      <Form
        form={form}
        onFinish={onSubmitHandler}
        name="basic"
        autoComplete="off"
      >
        <Form.Item
          name="post_title"
          rules={[
            {
              required: true,
              message: "Please input your post title!",
            },
          ]}
        >
          <Input placeholder="Post Title" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
