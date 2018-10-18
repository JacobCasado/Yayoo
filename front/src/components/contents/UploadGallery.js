import axios from 'axios';

export default class UploadGallery {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/images`,
      withCredentials: true
    });

    this.service2 = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/EditProfile`,
      withCredentials: true
    });
  }

  addPicture(image, description) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    return this.service
      .post('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
  }

  getProfileProducts = (username) => {
    return this.service2.get(`/${username}`)
    .then(response => response.data)
  }

 
}