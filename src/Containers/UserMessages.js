import React, { Component } from 'react'
import {  } from 'semantic-ui-react'

class UserMessages extends Component {
    state = {
        all_users: this.props.location.state.allUsers,
        sentMessages: [],
        receivedMessages: []
    }

    getUser = user_id => {
        return this.state.all_users.find(user => {
          return user.id === user_id
        })
      }

    getUserSentMessages = (messages, user_id) => {
        return messages.filter(message => {
            return message.sender_id === user_id
        })
    }
    getUserReceivedMessages = (messages, user_id) => {
        return messages.filter(message => {
            return message.recipient_id === user_id
        })
    }

    componentDidMount() {
        fetch('http://localhost:3000/messages', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
              }
        })
        .then(response => response.json())
        .then(response => {
            const sentMessages = this.getUserSentMessages(response, this.props.location.state.user)
            const receivedMessages = this.getUserReceivedMessages(response, this.props.location.state.user)
            this.setState({
                sentMessages,
                receivedMessages
            })
        })
    }

    render() {
        return (
            <div>
                <br />
                <h2>Received Messages</h2>
                {this.state.receivedMessages.map(message => {
                    return <h4>{message.content} ~ {this.getUser(message.sender_id).username}</h4>
                })}
                <br /><br />
                <h2>Sent Messages</h2>
                {this.state.sentMessages.map(message => {
                    return <h4>{message.content} (sent to {this.getUser(message.recipient_id).username})</h4>
                })}
            </div>
        )
    }
}

export default UserMessages