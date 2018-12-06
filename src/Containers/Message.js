import React, { Component } from 'react'

class Message extends Component {
    state = {
        content: ""
    }

    handleContentChange = event => {
        this.setState({content: event.target.value})
    }

    sendMessage = (e) => {
        e.preventDefault()
        const data = {
            message: {
                sender_id: this.props.location.state.sender,
                recipient_id: this.props.location.state.recipient,
                content: this.state.content
            }
        }
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("Message sent!")
                this.props.history.push('/profile')
            } else {
                alert("Something went wrong! Try again!")
            }
        })
    }

    render() {
        return (
            <>
                <br />
                <br />
                <form className="ui form" onSubmit={this.sendMessage}>
                    <div className="field">
                        <label>Your Message to {this.props.location.state.name}</label>
                        <input type="text" name="content" value={this.state.content} onChange={this.handleContentChange} placeholder="Type your message here..." />
                    </div>
                    <button className="ui button" type="submit">Send Message</button>
                </form>
            </>
        )
    }
}

export default Message