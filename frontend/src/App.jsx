import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getUser } from "./redux/apiUserDucks";
import { getNotifications } from "./redux/notifDucks";
import socket from "./utils/ws";
import Friends from "./views/Friends";
//VIEWS
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Search from "./views/Search";


function App() {
  const dispatch = useDispatch()
  const PrivateRoute = ({ component, path, ...rest }) => {
    if (localStorage.getItem("auth")) {
      return <Route component={component} path={path} {...rest} />;
    } else {
      return <Redirect to="/login" {...rest} />;
    }
  };
  const user = useSelector((store) => store.user.user);
  function getNotif(){
    dispatch(getNotifications())
  }
  function updateUser(){
    dispatch(getUser())
  }

  React.useEffect(() => {
    updateUser()
    if (user) {
      socket.emit('new-user', user.userData)
      socket.on("notification", getNotif)
      socket.on('updateUser', updateUser)
      socket.on("setStatus", updateUser)
    }
  }, [])
  return (
    <Router>
      <Switch>
        <PrivateRoute component={Home} path="/" exact />
        <PrivateRoute component={Search} path="/search" />
        <PrivateRoute component={Profile} path="/profile/:id" />
        <PrivateRoute component={Friends} path="/friends"/>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
