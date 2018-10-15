import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/auth/AuthService';
import Profile from './components/contents/Profile';
import Meetings from './components/contents/Meetings';
import Createmeeting from './components/contents/CreateMeeting';
import Gallery from './components/contents/Gallery';

class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
    })
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        //console.log(response);
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  render() {
    this.fetchUser()

    if(this.state.loggedInUser){
      console.log(this.state.loggedInUser);
      return (
        <div className="App">
          <header>
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
             </header>
          <div>
          <Route exact path='/profile' render={() => <Profile userInSession={this.state.loggedInUser}/>}/>
          <Route exact path='/Meetings' render={() => <Meetings/>}/>
          <Route exact path='/Createmeeting' render={() => <Createmeeting/>}/>
          <Route exact path='/Gallery' render={() => <Gallery/>}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            <Switch>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
            </Switch>
          </header>
        </div>
      );
    }
  }
}

export default App;




