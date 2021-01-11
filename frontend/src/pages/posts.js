import React, { useState, useEffect } from "react";
import { PostGrid } from "../components/common";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
var authenticatedUser = 0;
//const { Search } = Input;

const Post = () => {
  let history = useHistory();
  const [searchPosts, setSearchPosts] = useState([]);
  console.log(window.location.search);
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
    axiosInstance.get("search/" + window.location.search).then((res) => {
      const allPosts = res.data;
      console.log("Search Posts");
      console.log(res.data);
      setSearchPosts(allPosts);
    });
  }, [window.location.search]);
  return (
    <main className="home">
      {searchPosts.length > 0 ? (
        <section className="bg-white">
          <section className="container">
            <div className="row">
              {searchPosts.length > 1 && <h2>Related Posts</h2>}
              <PostGrid
                posts={searchPosts}
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
export default Post;
