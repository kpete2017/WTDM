import React, { Component } from 'react';
import Profile from '../components/Profile';
import Login from '../components/Login'
export default class profile extends Component {

  state = {
      isLoggedIn: false,
      user: [],
  }


  onLoginPress = (username, password) => {
    const userData = { username, password }
    fetch("https://what-to-do-backend-v2.herokuapp.com/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(result => {
        this.setState({isLoggedIn: true, user: result})
      })
      .catch(e => console.log(e))
  }

  render() {
    if(this.state.isLoggedIn) {
        return <Profile favorites={this.state.user.favorites} blacklists={this.state.user.blacklists} token={this.state.user.token}/>
    } else {
        return <Login onLoginPress={this.onLoginPress}/>
      }
  }
}
