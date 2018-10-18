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
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" style={{fontSize: "22px"}} to='/profile'><b>Perfil</b></Link></li>
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" style={{fontSize: "22px"}} to='/Meetings'><b>Quedadas</b></Link></li>
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" style={{fontSize: "22px"}} to='/Gallery'><b>FotoNieto</b></Link></li>
            <li className="nav-item active nav-class"><button className="btn btn-warning my-2 my-sm-0" style={{fontSize: "22px"}} type="submit" onClick={this.handleLogout}><b>Desconectarse</b></button></li>
          </ul>
        </nav>
      )
    } else {
      return (
          <nav className="navbar navbar-expand-lg nav-type">
            <ul className="navbar-nav">
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" style={{fontSize: "22px"}} to='/signup'><b>Regístrate</b></Link></li>
            <li className="nav-item active nav-class"><Link className="nav-link nav-class" style={{fontSize: "22px"}} to='/login'><b>Loguéate</b></Link></li>
            </ul>
          </nav>
        
      )
    }
  }
}

export default Navbar;
