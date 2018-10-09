import React, { Component } from "react";
import AuthService from "./AuthService";

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
    return (
      <div>
      <div>
        <h3>Sign up</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <fieldset>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          
          <input type="submit" value="Sign up" />
        </form>
        </div>
        <div>
          <h2>Hola!</h2>
          <h3>¡Bienvenido a Yayoo!</h3>
        </div>
      </div>
    );
  }
}

export default Signup;