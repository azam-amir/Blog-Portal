import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function AddEditCategories() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { Title } = Typography;

  //   const { mutateAsync: addCategoryRequest } = useMutation(
  //     CategoriesServices.addCategory
  //   );

  // const onFinish = (values) => {
  // addCategoryRequest(values, {
  //   onSuccess: () => {
  //     messageApi.success("Category is created successfully!");
  //     setTimeout(() => {
  //       navigate(AuthenticatedRoutesNames.CATEGORIES);
  //     }, 1000);
  //   },
  //   onError: () => {
  //     messageApi.error("Category is not created!");
  //   },
  // });
  // };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    messageApi.success("Category is created successfully!");
    setTimeout(() => {
      navigate("/categories");
    }, 1000);
  };
  return (
    <div>
      {contextHolder}
      <Title level={3}>Create Category</Title>
      <Form onSubmitCapture={onSubmitHandler} name="basic" autoComplete="off">
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
            Create Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
