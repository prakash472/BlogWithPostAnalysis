import Navbar from "./components/common/Navbar";
import CreatePost from "./pages/users/create-post";
import EditPost from "./pages/users/edit-post";
import DeletePost from "./pages/users/delete-post";
import ViewPost from "./pages/users/view-post";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PageRenderer from "./PageRenderer";
function App() {
  const user = {
    firstName: "Prakash",
    lastName: "Parajuli",
  };
  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Switch>
          <Route exact path="/create/post">
            <CreatePost />
          </Route>
          <Route exact path="/author/posts/:id" component={ViewPost}></Route>
          <Route exact path="/edit/post/:id" component={EditPost}></Route>
          <Route exact path="/delete/post/:id" component={DeletePost}></Route>
          <Route
            exact
            path="/"
            children={() => <Redirect to="/home"></Redirect>}
          ></Route>
          <Route path="/:page" component={PageRenderer}></Route>
          <Route component={() => 404}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
