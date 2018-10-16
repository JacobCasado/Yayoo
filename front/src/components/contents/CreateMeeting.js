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
    axios.post(`http://localhost:3010/meetings/`,{data})
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
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <label>Nombre</label>
          <input type="text" name="name" onChange={e => this.handleChangeProf(e, "name")}/>
          <label>Descripción</label>
          <textarea name="description" onChange={e => this.handleChangeProf(e, "description")} />
          <label>Lugar</label>
          <input type="text" name="place" onChange={e => this.handleChangeProf(e, "place")}/>
          <label>Fecha</label>
          <input type="date" name="date" onChange={e => this.handleChangeProf(e, "date")} />
          <label>Hora:</label>
          <input type="time" name="time" onChange={e => this.handleChangeProf(e, "time")} min="8:00" max="20:00" required />

          <button type="submit">Submit</button>

        </form>
        <div>
        <Map id="myMap" handleClick={this.handleClickMap}/>
        </div>
      </div>
    )
  }
}