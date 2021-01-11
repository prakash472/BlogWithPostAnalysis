import React from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { MailTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const handleSubmit = (values) => {
    console.log(values);
    axiosInstance
      .post("token/", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT" + localStorage.getItem("access_token");
        history.push("/");
      });
  };
  return (
    <main className="home">
      <section className="container">
        <div
          className="row"
          style={{
            paddingTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form
            style={{
              height: "300px",
            }}
            name="normal_login"
            className="login-form"
            initialValues={{ email: "", password: "" }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailTwoTone className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="#">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              Or <Link to="/register">Create an Account!</Link>
            </Form.Item>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Login;
