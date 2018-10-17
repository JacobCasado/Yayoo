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
        <nav className="navbar navbar-expand-lg nav-type">
          <ul className="navbar-nav">
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" to='/profile'>Perfil</Link></li>
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" to='/Meetings'>Quedadas</Link></li>
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" to='/Gallery'>FotoNieto</Link></li>
            <li className="nav-item active nav-class"><button className="btn btn-warning my-2 my-sm-0" type="submit" onClick={this.handleLogout}>Logout</button></li>
          </ul>
        </nav>
      )
    } else {
      return (
          <nav className="navbar navbar-expand-lg nav-type">
            <ul className="navbar-nav">
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" to='/signup'>Regístrate</Link></li>
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" to='/login'>Loguéate</Link></li>
            </ul>
          </nav>
        
      )
    }
  }
}

export default Navbar;
