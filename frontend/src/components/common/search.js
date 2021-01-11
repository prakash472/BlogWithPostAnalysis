import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const SearchInput = () => {
  // const history = useHistory();
  return (
    <div>
      <Search placeholder="Search Post" style={{ width: 200 }} enterButton />
    </div>
  );
};

export default SearchInput;
