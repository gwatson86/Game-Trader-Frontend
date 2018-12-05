import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
    
    render() {
        this.props.logOut()
        return(
            this.props.history.push('/login')
        )
    }
}

export default Logout