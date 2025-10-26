import {
  App,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../../store/postsStore/postsStore";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import dayjs from "dayjs";
import BreadCrumbs from "../../../components/common/BreadCrumbs/BreadCrumbs";

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
        postCategory: getDataById?.category,
        postAuthor: getDataById?.author,
        postDate: dayjs(getDataById?.date),
        postContent: getDataById?.content,
        postStatus: getDataById?.status,
        postTags: getDataById?.tags,
        postImage: getDataById?.image,
      });
    }
  }, [getDataById, id, form]);

  const onSubmitHandler = async (values) => {
    const payload = {
      title: values.post_title,
      category: values.postCategory,
      author: values.postAuthor,
      date: values.postDate,
      content: values.postContent,
      status: values.postStatus,
      tags: values.postTags,
      image: values.postImage,
    };

    const updatePayload = { ...getDataById, ...payload };

    try {
      if (id) {
        await update(updatePayload);
        message.success("Post updated successfully!");
      } else {
        await add(payload);
        message.success("Post created successfully!");
      }
      navigate(ROUTE_CONSTANT.POSTS);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  return (
    <div>
      <BreadCrumbs
        items={[
          { title: "Posts", path: ROUTE_CONSTANT.POSTS },
          { title: id ? "Update" : "Create" },
        ]}
      />

      <Title level={3}>{id ? "Edit Post" : "Create Post"}</Title>

      <Form
        layout="vertical"
        form={form}
        onFinish={onSubmitHandler}
        autoComplete="off"
      >
        <Form.Item
          name="post_title"
          label="Post Title"
          rules={[{ required: true, message: "Please enter post title!" }]}
        >
          <Input placeholder="Enter Post Title" />
        </Form.Item>

        <Form.Item
          name="postCategory"
          label="Category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select placeholder="Select Category">
            <Select.Option value="Technology">Technology</Select.Option>
            <Select.Option value="Business">Business</Select.Option>
            <Select.Option value="Lifestyle">Lifestyle</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="postAuthor"
          label="Author"
          rules={[{ required: true, message: "Please enter author name!" }]}
        >
          <Input placeholder="Enter Author Name" />
        </Form.Item>

        <Form.Item
          name="postDate"
          label="Publish Date"
          rules={[{ required: true, message: "Please select date!" }]}
        >
          <DatePicker className="common_date_picker" />
        </Form.Item>

        <Form.Item
          name="postContent"
          label="Content"
          rules={[{ required: true, message: "Please enter post content!" }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="Write your post content here..."
          />
        </Form.Item>

        <Form.Item
          name="postStatus"
          label="Status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select placeholder="Select Status">
            <Select.Option value="Draft">Draft</Select.Option>
            <Select.Option value="Published">Published</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="postTags" label="Tags (comma separated)">
          <Input placeholder="e.g. react, frontend, dev" />
        </Form.Item>

        <Form.Item name="postImage" label="Upload Image">
          <Upload beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? "Update Post" : "Create Post"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
