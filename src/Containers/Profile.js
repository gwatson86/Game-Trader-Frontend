import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom'

class Profile extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    all_users: [],
    owns: [],
    own_ids: [],
    all_owns: [],
    wants: [],
    want_ids: [],
    all_wants: [],
    tradePartners: []
  }

  // ABANDON ALL HOPE YE WHO ENTER HERE

  usersWhoOwnWhatIWant = allOwns => {
    return allOwns.filter(own => {
      if (this.state.want_ids.includes(own.game_id)) {
        return own
      }
    })
    .map(own => {
      return own.user_id
    })
    .filter((item, pos, self) => {
      return self.indexOf(item) === pos
    })
  }

  usersWhoAlsoWantWhatIOwn = array => {
    return this.usersWhoOwnWhatIWant(array).filter(user_id => {
      return this.state.all_wants.filter(want => {
        return want.user_id === user_id
      })
      .filter(want => {
        this.state.own_ids.includes(want.game_id)
      })
    })
  }

  tradePartners = array => {
    return this.usersWhoAlsoWantWhatIOwn(array).map(user => {
      const canTradeMe = this.getOwnsOfUser(user).filter(own => {
        if (this.state.want_ids.includes(own.game_id)) {
          return own.game_name
        }
      })
      const wantsFromMe = this.getWantsOfUser(user).filter(want => {
        if (this.state.own_ids.includes(want.game_id)) {
          return want.game_name
        }
      })
      return {
        "user": this.getUser(user),
        "canTradeMe": canTradeMe,
        "wantsFromMe": wantsFromMe
      }
    })
  }

  getOwnsOfUser = user_id => {
    return this.state.all_owns.filter(own => {
      if (own.user_id === user_id) {
        return own
      }
    })
  }

  getWantsOfUser = user_id => {
    return this.state.all_wants.filter(want => {
        if (want.user_id === user_id) {
          return want
        }
    })
  }

  getUser = user_id => {
    return this.state.all_users.find(user => {
      return user.id === user_id
    })
  }

  componentDidMount() {
    let owns = []
    let own_ids = []
    let wants = []
    let want_ids = []
    fetch('http://localhost:3000/owns', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then(response => {
      this.setState({all_owns: response})
      response.forEach(own => {
        if (own.user_id === this.state.user.id) {
          owns.push(own)
          own_ids.push(own.game_id)
        }
      })
    })
    .then(() => this.setState({owns, own_ids}))
    .then(() => {
      fetch('http://localhost:3000/wants', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({all_wants: response})
        response.forEach(want => {
          if (want.user_id === this.state.user.id) {
            wants.push(want)
            want_ids.push(want.game_id)
          }
        })
      })
      .then(() => this.setState({wants, want_ids}))
    })
    .then(() => {
      fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => response.json())
      .then(all_users => {this.setState({all_users})})
    })
    .catch((e) => {
      console.log(e)
      alert("You must be logged in to do that!")
      
    })
  }

  render() {
    if (localStorage.getItem('token') && localStorage.getItem('token').length > 50) {
      return (
        <div>
          <div>
            <h1>{this.state.user.username}'s Profile</h1><br/>
          </div>

          <div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Potential Trade Partners</th>
                  <th>Games They Own</th>
                  <th>Games They Want</th>
                </tr>
              </thead>
              <tbody>
                {this.tradePartners(this.state.all_owns).map(tp => {
                  return(
                    <tr>
                      <td data-label="Potential Trade Partners">
                        {tp.user.username}
                        <Link to={{pathname: '/message', state: { sender: this.state.user.id, recipient: tp.user.id, name: tp.user.username }}}>
                          <button>Send Message</button>
                        </Link>
                      </td>
                      <td data-label="Games They Own">{tp.canTradeMe.map(game => {return game.game_name}).join(', ')}</td>
                      <td data-label="Games They Want">{tp.wantsFromMe.map(game => {return game.game_name}).join(', ')}</td>
                    </tr> 
                  )
                })}
              </tbody>
            </table>
          </div><br />

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
          <Redirect to={{pathname: '/login'}} />
        </div>
      )
    }
  }
}

export default Profile;