import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//VIEWS
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Search from "./views/Search";

function App() {
  const PrivateRoute = ({ component, path, ...rest }) => {
    if (localStorage.getItem("auth")) {
      return <Route component={component} path={path} {...rest} />;
    } else {
      return <Redirect to="/login" {...rest} />;
    }
  };
  const user = useSelector((store) => store.user.user);


  return (
    <Router>
      <Switch>
        <PrivateRoute component={Home} path="/" exact />
        <PrivateRoute component={Search} path="/search" />
        <PrivateRoute component={Profile} path="/profile/:id" />
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
