import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import TagRow from "./TagRow";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const PostGrid = ({ posts, isAuthenticated }) => {
  console.log("In Post Grid");
  console.log(posts);
  console.log(isAuthenticated);
  const [pageSize, setPageSize] = useState(9);
  const [current, setCurrent] = useState(1);

  const paginatedPosts = useMemo(() => {
    const lastIndex = current * pageSize;
    const firstIndex = lastIndex - pageSize;
    return posts.slice(firstIndex, lastIndex);
  }, [current, pageSize, posts]);

  useEffect(() => {
    window.scroll({
      top: 500,
      left: 0,
      behavior: "smooth",
    });
  }, [current, pageSize]);
  return (
    <section className="grid-pagination-container">
      <section className="post-grid container">
        {paginatedPosts.map((post) => {
          return (
            <div className="post-container">
              <figure>
                <Link to={post.link}>
                  <img
                    /*  src={require(`../../assets/images/post_1.jpg`).default} */
                    src={post.image}
                    alt={post.image}
                  ></img>
                </Link>
              </figure>
              <TagRow tags={post.categories} />
              {isAuthenticated === post.author.id ? (
                <div className="tags-container">
                  <Link to={`/edit/post/${post.id}`}>
                    <span
                      className="tag"
                      style={{
                        backgroundColor: "rgb(64,156,255)",
                      }}
                    >
                      <EditOutlined />
                    </span>
                  </Link>
                  <span
                    className="tag"
                    style={{
                      backgroundColor: "rgb(255,45,85)",
                    }}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              ) : null}
              <h2>{post.title}</h2>
              <p className="author-text">
                <span>
                  By-
                  <Link to={`/author/posts/${post.author.id}`}>
                    {post.author.username}
                  </Link>
                </span>
                <span>-{post.date}</span>
              </p>
              <p className="description-text">{post.content.slice(0, 75)}</p>
              <Link to={post.link}>Read More...</Link>
            </div>
          );
        })}
      </section>
      <Pagination
        simple
        showSizeChanger
        onShowSizeChange={setPageSize}
        pageSize={pageSize}
        total={posts.length}
        defaultCurrent={current}
        onChange={setCurrent}
      ></Pagination>
    </section>
  );
};

export default PostGrid;
