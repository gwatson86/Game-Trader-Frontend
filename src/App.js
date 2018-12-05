import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Homepage from './Containers/Homepage';
import SearchContainer from './Containers/SearchContainer'
import Profile from './Containers/Profile'
import Login from './Containers/Login'
import Message from './Containers/Message'
import SignUp from './Containers/SignUp'


class App extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user"))
  }

  setUser = current_user => {
    this.setState({user: current_user})
  }

  logOut = () => {
    localStorage.clear()
  }

  render() {
    let logInLogOut
    let signup

    if (this.state.user) {
      // logInLogOut = <Link to="/logout">Log Out | </Link>
      logInLogOut = <a href="http://localhost:3001" onClick={this.logOut()}>Log Out |</a>
      signup = null
    } else {
      logInLogOut = <Link to="/login">Log In | </Link>
      signup = <Link to="/signup">Sign Up | </Link>
    }
    return (
      <BrowserRouter>
        <div>
          <Link to="/">Home | </Link>
          {logInLogOut}
          {signup}
          <Link to="/search">Search Games | </Link>
          <Link to="/profile">Profile</Link>

          <Switch>
            <Route path="/profile" render={(props) => <Profile {...props} user={this.state.current_user}/>} />
            <Route path="/search" render={(props) => <SearchContainer {...props} user={this.state.current_user} />} />
            <Route path="/login" render={(props) => <Login {...props} setUser={this.setUser}/>} />
            <Route path="/message" component={Message} />
            <Route path="/signup" component={SignUp} />
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
