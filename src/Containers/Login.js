import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SignUp from "./SignUp"

class Login extends Component {

    loginClickHander = () => {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: document.getElementById("un").value,
                password: document.getElementById("pw").value
            })
        })
        .then(response => response.json())
        .then(data => localStorage.setItem("token", JSON.stringify(data.token)))
        .then(alert(localStorage.getItem("token")))
    }
    
    render() {
        return(    
            <BrowserRouter>
                <>
                    <div className='login-form'>
                        <style>{`
                        body > div,
                        body > div > div,
                        body > div > div > div.login-form {
                            height: 100%;
                        }
                        `}</style>
                        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header as='h2' color='black' textAlign='center'>
                                    Log In to Your Account
                                </Header>
                                <Form size='large'>
                                <Segment stacked>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' id='un'/>
                                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' id='pw' />

                                    <Button color='blue' fluid size='large' onClick={this.loginClickHander}>
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
                    <Route path="/signup/" component={SignUp} />
                </>
            </BrowserRouter>
        )
    }
}

export default Login