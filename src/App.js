import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Homepage from './Containers/Homepage';
import Search from './Containers/Search'
import Profile from './Containers/Profile'
import Login from './Containers/Login'
import SignUp from './Containers/SignUp'

// const URL = 'http://localhost:3000';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to={"/"}>Home | </Link>
          <Link to={"/login/"}>Log In | </Link>
          <Link to={"/signup/"}>Sign Up | </Link>
          <Link to={"/search/"}>Search Games | </Link>
          <Link to={"/profile/"}>Profile</Link>

          <Switch>
            <Route path="/profile/" component={Profile} />
            <Route path="/search/" component={Search} />
            <Route path="/login/" component={Login} />
            <Route path="/signup/" component={SignUp} />
            <Route path="/" render={(routeProps) => {
              return <Homepage {...routeProps}/>
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
