import React from "react";
import { useRouteMatch } from "react-router-dom";

const generatePage = (page) => {
  console.log("Generate Page" + page);
  const component = () => require(`./pages/${page}`).default;
  try {
    return React.createElement(component());
  } catch (error) {
    console.warn(error);
    return React.createElement(() => 404);
  }
};
function PageRenderer() {
  // console.log(useParams());
  console.log(useRouteMatch());
  const {
    params: { page },
  } = useRouteMatch();
  // console.log(page);
  return generatePage(page);
}

export default PageRenderer;
