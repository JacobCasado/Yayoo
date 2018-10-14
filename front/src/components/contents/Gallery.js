import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import UploadGallery from "./UploadGallery";

export default class Gallery extends Component {
  constructor() {
      super()
      this.state = {
          username: '',
          description: '',
          image: null,
          error: ''
      }
      this.service = new UploadGallery();
  }

  handleChange(e) {
      this.setState({
        image: e.target.files[0]
      })
    }
  
  handleSubmit(e) {
    console.log(this.state.image);
    
      e.preventDefault()
      let { username, description } = this.state;
      if (username === '') return this.setState({ error: 'Empty username' });
      if (description === '') return this.setState({ error: 'Empty Description' });
      this.service.addPicture(this.state.image, username, description)
  }

  render() {
      let { username, description, error } = this.state;
      return (
          <div>
              <form onSubmit={(e)=>this.handleSubmit(e)}>
                  <p style={{ color: "red" }}>{error}</p>
                  <label>Usuario</label>
                  <input type="text" name='username' placeholder='Product Name' value={username} onChange={(e) => this.setState({ username: e.target.value })} />
                  <label>Descripción</label>
                  <input type="text" name='description' placeholder='Product Description' value={description} onChange={(e) => this.setState({ description: e.target.value })} />
                  <label>Imagen</label>
                  <input type="file" name='image' placeholder='Product Photo' onChange={(e)=>this.handleChange(e)} />
                  <button onClick={this.handleSubmit.bind(this)}>Submit</button>
              </form>
              
          </div>
      )
  }
}