import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Select,
  Upload,
} from "antd";
import {
  MinusCircleOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
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

const CreatePost = () => {
  const authenticatedUser = checkAuthentication();
  const userId = authenticatedUser;
  const [totalCategory, setTotalCategory] = useState({});
  const history = useHistory();
  useEffect(() => {
    axiosInstance.get("categories/").then((res) => {
      setTotalCategory(res.data);
    });
  }, []);

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
  const [postImage, setPostImage] = useState(null);
  const ids = [1, 2, 3];
  const [addCategory, setaddCategory] = useState(false);
  const reviewURL = "http://127.0.0.1:5000/predict_review";
  const config = {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
    },
  };
  const postURL = "http://127.0.0.1:8000/api/customuser/create/";
  var analysedreview = {};

  const handleFileUpload = (e) => {
    if ([e.target.name] == "image") {
      setPostImage({
        image: e.target.files,
      });
      console.log(e.target.files);
    }
  };
  const handleSubmit = (values) => {
    console.log(postImage.image[0]);
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
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("author", values.author);
    formData.append("excerpt", values.excerpt);
    formData.append("content", values.content);
    values.categories.forEach((category) => {
      formData.append("categories", category);
    });
    formData.append("review_positive", analysedreview.predictions[0]);
    formData.append("image", postImage.image[0]);
    axios
      .post(postURL, formData, config)
      .then((res) => {
        console.log("Inside post request");
        console.log(res);
        //  history.push("/home/");
      })
      .catch((err) => console.log(err));
    console.log("After");
    console.log(values);
  };
  const add = () => {
    setaddCategory(true);
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
          <h2>Create Post</h2>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={handleSubmit}
            validateMessages={validateMessages}
            initialValues={{
              title: "",
              content: "",
              date_posted: "",
              excerpt: "",
              slug: "",
              review_positive: null,
              image: null,
              author: null,
            }}
          >
            <Form.Item
              name={["title"]}
              label="Title"
              rules={[
                {
                  // required: true,
                },
              ]}
            >
              <Input />
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
            <Form.Item name={["date_posted"]} label="Date">
              <DatePicker />
            </Form.Item>
            <Form.Item
              hidden
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
            <Form.Item label="PostImage"></Form.Item>
            <input
              accept="image/*"
              id="post-image"
              onChange={handleFileUpload}
              name="image"
              type="file"
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
export default CreatePost;
