import axios from 'axios';

export default class UploadGallery {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/images',
      withCredentials: true
    });

    this.service2 = axios.create({
      baseURL: 'http://localhost:3010/EditProfile',
      withCredentials: true
    });
  }

  addPicture(image, description) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    //console.log(formData);
    //console.log('DEBUG formData', formData.get("image"));
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

  getAllProducts = () => {
    return this.service.get('/main')
    .then(response => response.data)
  }
}