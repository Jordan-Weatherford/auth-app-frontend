import React, { Component } from 'react'
import axios from 'axios'
import './Auth.scss'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            loginErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const {email, password} = this.state;

        axios.post("http://localhost:3001/sessions", {
            user: {
                email,
                password
            }
        },
        { withCredentials: true }
        ).then(response => {
            console.log(response)
            if (response.data.logged_in) {
                this.props.handleSuccessfulAuth(response.data)
            } else {
                console.log('login no good!')
            }
        }).catch(error => {
            console.log(error)
        })

        event.preventDefault()
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Login</h2>
                    <input type="email" name="email" placeholder="email..." value={this.state.email} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="password..." value={this.state.password} onChange={this.handleChange} required />

                    <button type="submit">login</button>
                </form>
            </div>
        )
    }
}