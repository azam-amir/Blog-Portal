import { App, Button, Form, Input, Typography, Select, Upload } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../../store/usersStore/usersStore";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import BreadCrumbs from "../../../components/common/BreadCrumbs/BreadCrumbs";

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
        userName: getDataById?.userName,
        firstName: getDataById?.firstName,
        lastName: getDataById?.lastName,
        email: getDataById?.email,
        userRole: getDataById?.userRole,
        userImage: getDataById?.userImage,
      });
    }
  }, [getDataById, id, form]);

  const onFinish = async (values) => {
    const payload = {
      userName: values?.userName,
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      userRole: values?.userRole,
      userImage: values?.userImage,
    };

    const updatePayload = { ...getDataById, ...payload };

    try {
      if (id) {
        await update(updatePayload);
        message.success("User updated successfully!");
      } else {
        await add(payload);
        message.success("User created successfully!");
      }
      navigate(ROUTE_CONSTANT.USERS);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  return (
    <div>
      <BreadCrumbs
        items={[
          { title: "Users", path: ROUTE_CONSTANT.USERS },
          { title: id ? "Update" : "Create" },
        ]}
      />
      <Title level={3}>{id ? "Update" : "Create"} User</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="userName"
          label="Username"
          rules={[{ required: true, message: "Please enter username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please enter first name!" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please enter last name!" }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="userRole"
          label="User Role"
          rules={[{ required: true, message: "Please select user role!" }]}
        >
          <Select placeholder="Select role">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="editor">Editor</Select.Option>
            <Select.Option value="viewer">Viewer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="userImage" label="User Image">
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false} // prevent auto-upload
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
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
