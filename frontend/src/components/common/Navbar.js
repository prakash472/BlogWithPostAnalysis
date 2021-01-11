import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios";
import jwt_decode from "jwt-decode";

const { Search } = Input;
const navLinks = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
];
var username = "";
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
const Navbar = ({ user }) => {
  const authenticatedUser = checkAuthentication();
  if (authenticatedUser) {
    axiosInstance
      .get(`authenticated/user/details/${authenticatedUser}`)
      .then((res) => {
        username = res.data[0].username;
        console.log("authenticated user");
        console.log(res.data);
        /*   <span className="menu-avatar-name ">{`${user.firstName}`}</span>; */
      });
  }

  console.log(navLinks);
  console.log("navbar check");
  console.log(authenticatedUser);
  let history = useHistory();
  const [menuActive, setMenuActive] = useState(false);
  const onSearch = (value) => {
    axiosInstance.get(`posts/?search=${value}`).then((res) => {
      //const allPosts = res.data;
      history.push({
        pathname: "/posts/",
        search: "?search=" + value,
      });
      window.location.reload();
    });
  };

  return (
    <nav className="site-navigation" role="navigation">
      <span className="menu-title">React Blog</span>
      <div className={`menu-content-container ${menuActive && "active"}`}>
        <ul>
          <Search
            className="searchBar"
            placeholder="Search Post"
            onSearch={onSearch}
            // style={{ width: 200 }}
            enterButton
          />
        </ul>
        <ul>
          {navLinks.map((link) => {
            return (
              <li key={link.id}>
                <Link to={link.path}>{link.title}</Link>
              </li>
            );
          })}
          <li key={6}>
            <Link to={`/author/posts/${authenticatedUser}`}>My Posts</Link>
          </li>
          {authenticatedUser ? (
            <>
              <li key={8}>
                <Link to={"/logout"}>Logout</Link>
              </li>
              <li key={9}>
                <Link to={"/create/post"}>Create Post</Link>
              </li>
            </>
          ) : (
            <>
              <li key={8}>
                <Link to={"/login"}>Login</Link>
              </li>
              <li key={9}>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          )}
        </ul>
        <span className="menu-avatar-container">
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size={38}
          />
          {authenticatedUser ? (
            <span className="menu-avatar-name ">{`${username}`}</span>
          ) : null}
        </span>
      </div>
      <i
        className="ionicons icon ion-ios-menu"
        onClick={() => setMenuActive(!menuActive)}
      ></i>
    </nav>
  );
};

export default Navbar;
