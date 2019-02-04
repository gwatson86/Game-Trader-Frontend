import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Homepage from './Containers/Homepage';
import SearchContainer from './Containers/SearchContainer'
import Profile from './Containers/Profile'
import Login from './Containers/Login'
import Message from './Containers/Message'
import UserMessages from './Containers/UserMessages'
import SignUp from './Containers/SignUp'
import { Nav, NavItem } from 'react-bootstrap'
import { Helmet } from 'react-helmet'


class App extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user"))
  }

  setUser = current_user => {
    this.setState({user: current_user})
  }

  logOut = () => {
    console.log("logging out!")
    localStorage.clear();
    this.setState({ user: null })
  }

  render() {
    let logInLogOut
    let signup

    if (this.state.user) {
      logInLogOut = <Link to="/login" onClick={this.logOut}>Log Out</Link>
      signup = null
    } else {
      logInLogOut = <Link to="/login">Log In</Link>
      signup = <Link to="/signup">Sign Up</Link>
    }
    return (
      <BrowserRouter>
        <div>
          <Helmet>
            <style>{'body { background-image: url(https://i.imgur.com/WpE7Rl9.jpg); }'}</style>
          </Helmet>
          <Nav bsStyle="tabs" activeKey="1">
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              {logInLogOut}
            </NavItem>
            <NavItem>
              {signup}
            </NavItem>
            <NavItem>
              <Link to="/search">Search Games</Link>
            </NavItem>
            <NavItem>
              <Link to="/profile">Profile</Link>
            </NavItem>
          </Nav>

          <Switch>
            <Route path="/profile" render={(props) => <Profile {...props} user={this.state.user}/>} />
            <Route path="/search" render={(props) => <SearchContainer {...props} user={this.state.user} />} />
            <Route path="/login" render={(props) => <Login {...props} setUser={this.setUser}/>} />
            <Route path="/new_message" component={Message} />
            <Route path="/messages" component={UserMessages} />
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
