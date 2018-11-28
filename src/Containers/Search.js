import React, { Component } from "react"

class Search extends Component {
  platforms = {
    "PlayStation 4": 48,
    
  }

  onFormSubmit = event => {
    event.preventDefault()
    event.persist()
    const form = event.target

    fetch(`http://localhost:3000/games?userSearch=${form.gameName.value}&platformID=${form.platform.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => console.log(response))
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.onFormSubmit}>
        <div className="four wide field">
          <label>Game Name</label>
          <input type="text" name="gameName" placeholder="Game Name" />
        </div>
        <div className="four wide field">
          <label>Platform</label>
          <select name="platform">
            <option value="48">PlayStation 4</option>
            <option value="2">Xbox One</option>
            <option value="3">Nintendo Switch</option>
          </select>
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>

    );
  }
}

export default Search;
