import React, { Component } from "react";
import AuthService from "./AuthService";
import {Redirect} from "react-router-dom"

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          redirect: true
          
        });
        this.props.getUser(response.user);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if(this.state.redirect) return <Redirect to="/profile" />
    
    return (
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-6" style={{marginTop:"12%"}}>

        <h3 style={{paddingBottom: "30px"}}>Regístrate</h3>

        <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
            <label className="size" for="formGroupExampleInput">Nombre de Usuario:</label>
            <input
              className="form-control size-fill" id="formGroupExampleInput"
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
            <label className="size" for="exampleInputPassword1">Contraseña:</label>
            <input
              className="form-control size-fill" id="exampleInputPassword1"
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
              />
            </div>
          
          
          <button type="submit" className="btn btn-success btn-class" value="Sign up">Subscríbete</button>
        </form>
      </div>
      
      <div className="col-md-6" style={{marginTop:"8%"}}>
          <img src="/images/YayooLogo.png" alt="Yayoo Logo"/>
      </div>
      </div>
      </div>
    );
  }
}

export default Signup;