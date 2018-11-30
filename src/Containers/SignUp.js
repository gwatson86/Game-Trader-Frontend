import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

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
    }

    render() {
        return(
            <div className='signup-form'>
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
                        Already have an account? <Link to="/login">Log In</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SignUp