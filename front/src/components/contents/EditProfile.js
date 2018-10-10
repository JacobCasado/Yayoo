import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default class EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        user: this.props.user
    }
  }

  handleFormSubmit=(event)=>{
    const {username, image, description, location, gender, telephone}=this.state;
    console.log(this.state)
    const profile={username, image, description, location, gender, telephone};
    event.preventDefault();
    axios.put("http://localhost:3010/auth",profile)
    .then(res => {
      console.log(res)
      return <Redirect to="/Profile"></Redirect>
    })
    .catch(e=>console.log("Error",e))
  }

  handleChangeProf= (event)=> {

  }

  render(){
    let user= this.props.user
    return (
      <div>
        <hr />
        <h3>Edita tu Perfil:</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre de Usuario</label>
          <input type="text" name="username" value={user.username} onChange={e => this.handleChangeProf(e)}/>
          {/* <label>Imagen:</label>
          <textarea name="description" value={user.image} onChange={e => this.handleChangeProf(e)} /> */}
          <label>Descripción</label>
          <textarea name="description" value={user.description} onChange={e => this.handleChangeProf(e)} />
          <label>Género</label>
          <select name="gender" value={user.gender} onChange={e => this.handleChangeProf(e)}>
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>

          </select>
          <label>Domicilio</label>
          <input name="location" value={user.location} onChange={e => this.handleChangeProf(e)} />
          <label>Teléfono</label>
          <input name="telephone" value={user.telephone} onChange={e => this.handleChangeProf(e)} />
          
          <button onClick={this.editProfile}>Submit</button>

        </form>
      </div>
    )
  }

}


