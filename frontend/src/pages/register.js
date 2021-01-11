import React from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { MailTwoTone } from "@ant-design/icons";
const Register = () => {
  const history = useHistory();
  const handleSubmit = (values) => {
    // e.preventDefault();
    console.log(values);
    axiosInstance
      .post("user/create/", {
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        history.push("/login");
        console.log(res);
        console.log(res.data);
      });
  };
  console.log("In Register Page");
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
            initialValues={{ email: "", username: "", password: "" }}
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
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="username"
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
                Sign Up
              </Button>
              Or <Link to="/login">Already have an Account!</Link>
            </Form.Item>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Register;
