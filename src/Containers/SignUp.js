import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Login from './Login'

class SignUp extends Component {
    signUpClickHandler = () => {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: document.getElementById("un").value,
                    email: document.getElementById("em").value,
                    password: document.getElementById("pw").value,
                    password_confirmation: document.getElementById("pwc").value
                }
            })
        })
        .then(response => console.log(response))
    }

    render() {
        return(
            <BrowserRouter>
                <>

                    <div className='signup-form'>
                        {/*
                        Heads up! The styles below are necessary for the correct render of this example.
                        You can do same with CSS, the main idea is that all the elements up to the `Grid`
                        below must have a height of 100%.
                        */}
                        <style>{`
                        body > div,
                        body > div > div,
                        body > div > div > div.signup-form {
                            height: 100%;
                        }
                        `}</style>
                        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header as='h2' color='black' textAlign='center'>
                                Create a New Account
                                </Header>
                                <Form size='large'>
                                <Segment stacked>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' id="un" />
                                    <Form.Input fluid icon='envelope' iconPosition='left' placeholder='E-mail address' id="em" />
                                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' id="pw" />
                                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' id="pwc" />

                                    <Button color='blue' fluid size='large' onClick={this.signUpClickHandler}>
                                    Sign Up
                                    </Button>
                                </Segment>
                                </Form>
                                <Message>
                                Already have an account? <Link to={"/login/"}>Log In</Link>
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </div>
                    <Route path="/login/" component={Login} />
                </>
            </BrowserRouter>
        )
    }
}

export default SignUp