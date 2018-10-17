import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item active"><Link to='/profile'>Perfil</Link></li>
            <li className="nav-item active"><Link to='/Meetings'>Quedadas</Link></li>
            <li className="nav-item active"><Link to='/Gallery'>FotoNieto</Link></li>
            <li className="nav-item active"><button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleLogout}>Logout</button></li>
          </ul>
          {/* <h2>¡Bienvenido {this.state.loggedInUser.username}!</h2> */}
        </nav>
      )
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
            <li className="nav-item active"><Link to='/signup'>Signup</Link></li>
            <li className="nav-item active"><Link to='/login'>Login</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

export default Navbar;
