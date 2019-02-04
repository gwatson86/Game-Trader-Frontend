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
    all_wants: []
  }

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
      const canTradeMe = this.getOtherUsersOwns(user).filter(own => {
        if (this.state.want_ids.includes(own.game_id)) {
          return own.game_name
        }
      })
      const wantsFromMe = this.getOtherUsersWants(user).filter(want => {
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

  getOtherUsersOwns = user_id => {
    return this.state.all_owns.filter(own => {
      if (own.user_id === user_id) {
        return own
      }
    })
  }

  getOtherUsersWants = user_id => {
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

  getAllOwns = users => {
    let all_owns = []
    users.forEach(user => {
      user.owns.forEach(own => {
        all_owns.push(own)
      })
    })
    return all_owns
  }

  getAllWants = users => {
    let all_wants = []
    users.forEach(user => {
      user.wants.forEach(want => {
        all_wants.push(want)
      })
    })
    return all_wants
  }

  getUserOwns = users => {
    return this.getAllOwns(users).filter(own => {
      return own.user_id === this.state.user.id
    })
  }

  getUserWants = users => {
    return this.getAllWants(users).filter(want => {
      return want.user_id === this.state.user.id
    })
  }

  getUserOwnIDs = users => {
    return this.getUserOwns(users).map(own => {
      return own.game_id
    })
  }

  getUserWantIDs = users => {
    return this.getUserWants(users).map(want => {
      return want.game_id
    })
  }

  removeOwn = id => {
    fetch(`http://localhost:3000/owns/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  removeWant = id => {
    fetch(`http://localhost:3000/wants/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/profile_init', {
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
    .then(all_users => {
      const all_owns = this.getAllOwns(all_users)
      const all_wants = this.getAllWants(all_users)
      const owns = this.getUserOwns(all_users)
      const wants = this.getUserWants(all_users)
      const own_ids = this.getUserOwnIDs(all_users)
      const want_ids = this.getUserWantIDs(all_users)
      this.setState({
        all_users,
        all_owns,
        all_wants,
        owns,
        wants,
        own_ids,
        want_ids
      })
    })
    .catch((e) => {
      alert("You must be logged in to do that!")
    })
  }

  render() {
    if (localStorage.getItem('token') && localStorage.getItem('token').length > 50) {
      return (
        <div>
          <br /><br />
          <div>
            <h1>{this.state.user.username}'s Profile</h1>
            <h2><Link to={{pathname: '/messages', state: { user: this.state.user.id, allUsers: this.state.all_users }}}>View Your Messages</Link></h2><br/>
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
                    <tr key={Math.floor(Math.random()*10000000000)}>
                      <td data-label="Potential Trade Partners">
                        {tp.user.username} <br />
                        <Link to={{pathname: '/new_message', state: { sender: this.state.user.id, recipient: tp.user.id, name: tp.user.username }}}>
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
                return <div className="card" key={Math.floor(Math.random()*10000000000)}>
                  <div className="image">
                    <img src={own.game_cover} alt=""/>
                  </div>
                  <div className="content">
                    <div className="header">{own.game_name}</div>
                  </div>
                  <div className="ui button" onClick={() => this.removeOwn(own.id)}>Remove Game</div>
                </div>
              })}
            </div>
          </div>
          <br />
          <div>
            <h2>Wanted Games</h2>
            <div className="ui cards">
              {this.state.wants.map(want => {
                return <div className="card" key={Math.floor(Math.random()*10000000000)}>
                  <div className="image">
                    <img src={want.game_cover} alt=""/>
                  </div>
                  <div className="content">
                    <div className="header">{want.game_name}</div>
                  </div>
                  <div className="ui button" onClick={() => this.removeWant(want.id)}>Remove Game</div>
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