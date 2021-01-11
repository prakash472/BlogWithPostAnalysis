import { useState, useEffect, useCallback } from "react";
export const useFetch = (postsURL) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [trendingPosts, setPosts] = useState([]);
  const getPosts = useCallback(async () => {
    const response = await fetch(postsURL);
    console.log(response.status);
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    } else {
      setIsError(true);
      setIsLoading(false);
      throw new Error(response.statusText);
    }
  }, [postsURL]);
  useEffect(() => {
    getPosts();
  }, [postsURL, getPosts]);
  return { isLoading, isError, trendingPosts };
};
