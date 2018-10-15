import React, { Component } from "react";
import Map from './maps/Map';
import { Link } from "react-router-dom";
import axios from "axios";

export default class Meetings extends Component {
  constructor() {
    super();
    this.state = { listOfMeetings: [] };
  }

  getAllMeetings = () => {
    axios.get(`http://localhost:3010/meetings/`).then(responseFromApi => {
      this.setState({
        listOfMeetings: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.getAllMeetings();
  }

  render() {
    const style = {
      width: "600px",
      height: "100%"
    };
    return (
      <div>
        <h1>Quedadas</h1>
        <hr />
        <div>
        <Map
        id="myMap"
        options={{
          center: { lat: 40.4169473, lng: -3.7057172 },
          zoom: 14
        }}
        onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { lat: 40.4169473, lng: -3.7057172 },
            map: map,
            title: 'Hola Madrid!'
          });
        }}
        />
        </div>
        <div>
          <Link to="/Createmeeting">Crea tu quedada</Link>
          <div />
          <div>
            <div>
              {this.state.listOfMeetings.map((meetings, index) => {
                return (
                  <div key={meetings._id}>
                    <p>{meetings.name} </p>
                    <p>{meetings.description} </p>
                    <p>{meetings.place} </p>
                    {/* <p style={{ maxWidth: "400px" }}>{meetings.location} </p> */}
                    <p>{meetings.date} </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
