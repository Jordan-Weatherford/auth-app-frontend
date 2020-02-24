import React, { Component } from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import axios from 'axios'

export default class App extends Component {
	constructor(props){
		super(props)

		this.state = {
			loggedInStatus: 'NOT_LOGGED_IN'
		}

		this.handleLogin = this.handleLogin.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	checkLoginStatus() {
		axios.get("http://localhost:3001/logged_in", { withCredentials: true }).then(response => {
			if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
				this.setState({
					loggedInStatus: "LOGGED_IN",
					user: response.data.user
				})
			} else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
				this.setState({
					loggedInStatus: "NOT_LOGGED_IN",
					user: {}
				})
			}
		}).catch(error => {
			console.log("check login error", error)
		})
	}

	handleLogin(data) {
		this.setState({
			loggedInStatus: "LOGGED_IN",
			user: data.user
		})
	}

	handleLogout() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
			user: {}
		})
	}

	componentDidMount() {
		this.checkLoginStatus()
	}

	render() {
		return(
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route 
						exact path={'/'} 
						render={
							props => (<Home {...props} 
							handleLogin={this.handleLogin} 
							handleLogout={this.handleLogout} 
							handleSuccessfulAuth={this.handleSuccessfulAuth} 
							loggedInStatus={this.state.loggedInStatus} 
							/>)
						}/>
						
						<Route 
						exact path={'/dashboard'}
						render={
							props => (<Dashboard {...props}
							handleLogout={this.handleLogout}
							loggedInStatus={this.state.loggedInStatus}
							/>)
						}/>

					</Switch>
				</BrowserRouter>
			</div>
		)
	}

}
