import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { PostGrid } from "../../components/common";
import axiosInstance from "./../../axios";

var authenticatedUser = 0;
const ViewPost = () => {
  const { id } = useParams();
  const [authorPosts, setAuthorPosts] = useState([]);
  var token = localStorage.getItem("access_token");
  if (token) {
    var decoded_token = jwt_decode(token);
    console.log("decoded-token" + decoded_token.user_id);
    const userId = decoded_token.user_id;
    authenticatedUser = userId;
  } else {
    authenticatedUser = false;
  }
  console.log(authenticatedUser);

  useEffect(() => {
    axiosInstance.get("author/posts/" + id).then((res) => {
      const allPosts = res.data;
      console.log("Author Posts");
      console.log(allPosts);
      setAuthorPosts(allPosts);
    });
  }, [id]);
  return (
    <main className="home">
      {authorPosts.length > 0 ? (
        <section className="bg-white">
          <section className="container">
            <div className="row">
              {authorPosts.length > 1 && <h2>Related Posts</h2>}
              <PostGrid
                posts={authorPosts}
                isAuthenticated={authenticatedUser}
              />
            </div>
          </section>
        </section>
      ) : (
        <section className="bg-white">
          <section className="container">
            <div className="row">
              <h2>No Matching Posts Found</h2>
            </div>
          </section>
        </section>
      )}
    </main>
  );
};

export default ViewPost;
