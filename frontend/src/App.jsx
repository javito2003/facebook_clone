import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//VIEWS
import Home from './views/Home'
import Login from './views/Login'


function App() {

  const PrivateRoute = ({component, path, ...rest}) => {
    if (localStorage.getItem('auth')) {
      return <Route component={component} path={path} {...rest} />
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }

  return (
    <Router>
      <Switch>
       <PrivateRoute component={Home} path="/" exact />
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
