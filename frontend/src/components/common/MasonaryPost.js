import React from "react";
import { Content } from "antd/lib/layout/layout";
import { TagRow } from "./";

const MasonaryPost = (props) => {
  const { post, tagsOnTop } = props;
  const windowWidth = window.innerWidth;
  console.log("In MAsonay Post");
  console.log(post);

  const imageBackground = {
    /*     backgroundImage: `url("${
      require(`../../assets/images/${post.image}`).default
    }")`, */
    backgroundImage: `url("http://localhost:8000${post.image}")`,
  };

  const style =
    windowWidth > 900 ? { ...imageBackground, ...post.style } : imageBackground;
  console.log(post);
  return (
    <a className="masonary-post overlay" style={style} href={post.link}>
      <div
        className="image-text"
        style={{ justifyContent: tagsOnTop ? "space-between" : "flex-end" }}
      >
        <TagRow tags={post.categories}></TagRow>
        <div>
          <h2 className="image-title">{post.title}</h2>
          <span className="image-date">{post.date}</span>
        </div>
      </div>
    </a>
  );
};

export default MasonaryPost;

// <img src={backImage} alt={post.title}></img>
