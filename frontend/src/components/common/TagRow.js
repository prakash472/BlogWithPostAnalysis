import React from "react";
import categoryColors from "./styles";
const TagRow = ({ tags }) => {
  console.log("Tags" + tags);
  return (
    <div className="tags-container">
      {tags.map((tag, ind) => {
        return (
          <span
            key={ind}
            className="tag"
            style={{
              backgroundColor: categoryColors[tag.name.replace(/-|\s/g, "")],
            }}
          >
            {console.log("Tag Name " + tag.name.replace(/-|\s/g, ""))}
            {tag.name.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
};
export default TagRow;
