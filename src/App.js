import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import HomepageLayout from './Containers/HomepageLayout';
import Search from './Containers/Search'

const URL = 'http://localhost:3000';


class App extends Component {
    
  // componentDidMount() {
  //   fetch(`${URL}/games`)
  //   .then(response => response.json())
  //   .then(games => console.log(games))
  // }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/search/" component={Search} />
          <Route path="/" render={(props) => {
            return <HomepageLayout {...props}/>
          }} />
          {/* <Route path="/profile/" component={Profile} />
          <Route path="/login/" component={Login} />
          <Route path="/signup/" component={SignUp} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
