import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

class Profile extends Component {
  state = {
    user: this.props.user,
    owns: [],
    wants: []
  }

  componentDidMount() {
    let owns = []
    let wants = []
    fetch('http://localhost:3000/owns', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(response => {
      response.forEach(own => {
        if (own.user_id === this.props.user.id) {
          owns.push(own)
        }
      })
    })
    .then(() => this.setState({owns}))

    fetch('http://localhost:3000/wants', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(response => {
      response.forEach(want => {
        if (want.user_id === this.props.user.id) {
          wants.push(want)
        }
      })
    })
    .then(() => this.setState({wants}))
  }

  render() {
    {console.log(this.state.wants)}
    if (localStorage.getItem('token') && localStorage.getItem('token').length > 50) {
      return (
        <div>
          <div>
            <h1>Profile</h1>
            <h2>{this.state.user.username}</h2><br></br>
          </div>

          <div>
            <h2>Owned Games</h2>
            <div className="ui cards">
              {this.state.owns.map(own => {
                return <div className="card">
                  <div className="image">
                    <img src={own.game_cover} alt=""/>
                  </div>
                  <div className="content">
                    <div className="header">{own.game_name}</div>
                  </div>
                </div>
              })}
            </div>
          </div>
          <br />
          <div>
            <h2>Wanted Games</h2>
            <div className="ui cards">
              {this.state.wants.map(want => {
                return <div className="card">
                  <div className="image">
                    <img src={want.game_cover} alt=""/>
                  </div>
                  <div className="content">
                    <div className="header">{want.game_name}</div>
                  </div>
                </div>
              })}
            </div>
          </div>
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