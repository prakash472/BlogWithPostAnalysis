import React, { useState, useEffect } from "react";
import trending from "./../assets/mocks/trending";
import featured from "./../assets/mocks/featured";
import { MasonaryPost, PostMasonary, PostGrid } from "../components/common";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
//const { Search } = Input;

const ContactUS = () => {
  let history = useHistory();
  const [searchPosts, setSearchPosts] = useState([]);
  //const { searchTerm } = useParams();
  console.log(window.location.search);

  useEffect(() => {
    axiosInstance.get("search/" + window.location.search).then((res) => {
      const allPosts = res.data;
      console.log("Search Posts" + res.data);
      setSearchPosts(allPosts);
    });
  }, [window.location.search]);
  return (
    <main className="home">
      {searchPosts.length > 0 ? (
        <section className="bg-white">
          <section className="container">
            <div className="row">
              <h2>Related Posts</h2>
              <PostGrid posts={searchPosts} />
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
export default ContactUS;
