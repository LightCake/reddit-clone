import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../../utils/route";
import "./App.css";
import SideBarContainer from "../SideBar/SideBarContainer";
import MainFeedContainer from "../MainFeed/MainFeedContainer";
import PostFormContainer from "../PostForm/PostFormContainer";

const App = () => {
  return (
    <div className="app">
      <SideBarContainer />
      <Switch>
        <Route
          exact
          path={["/", "/r/:subreddit"]}
          component={MainFeedContainer}
        />
        <ProtectedRoute
          exact
          path="/r/:subreddit/post"
          component={PostFormContainer}
        />
      </Switch>
    </div>
  );
};

export default App;
