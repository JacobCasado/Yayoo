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
    
    return axios.post(`${process.env.REACT_APP_API_URL}/user/${this.state.user._id}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    })
    .then(res => {
      console.log(res)
      window.location.reload()
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
        <h1>Tu Perfil</h1>
        <div className="container">
        <div className="row">
        <div className="col-md-6" style={{marginTop:"56px"}}>
        <div className="img-prof" key={user._id}>
          <img src={user.image} className="img-fix" alt=""/> 
        </div>
        </div>
        <div className="col-md-6" style={{marginTop:"20px"}}>
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label className="size" for="formGroupExampleInput">Nombre de Usuario</label>
          <input type="text" className="form-control size-fill" id="formGroupExampleInput" name="username" value={user.username} onChange={e => this.handleChangeProf(e, "username")}/>
        </div>
        <div className="form-group">
          <label className="size" for="formGroupExampleInput">Descripción</label>
          <textarea className="form-control size-fill" id="formGroupExampleInput" name="description" value={user.description} onChange={e => this.handleChangeProf(e, "description")} />
        </div>
        <div className="form-group">
          <label className="size" for="formGroupExampleInput">Género</label>
          <select className="form-control size-fill" id="formGroupExampleInput" name="gender" value={user.gender} onChange={e => this.handleChangeProf(e, "gender")}>
            <option className="size-fill" value="-">-</option>
            <option className="size-fill" value="male">Hombre</option>
            <option className="size-fill" value="female">Mujer</option>
          </select>
        </div>
        <div className="form-group">
          <label className="size" for="formGroupExampleInput">Domicilio</label>
          <input className="form-control size-fill" id="formGroupExampleInput" name="location" value={user.location} onChange={e => this.handleChangeProf(e, "location")} />
        </div>
        <div className="form-group">
          <label className="size" for="formGroupExampleInput">Teléfono</label>
          <input className="form-control size-fill" id="formGroupExampleInput" name="telephone" value={user.telephone} onChange={e => this.handleChangeProf(e, "telephone")} />
        </div>
        <div className="form-group">
          <label className="size size" for="formGroupExampleInput">Imagen</label>
          <input
              type="file"
              className="form-control size-fill" id="formGroupExampleInput" name="image"
              onChange={e =>
                this.setState({
                  image: e.target.files[0]
                })
              }
              />
        </div>
          
          <button className="btn btn-success btn-class" type="submit">Subir</button>

        </form>
        </div>
        </div>
        </div>
      </div>
    ) : 'Loading';
  }

}


