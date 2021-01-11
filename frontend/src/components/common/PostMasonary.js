import React from "react";
import MasonaryPost from "./MasonaryPost";

const PostMasonary = (props) => {
  const { posts, columns, tagsOnTop, test } = props;
  console.log(`${test}`);
  console.log(posts);
  return (
    <section
      className="masonary"
      style={{ gridTemplateColumns: `repeat(${columns},minmax(275px,1fr))` }}
    >
      {posts.map((post) => {
        return <MasonaryPost key={post.id} {...{ post, tagsOnTop }} />;
      })}
    </section>
  );
};

export default PostMasonary;
