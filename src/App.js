import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Homepage from './Containers/Homepage';
import SearchContainer from './Containers/SearchContainer'
import Profile from './Containers/Profile'
import Login from './Containers/Login'
// import Logout from './Containers/Logout'
import SignUp from './Containers/SignUp'


class App extends Component {
  state = {
    current_user: {}
  }

  setUser = current_user => {
    this.setState({current_user})
  }

  logOut = () => {
    this.setState({current_user: {}})
    localStorage.removeItem("token")
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/">Home | </Link>
          {/* {!!this.state.current_user["username"]
           ? <Link to="/">Log Out | </Link>
           : <Link to="/login">Log In | </Link>
          } */}
          <Link to="/login">Log In | </Link>
          <Link to="/signup">Sign Up | </Link>
          <Link to="/search">Search Games | </Link>
          <Link to="/profile">Profile</Link>

          <Switch>
            <Route path="/profile" render={(props) => <Profile {...props} user={this.state.current_user}/>} />
            <Route path="/search" render={(props) => <SearchContainer {...props} user={this.state.current_user} />} />
            <Route path="/login" render={(props) => <Login {...props} setUser={this.setUser}/>} />
            {/* <Route path="/logout" render={(props) => <Logout {...props} logOut={this.logOut}/>} /> */}
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
