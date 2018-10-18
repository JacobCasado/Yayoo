import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true
    });
  }

  signup = (username, password) => {
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentuser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }

  upload = (file) => {
    return this.service.post('/upload', {file})
    .then(response => response.data)
  }

  edit = (username, image, description, gender, location, telephone) => {
    return this.service.post('/EditProfile', {username, image, description, gender, location, telephone})
    .then(response => response.data)
  }
}

export default AuthService;