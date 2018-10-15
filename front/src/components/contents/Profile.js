import React, { Component } from 'react';
import EditProfile from './EditProfile';


class Profile extends Component {
  render() {
    return (
      <div>
        <EditProfile user= {this.props.userInSession} /> 
      </div>
    );
  }
}

export default Profile;