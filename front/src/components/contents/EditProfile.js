import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import UploadGallery from "./UploadGallery";


export default class EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.service = new UploadGallery();
  }

  componentDidMount = () => {
    this.setState({user: this.props.user})
  }

  handleFormSubmit=(event)=>{
    event.preventDefault();
    const {user, image} = this.state;
    //const {image} = this.state;

    console.log(user);
    const formData = new FormData();
    formData.append("image", image)
    formData.append("username", user.username);
    formData.append("description", user.description);
    formData.append("gender", user.gender);
    formData.append("location", user.location);
    formData.append("telephone", user.telephone);
    
    return axios.post(`http://localhost:3010/user/${this.state.user._id}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    })
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
    return user ? (
      <div>
        <h1>Edita tu Perfil:</h1>
        <div key={user._id}>
          <img src={user.image} alt=""/> 
        </div>
        <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre de Usuario</label>
          <input type="text" name="username" value={user.username} onChange={e => this.handleChangeProf(e, "username")}/>
          <label>Descripción</label>
          <textarea name="description" value={user.description} onChange={e => this.handleChangeProf(e, "description")} />
          <label>Género</label>
          <select name="gender" value={user.gender} onChange={e => this.handleChangeProf(e, "gender")}>
            <option value="-">-</option>
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
          </select>
          <label>Domicilio</label>
          <input name="location" value={user.location} onChange={e => this.handleChangeProf(e, "location")} />
          <label>Teléfono</label>
          <input name="telephone" value={user.telephone} onChange={e => this.handleChangeProf(e, "telephone")} />
          <label>Imagen</label>
          <input
              type="file"
              name="image"
              onChange={e =>
                this.setState({
                  image: e.target.files[0]
                })
              }
              />
          
          <button type="submit">Submit</button>

        </form>
        </div>
      </div>
    ) : 'Loading';
  }

}


