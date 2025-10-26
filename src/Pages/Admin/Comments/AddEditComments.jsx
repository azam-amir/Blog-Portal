import { App, Button, Form, Input, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCommentsStore } from "../../../store/commentsStore/commentsStore";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import BreadCrumbs from "../../../components/common/BreadCrumbs/BreadCrumbs";

export default function AddEditComment() {
  const { id } = useParams();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { data, add, update } = useCommentsStore();
  const [form] = Form.useForm();

  const getDataById = data?.find((item) => item?.id === id);

  useEffect(() => {
    if (getDataById) {
      form.setFieldsValue({
        userName: getDataById?.userName,
        postName: getDataById?.postName,
        commentContent: getDataById?.commentContent,
        commentStatus: getDataById?.commentStatus,
      });
    }
  }, [getDataById, id, form]);

  const onFinish = async (values) => {
    const payload = {
      userName: values?.userName,
      postName: values?.postName,
      commentContent: values?.commentContent,
      commentStatus: values?.commentStatus,
    };

    const updatePayload = { ...getDataById, ...payload };

    try {
      if (id) {
        await update(updatePayload);
        message.success("Comment updated successfully!");
      } else {
        await add(payload);
        message.success("Comment created successfully!");
      }
      navigate(ROUTE_CONSTANT.COMMENTS);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  return (
    <div>
      <BreadCrumbs
        items={[
          { title: "Comments", path: ROUTE_CONSTANT.COMMENTS },
          { title: id ? "Update" : "Create" },
        ]}
      />
      <Title level={3}>{id ? "Update" : "Create"} Comment</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="userName"
          label="User Name"
          rules={[{ required: true, message: "Please enter user name!" }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>

        <Form.Item
          name="postName"
          label="Post Name"
          rules={[{ required: true, message: "Please enter post name!" }]}
        >
          <Input placeholder="Enter post name" />
        </Form.Item>

        <Form.Item
          name="commentContent"
          label="Comment Content"
          rules={[{ required: true, message: "Please enter comment content!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter comment content" />
        </Form.Item>

        <Form.Item
          name="commentStatus"
          label="Comment Status"
          rules={[{ required: true, message: "Please select comment status!" }]}
        >
          <Select placeholder="Select status">
            <Select.Option value="approved">Approved</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="rejected">Rejected</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? "Update" : "Create"} Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
