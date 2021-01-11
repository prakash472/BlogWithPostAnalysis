import { Form, Input, InputNumber, Button, DatePicker, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../axios";

const checkAuthentication = () => {
  var token = localStorage.getItem("access_token");
  if (token) {
    var decoded_token = jwt_decode(token);
    console.log("decoded-token" + decoded_token.user_id);
    const userId = decoded_token.user_id;
    return userId;
  } else {
    return 0;
  }
};

const authenticatedUser = checkAuthentication();
const userId = authenticatedUser;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const EditPost = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { id } = useParams();
  const [formData, updateFormData] = useState({});
  const [totalCategory, setTotalCategory] = useState({}); // This is for when we provide all options because in option we require all of them.
  let newCategory = [];
  useEffect(() => {
    axiosInstance.get("categories/").then((res) => {
      setTotalCategory(res.data);
    });
    axiosInstance.get("customuser/posts/details/" + id).then((res) => {
      updateFormData(res.data);
      const categoryObject = res.data.categories;
      categoryObject.map((category) => {
        const { id, name } = category;
        newCategory = newCategory.concat(id); // This is for display when form loads with data
      });
      console.log(newCategory);
      // console.log(categoryObject);
      form.setFieldsValue({
        title: res.data.title,
        excerpt: res.data.excerpt,
        content: res.data.content,
        image: res.data.image,
        review_positive: res.data.review_positive,
        categories: newCategory,
      });
    });
  }, []);
  console.log(formData.title);

  function slugify(string) {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  const ids = [1, 2, 3];
  const [postImage, setPostImage] = useState(null);
  const reviewURL = "http://127.0.0.1:5000/predict_review";
  var analysedreview = {};
  const config = {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
    },
  };
  const handleFileUpload = (e) => {
    if ([e.target.name] == "image") {
      setPostImage({
        image: e.target.files,
      });
      console.log(e.target.files);
    }
  };
  const handleSubmit = (values) => {
    const initialTitle = values.title.trim();
    const slugifyTitle = slugify(initialTitle);
    axiosInstance.post(reviewURL, { review: values.content }).then((res) => {
      analysedreview = res.data;
      console.log(analysedreview);
    });
    values.slug = slugifyTitle;
    values.author = userId;
    if (values.date_posted === null) {
      values.date_posted = "";
    }
    let finalFormData = new FormData();
    finalFormData.append("title", values.title);
    finalFormData.append("slug", values.slug);
    finalFormData.append("author", values.author);
    finalFormData.append("excerpt", values.excerpt);
    finalFormData.append("content", values.content);
    values.categories.forEach((category) => {
      finalFormData.append("categories", category);
    });
    finalFormData.append("review_positive", analysedreview.predictions[0]);
    if (postImage === null) {
      finalFormData.append("image", formData.image);
    } else {
      finalFormData.append("image", postImage.image[0]);
    }
    axiosInstance
      .put(`customuser/edit/posts/${id}/`, finalFormData, config)
      .then((res) => {
        console.log(res);
        //   history.push("/home/");
      });

    console.log(values);
  };

  return (
    <main className="home">
      <section className="container">
        <div
          className="row"
          style={{
            paddingTop: "10px",
          }}
        >
          <h2>Edit Post</h2>

          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={handleSubmit}
            validateMessages={validateMessages}
            initialValues={formData}
          >
            {console.log(formData)}
            <Form.Item
              name={["title"]}
              label="Title"
              rules={[
                {
                  // required: true,
                },
              ]}
            >
              <Input value={5} />
            </Form.Item>
            <Form.Item
              name={["excerpt"]}
              label="Excerpt"
              rules={[
                {
                  // type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["review_positive"]}
              label="Review_Positive"
              rules={[
                {
                  type: "number",
                },
              ]}
            >
              <InputNumber disabled />
            </Form.Item>
            <Form.Item label="Post Image">
              <img
                src={formData.image}
                style={{ height: "30px", width: "30px" }}
              ></img>
            </Form.Item>
            <input
              accept="image/*"
              id="post-image"
              name="image"
              type="file"
              onChange={handleFileUpload}
              required
              style={{ marginLeft: "300px" }}
            />
            <Form.Item name={["slug"]} label="Slug" hidden>
              <Input />
            </Form.Item>
            <Form.Item name={["author"]} label="Author" hidden>
              <Input disabled />
            </Form.Item>
            <Form.Item name={["content"]} label="Content">
              <Input.TextArea />
            </Form.Item>
            <Form.List
              name="categories"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(
                        new Error("At least 1 category needed")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label="Categories"
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        wrapperCol={{ ...layout.wrapperCol }}
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        noStyle
                      >
                        <Select>
                          {totalCategory.map((category) => {
                            return (
                              <Select.Option value={category.id}>
                                {category.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  {fields.length < 2 ? (
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add Category
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  ) : null}
                </>
              )}
            </Form.List>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </main>
  );
};
export default EditPost;
