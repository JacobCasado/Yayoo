import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import UploadGallery from "./UploadGallery";

export default class Gallery extends Component {
  constructor() {
    super();
    this.state = {};
    this.service = new UploadGallery();
  }

  handleChange(e) {
    /* this.setState({
      image: e.target.files[0]
    }); */
  }

  handleSubmit(e) {
    e.preventDefault();
    let { description, image } = this.state;
    if (description === "" || image == "")
      return this.setState({ error: "Empty Description" });
    this.service.addPicture(image, description).then(res => {
      this.getAllImages();
    })
  }

  getAllImages = () => {
    axios.get(`http://localhost:3010/images/`,{withCredentials: true}).then(responseFromApi => {
      this.setState({
        listOfImages: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.getAllImages();
  }

  render() {
    let gallery = '';
    if(this.state.listOfImages) {
      gallery = this.state.listOfImages.map((images, index) => {
          return (
            <div key={images._id}>
              <img src={images.image} alt=""/>
              <p>{images.username} </p>
              <p>{images.description} </p>
            </div>
          )
          
        })}
    let {error } = this.state;
    return (
      <div>
        <div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <p style={{ color: "red" }}>{error}</p>
            {/* <label>Usuario</label>
                  <input type="text" name='username' placeholder='Product Name' value={username} onChange={(e) => this.setState({ username: e.target.value })} /> */}
            <label>Descripción</label>
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              onChange={e => this.setState({ description: e.target.value })}
            />
            <label>Imagen</label>
            <input
              type="file"
              name="image"
              placeholder="Product Photo"
              onChange={e =>
                this.setState({
                  image: e.target.files[0]
                })
              }
            />
            <button onClick={e => this.handleSubmit(e)}>Submit</button>
          </form>
        </div>

        { gallery}
      </div>
    );
  }
}