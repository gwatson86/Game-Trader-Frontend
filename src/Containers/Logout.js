import { Component } from 'react'

class Logout extends Component {
    
    render() {
        console.log(this.props.logOut)
        return(
            this.props.history.push("/")
        )
    }
}

export default Logout