import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Map from './maps/Map.js';

export default class CreateMeeting extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        meetings: {},
        redirect: false
    }
  }

  componentDidMount = () => {
    this.setState({meetings: this.props.meetings})
  }

  handleFormSubmit=(event)=>{
    const data = this.state.meetings;
    data['lat'] = this.state.lat;
    data['lng'] = this.state.lng;
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/meetings/`,{data})
    .then(res => {
      console.log(res);
      this.setState({redirect: true})
    })
    .catch(e=>console.log("Error",e))
  }
  
  handleChangeProf= (event, type)=> {
    let meetings = Object.assign({}, this.state.meetings)
    meetings[type] = event.target.value;
    this.setState({meetings})
  }

  handleClickMap = (event) => {
    this.setState({lat:event.latLng.lat(),lng:event.latLng.lng()})
    //console.log(event.latLng.lat(), event.latLng.lng())
  }

  render() {
    if(this.state.redirect) return <Redirect to="/Meetings" />
    return (
      <div>
        <h2>Crea tu quedada</h2>
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-6" style={{marginTop:"50px"}}>

        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <div className="form-group">
          <label for="formGroupExampleInput">Nombre</label>
          <input className="form-control" id="formGroupExampleInput" type="text" name="name" onChange={e => this.handleChangeProf(e, "name")}/>
          </div>
          <div className="form-group">
          <label for="formGroupExampleInput">Descripción</label>
          <textarea className="form-control" id="formGroupExampleInput" name="description" onChange={e => this.handleChangeProf(e, "description")} />
          </div>
          <div className="form-group">
          <label for="formGroupExampleInput">Lugar</label>
          <input className="form-control" id="formGroupExampleInput" type="text" name="place" onChange={e => this.handleChangeProf(e, "place")}/>
          </div>
          <div className="form-group">
          <label for="formGroupExampleInput">Fecha</label>
          <input className="form-control" id="formGroupExampleInput" type="date" name="date" onChange={e => this.handleChangeProf(e, "date")} />
          </div>
          <div className="form-group">
          <label for="formGroupExampleInput">Hora:</label>
          <input className="form-control" id="formGroupExampleInput" type="time" name="time" onChange={e => this.handleChangeProf(e, "time")} min="8:00" max="20:00" required />
          </div>

          <button className="btn btn-success" type="submit">Submit</button>

        </form>
        </div>
        <div className="col-md-6" style={{marginTop:"84px"}}>
        <Map id="myMap" handleClick={this.handleClickMap}/>
        </div>
        </div>
        </div>
      </div>
    )
  }
}