import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login'
import axios from 'axios'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard")
    }

    handleLogoutClick() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            axios.delete("http://localhost:3001/logout",
            { withCredentials: true }
            ).then(response => {
                this.props.handleLogout()
            }).catch(error => {
                console.log("logout error", error)
            })
        }
    }


    render() {
        let textColor = 'RedText'
        
        if (this.props.loggedInStatus === "LOGGED_IN") {
            textColor = 'GreenText'
        }

        return(
            <div>
                <h1 className={textColor}>Home</h1>
                <h3 className={textColor}>Status: { this.props.loggedInStatus } </h3>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} /><br/>
                <button onClick={() => {this.handleLogoutClick()}} >logout</button>
            </div>
        )
    }
}