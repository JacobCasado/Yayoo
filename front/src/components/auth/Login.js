import React, { Component } from 'react';
import AuthService from './AuthService'
import {Redirect} from "react-router-dom"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', redirect: false };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false,
          redirect: true
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if(this.state.redirect) return <Redirect to="/profile" />

    return (
    <div className="container-fluid">
    <div className="row">
    <div className="col-md-6" style={{marginTop:"15%"}}>

      <h3>Por favor, loguéate para entrar.</h3>

      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label for="exampleFormControlInput1">Nombre de Usuario:</label>
          <input className="form-control" id="exampleFormControlInput1" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
        </div>

        <div className="form-group">
          <label for="exampleInputPassword1">Contraseña:</label>
          <input className="form-control" id="exampleInputPassword1" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
        </div>

        <button type="submit" className="btn btn-success" value="Sign up">Loguéate</button>
      </form>

      <h1>{this.state.error ? 'Error' : ''}</h1>
    </div>
    <div className="col-md-6" style={{marginTop:"8%"}}>
          <img src="/images/YayooLogo.png" alt="Yayoo Logo"/>
    </div>
    </div>
    </div>
    )
  }
}

export default Login;