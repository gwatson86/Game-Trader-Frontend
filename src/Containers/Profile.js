import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

class Profile extends Component {
  state = {
    user: this.props.user
  }

  render() {
    if (localStorage.getItem('token').length > 50) {
      return (
        <div>
          <h1>Profile</h1>
          <h2>{this.state.user.username}</h2>
        </div>
      )
    } else {
      return (
        <div>
          {alert("You must log in to do that!")}
          <Redirect to={{pathname: '/login'}} />
        </div>
      )
    }
  }
}

export default Profile;