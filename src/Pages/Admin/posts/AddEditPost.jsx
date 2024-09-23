/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Input,
  Typography,
  Form,
  Select,
  DatePicker,
  message,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { CategoriesServices } from "../../../services/categories.services";
import { PostServices } from "../../../services/posts.services";
import { useNavigate, useParams } from "react-router-dom";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";
import CustomUpload from "../../../components/CustomUpload/CustomUpload";
import moment from "moment/moment";

function AddEditPost() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [saveFile, setSaveFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { postId } = useParams();
  const [messageApi, messageContext] = message.useMessage();
  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    "categories",
    () => CategoriesServices.getCategories()
  );

  const { mutateAsync: createPostRequest, isLoading: createPostLoader } =
    useMutation(PostServices.addPost);

  const { data: getPostByIdData, isLoading: getPostByIdLoader } = useQuery(
    ["posts", postId],
    () => PostServices.getPostById(postId),
    {
      enabled: Boolean(postId),
    }
  );
  // useMutation((payload) => PostServices.addPost(payload));
  // useMutation((payload) => PostServices.addPost(payload,1,2,3,4,6));

  const { mutateAsync: updatePostRequest, isLoading: updatePostLoader } =
    useMutation((payload) => PostServices.updatePostById(postId, payload));

  useEffect(() => {
    if (postId) {
      setIsEditMode(true);
    }
  }, [postId]);

  const categoryDataMapped = useMemo(
    () => categoryData?.data?.results,
    [categoryData?.data?.results]
  );

  const onPostFormSubmit = (values) => {
    // {post_title: "asdasd"}
    // console.log(values, "values");
    const formData = new FormData();
    formData.append("post_title", values?.post_title);
    formData.append("post_category_id", values?.post_category_id);
    formData.append("post_author", values?.post_author);
    formData.append("post_date", values?.post_date);
    formData.append("post_content", values?.post_content);
    formData.append("post_status", values?.post_status);
    formData.append("post_tags", values?.post_tags);

    if (saveFile) {
      formData.append("post_image", saveFile); //append binary file
    }
    if (isEditMode) {
      //Edit Post
      updatePostRequest(formData, {
        onSuccess: () => {
          messageApi.success("post is updated successfully!");
          navigate(AuthenticatedRoutesNames.POSTS);
        },
      });
    } else {
      //Create Post
      //file uploading me hamesha formData jaega qk file binary me hoti hai
      createPostRequest(formData, {
        onSuccess: () => {
          messageApi.success("post is created successfully!");
          navigate(AuthenticatedRoutesNames.POSTS);
        },
      });
    }
  };

  const customRequestCallback = (file) => {
    setSaveFile(file);
  };

  const getPostByIdMappedData = useMemo(
    () => getPostByIdData?.data?.results,
    [getPostByIdData?.data?.results]
  );

  useEffect(() => {
    if (getPostByIdMappedData) {
      form.setFieldsValue({
        post_title: getPostByIdMappedData?.post_title,
        post_author: getPostByIdMappedData?.post_author,
        post_category_id: getPostByIdMappedData?.post_category_id,
        post_content: getPostByIdMappedData?.post_content,
        post_date: moment(getPostByIdMappedData?.post_date),
        post_status: getPostByIdMappedData?.post_status,
        post_tags: getPostByIdMappedData?.post_tags,
      });
    }
  }, [getPostByIdMappedData]);

  return (
    <div>
      {messageContext}
      <Typography.Title level={3}>
        {isEditMode ? "Update" : "Create"} Post
      </Typography.Title>

      <Form
        name="basic"
        autoComplete="off"
        onFinish={onPostFormSubmit}
        form={form}
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

        <Form.Item
          name="post_category_id"
          rules={[
            {
              required: true,
              message: "Please input your post category id!",
            },
          ]}
        >
          <Select placeholder="Post Category" loading={categoryLoading}>
            {categoryDataMapped?.map((singleCategory) => {
              return (
                <Select.Option value={singleCategory.cat_id}>
                  {singleCategory.cat_title}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="post_author"
          rules={[
            {
              required: true,
              message: "Please input your post author!",
            },
          ]}
        >
          <Input placeholder="Post Author" />
        </Form.Item>

        <Form.Item
          name="post_date"
          rules={[
            {
              required: true,
              message: "Please input your post date!",
            },
          ]}
        >
          <DatePicker className="w-100" />
        </Form.Item>

        <Form.Item
          name="post_content"
          rules={[
            {
              required: true,
              message: "Please input your post content!",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Post Content" />
        </Form.Item>

        <Form.Item
          name="post_status"
          rules={[
            {
              required: true,
              message: "Please input your post status!",
            },
          ]}
        >
          <Select placeholder="Post Status">
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="publish">Publish</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="post_tags"
          rules={[
            {
              required: true,
              message: "Please input your post tags !",
            },
          ]}
        >
          <Input placeholder="Post Tags " />
        </Form.Item>

        <Form.Item>
          <CustomUpload customRequestCallback={customRequestCallback} />

          {getPostByIdMappedData?.image ? (
            <img
              src={getPostByIdMappedData?.image}
              alt={getPostByIdMappedData?.post_title}
              width={200}
              style={{ marginTop: 20 }}
            />
          ) : (
            <> {postId && <p>Image Not Found!</p>} </>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={
              createPostLoader ||
              categoryLoading ||
              updatePostLoader ||
              getPostByIdLoader
            }
          >
            {isEditMode ? "Update" : "Create"} Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddEditPost;
