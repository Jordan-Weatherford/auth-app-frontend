import React, { Component } from 'react'
import axios from 'axios'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleLogoutClick() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            axios.delete("http://localhost:3001/logout",
            { withCredentials: true }
            ).then(response => {
                this.props.handleLogout()
                this.props.history.push("/")
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
                <h1 className={textColor}>Dashboard</h1>
                <h3 className={textColor}>Status: { this.props.loggedInStatus } </h3>
                <button onClick={this.handleLogoutClick}>Logout</button>
            </div>
        )        
    }
}

