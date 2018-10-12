import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Link } from "react-router-dom";
import axios from "axios";

class Meetings extends Component {
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
        <div class="map-container">
          <Map
            style={style}
            google={this.props.google}
            zoom={14}
            initialCenter={{ lat: 40.4169473, lng: -3.7057172 }}
          >
            <Marker onClick={this.onMarkerClick} name={"Current location"} />

            <InfoWindow onClose={this.onInfoWindowClose}>
              {/* <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div> */}
            </InfoWindow>
          </Map>
        </div>
        <div>
          <Link to="/Createmeeting">Crea tu quedada</Link>
          <div />
          <div>
            <div style={{ width: "60%", float: "right" }}>
              {this.state.listOfMeetings.map((meetings, index) => {
                return (
                  <div key={meetings._id}>
                    <p style={{ maxWidth: "400px" }}>{meetings.name} </p>
                    <p style={{ maxWidth: "400px" }}>{meetings.description} </p>
                    <p style={{ maxWidth: "400px" }}>{meetings.place} </p>
                    {/* <p style={{ maxWidth: "400px" }}>{meetings.location} </p> */}
                    <p style={{ maxWidth: "400px" }}>{meetings.date} </p>
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyCtFGWWXJyAzch--tvKAt82xqXSj7W383M"
})(Meetings);
