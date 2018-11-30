import React, { Component } from "react"
import { Redirect } from "react-router-dom"


class SearchContainer extends Component {
  state = {
    search: false
  }

  platforms = [
    {"Atari 2600": 59},
    {"Atari Jaguar": 62},
    {"Microsoft Xbox": 11},
    {"Microsoft Xbox 360": 12},
    {"Microsoft Xbox One": 49},
    {"Nintendo 3DS": 37},
    {"Nintendo 64": 4},
    {"Nintendo DS": 20},
    {"Nintendo DSi": 159},
    {"Nintendo Entertainment System": 18},
    {"Nintendo Game Boy": 33},
    {"Nintendo Game Boy Advance": 24},
    {"Nintendo Game Boy Color": 22},
    {"Nintendo GameCube": 21},
    {"Nintendo Switch": 130},
    {"Nintendo Wii": 5},
    {"Nintendo Wii U": 41},
    {"Sega Dreamcast": 23},
    {"Sega Game Gear": 35},
    {"Sega Genesis": 29},
    {"Sega Master System": 64},
    {"Sega Saturn": 32},
    {"Sony PlayStation": 7},
    {"Sony PlayStation 2": 8},
    {"Sony PlayStation 3": 9},
    {"Sony PlayStation 4": 48},
    {"Sony PlayStation Vita": 46},
    {"Sony PSP": 38},
    {"Super Nintendo Entertainment System": 19}
  ]

  onFormSubmit = event => {
    event.preventDefault()
    event.persist()
    const form = event.target

    fetch(`http://localhost:3000/games?userSearch=${form.gameName.value}&platformID=${form.platform.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer: ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(searchResults => this.setState({ 
      searchResults,
      search: true
    }), () => {console.log(this.state.searchResults)})
  }

  createOwnedGame = event => {
    const data = {
      user_id: this.props.user.id,
      game_id: parseInt(event.target.id)
    }
    console.log(this.props.user.id)
    console.log(event.target.id)
    fetch("http://localhost:3000/owns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer: ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    })
  }

  createWantedGame = event => {
    console.log(event.target.id)
  }

  render() {
    if (localStorage.getItem("token")) {
      if (!this.state.search) {
        return (
          <form className="ui form" onSubmit={this.onFormSubmit}>
            <div className="four wide field">
              <label>Game Name</label>
              <input type="text" name="gameName" placeholder="Game Name" />
            </div>
            <div className="four wide field">
              <label>Platform</label>
              <select name="platform">
                {this.platforms.map(platform => {
                  return <option key={Object.values(platform)} value={Object.values(platform)}>{Object.keys(platform)}</option>
                })}
              </select>
            </div>
            <button className="ui button" type="submit">Submit</button>
          </form>
        )
      } else {
        return (
          <div>
            <form className="ui form" onSubmit={this.onFormSubmit}>
              <div className="four wide field">
                <label>Game Name</label>
                <input type="text" name="gameName" placeholder="Game Name" />
              </div>
              <div className="four wide field">
                <label>Platform</label>
                <select name="platform">
                  {this.platforms.map(platform => {
                    return <option key={Object.values(platform)} value={Object.values(platform)}>{Object.keys(platform)}</option>
                  })}
                </select>
              </div>
              <button className="ui button" type="submit">Submit</button>
            </form>
            
            <div className="ui link cards">
              {this.state.searchResults.map(game => {
                return <div className="card">
                  <div className="image">
                    {game.cover
                    ? <img src={`https:${game.cover.url.replace("t_thumb", "t_cover_big")}`} alt="" />
                    : <img src={"https://static.gamespot.com/uploads/scale_medium/mig/0/8/7/8/2220878-600px_no_image_available_svg.png"} alt="" />
                    }
                  </div>
                  <div className="content">
                    <div className="header" >{game.name}</div>
                  </div>
                  <div className="extra content">
                    <div className="ui two buttons">
                      <div className="ui blue button" onClick={this.createOwnedGame} id={game.id}>I Own This</div>
                      <div className="ui red button" onClick={this.createWantedGame} id={game.id}>I Want This</div>
                  </div>
                </div>
              </div>
              })}
            </div>
          </div>
        )
      }
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

export default SearchContainer;

