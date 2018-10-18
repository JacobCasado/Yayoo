import React, { Component } from "react";
import axios from "axios";
import UploadGallery from "./UploadGallery";

export default class Gallery extends Component {
  constructor() {
    super();
    this.state = {};
    this.service = new UploadGallery();
  }

  handleSubmit(e) {
    e.preventDefault();
    let { description, image } = this.state;
    if (description === "" || image === "")
      return this.setState({ error: "Empty Description" });
    this.service.addPicture(image, description).then(res => {
      this.getAllImages();
    });
  }

  getAllImages = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/images/`, { withCredentials: true })
      .then(responseFromApi => {
        this.setState({
          listOfImages: responseFromApi.data
        });
      });
  };

  componentDidMount() {
    this.getAllImages();
  }

  render() {
    let gallery = "";

    if (this.state.listOfImages) {
      gallery = this.state.listOfImages.map((images, index) => {
        return (
          <div className="col-md-6">
            <div className="card" style={{ width: "32.3rem", margin:"10px" }}>
              <div className="img-container" key={images._id}>
                <img
                  className="card-img-top img-fix"
                  src={images.image}
                  alt=""
                />
              </div>
              <div className="card-body">
                <h6 className="card-title">{images.user.username} </h6>
                <h5 className="card-text">{images.description} </h5>
              </div>
            </div>
          </div>
        );
      });
    }
    let { error } = this.state;
    return (
      <div>
        <div>
          <h1>FotoNieto</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group" style={{marginTop:"50px"}}>
            <p style={{ color: "red" }}>{error}</p>
            <label style={{padding: "8px"}} for="exampleFormControlTextarea1">Descripción</label>
            <input
              className="" id="exampleFormControlTextarea1" rows="3"
              type="text"
              name="description"
              onChange={e => this.setState({ description: e.target.value })}
              />
            <label style={{padding: "8px"}} for="exampleFormControlFile1">Imagen</label>
            <input
              className=" file" id="exampleFormControlFile1"
              type="file"
              name="image"
              onChange={e =>
                this.setState({
                  image: e.target.files[0]
                })
              }
              />
            <button className="btn btn-success" onClick={e => this.handleSubmit(e)}>Compartir</button>
              </div>
          </form>
        </div>
        <div className="container">
          <div className="row">
            {gallery}
          </div>
        </div>
      </div>
    );
  }
}
