import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleUsernameChange = event => {
        this.setState({username: event.target.value})
    }

    handlePasswordChange = event => {
        this.setState({password: event.target.value})
    }

    isAuthenticated() {
        const token = localStorage.getItem("token")
        return token && token.length > 50
    }

    submitForm = event => {
        event.preventDefault()
        
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Invalid Username or Password")
            }    
        })
        .then(data => {
            if (data) {
                this.props.setUser(data.user)
                localStorage.setItem("token", data.jwt)
                localStorage.setItem("user", JSON.stringify(data.user))
                this.props.history.push('/profile')
            }  
        }) 
    }
    
    render() {
        return(
            <div className='login-form'>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' className="loginForm">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='black' textAlign='center'>
                            Log In to Your Account
                        </Header>
                        <Form size='large' onSubmit={this.submitForm}>
                            <Segment stacked>
                                <Form.Input
                                    fluid icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    id='un'
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                />
                                <Form.Input
                                    fluid icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    id='pw'
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />

                                <Button color='blue' fluid size='large'>
                                    Log In
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New user? <Link to={"/signup/"}>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login