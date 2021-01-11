import React, { useState, useEffect } from "react";
import trending from "./../assets/mocks/trending";
import featured from "./../assets/mocks/featured";
import { MasonaryPost, PostMasonary, PostGrid } from "../components/common";
import { useFetch } from "./../components/common/useFetch";
import { Switch } from "antd";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

const Home = () => {
  let history = useHistory();
  const [isFilterChecked, setIsFilterChecked] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const trendingPostsURL = "http://localhost:8000/api/recent/posts/";
  const { isLoading, isError, trendingPosts } = useFetch(trendingPostsURL);
  useEffect(() => {
    axiosInstance.get("recent/posts/filtered").then((res) => {
      setFilteredPosts(res.data);
      console.log(filteredPosts);
    });
  }, []);
  console.log(trendingPosts);
  if (isError) {
    return <h2>Error....</h2>;
  }
  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  const trendingConfig = {
    1: {
      gridArea: "1 / 2 / 3 /3",
    },
  };
  const featuredConfig = {
    0: {
      gridArea: "1/1/2/3",
      height: "300px",
    },
    1: {
      height: "300px",
    },
    3: {
      height: "630px",
      width: "630px",
      marginLeft: "30px",
    },
  };
  const recentPosts = trendingPosts;
  const featuredPosts = featured;
  console.log("First Featured Possstssss");
  console.log(featuredPosts);
  console.log("recentPosts" + recentPosts);
  const lastFeatured = {
    id: 20,
    title: "THought to be above average",
    content:
      "I like the way AI works. I am fascinated by its usecase. I would like to move forward with it.",
    date_posted: "2021-01-03T12:35:43.806941Z",
    excerpt: "above average post",
    slug: "thought-to-be-above-average",
    review_positive: 0.9999998211860657,
    image: "/media/posts/rss.JPG",
    author: 1,
    categories: [
      {
        id: 4,
        name: "Cyber-Security",
      },
      {
        id: 5,
        name: "AI",
      },
    ],
    style: {
      height: "630px",
      width: "630px",
      marginLeft: "30px",
    },
  };

  const mergeStyles = (posts, config) => {
    posts.forEach((post, index) => {
      post.style = config[index];
    });
  };

  mergeStyles(trendingPosts, trendingConfig);
  mergeStyles(featuredPosts, featuredConfig);
  mergeStyles(trending, trendingConfig);

  const handleSwitch = () => {
    setIsFilterChecked(!isFilterChecked);
    if (isFilterChecked) {
      window.location.reload();
    }
  };
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <section className="featured-posts-container">
            <PostMasonary
              posts={featuredPosts}
              columns={2}
              test={1}
              tagsOnTop={true}
            />
            <MasonaryPost post={lastFeatured} tagsOnTop={true} />
          </section>
        </div>
      </section>
      {isFilterChecked ? (
        <section className="bg-white">
          <section className="container">
            <div className="row">
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>Recent Posts</h2>
                <Switch
                  checkedChildren="Filter"
                  unCheckedChildren="No-Filter"
                  defaultChecked
                  onClick={handleSwitch}
                />
              </span>
              <PostGrid posts={filteredPosts} />
            </div>
          </section>
        </section>
      ) : (
        <section className="bg-white">
          <section className="container">
            <div className="row">
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>Recent Posts</h2>
                <Switch
                  checkedChildren="Filter"
                  unCheckedChildren="No-Filter"
                  onClick={handleSwitch}
                />
              </span>
              <PostGrid posts={recentPosts} />
            </div>
          </section>
        </section>
      )}
      <section className="container">
        <div className="row">
          <PostMasonary posts={trending} columns={3} test={2} />
        </div>
      </section>
    </main>
  );
};
export default Home;

/* const trendingConfig = {
  1: {
    gridArea: "1 / 2 / 3 /3",
  },
};
const featuredConfig = {
  0: {
    gridArea: "1/1/2/3",
    height: "300px",
  },
  1: {
    height: "300px",
  },
  3: {
    height: "630px",
    width: "630px",
    marginLeft: "30px",
  },
};
const mergeStyles = (posts, config) => {
  posts.forEach((post, index) => {
    post.style = config[index];
    post.author = "Prakash Parajuli";
    post.description =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. ";
  });
};
const recentPosts = [...trending, ...featured, ...trending];
console.log("recentPosts" + recentPosts);

mergeStyles(trending, trendingConfig);
mergeStyles(featured, featuredConfig);

const lastFeatured = featured.pop();

const Home = () => {
  console.log("Featured" + featured);
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <section className="featured-posts-container">
            <PostMasonary
              posts={featured}
              columns={2}
              test={1}
              tagsOnTop={true}
            />
            <MasonaryPost post={lastFeatured} tagsOnTop={true} />
          </section>
        </div>
      </section>
      <section className="bg-white">
        <section className="container">
          <div className="row">
            <h2>Recent Posts</h2>
            <PostGrid posts={recentPosts} />
          </div>
        </section>
      </section>
      <section className="container">
        <div className="row">
          <PostMasonary posts={trending} columns={3} test={2} />
        </div>
      </section>
    </main>
  );
};

export default Home;
 */
