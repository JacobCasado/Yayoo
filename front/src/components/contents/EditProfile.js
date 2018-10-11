import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default class EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        user: {}
    }
  }

  componentDidMount = () => {
    this.setState({user: this.props.user})
  }

  handleFormSubmit=(event)=>{
    const data = this.state.user;
    event.preventDefault();
    axios.post(`http://localhost:3010/user/${this.state.user._id}`,{data})
    .then(res => {
      console.log(res)
      return <Redirect to="/Profile"></Redirect>
    })
    .catch(e=>console.log("Error",e))
  }

  handleChangeProf= (event, type)=> {
    let user = Object.assign({}, this.state.user)
    user[type] = event.target.value;
    this.setState({user})
  }

  render(){
    let {user}= this.state;
    return (
      <div>
        <hr />
        <h3>Edita tu Perfil:</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre de Usuario</label>
          <input type="text" name="username" value={user.username} onChange={e => this.handleChangeProf(e, "username")}/>
          {/* <label>Imagen:</label>
          <textarea name="description" value={user.image} onChange={e => this.handleChangeProf(e)} /> */}
          <label>Descripción</label>
          <textarea name="description" value={user.description} onChange={e => this.handleChangeProf(e, "description")} />
          <label>Género</label>
          <select name="gender" value={user.gender} onChange={e => this.handleChangeProf(e, "gender")}>
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
          </select>
          <label>Domicilio</label>
          <input name="location" value={user.location} onChange={e => this.handleChangeProf(e, "location")} />
          <label>Teléfono</label>
          <input name="telephone" value={user.telephone} onChange={e => this.handleChangeProf(e, "telephone")} />
          
          <button type="submit">Submit</button>

        </form>
      </div>
    )
  }

}


