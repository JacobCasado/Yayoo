import React, { Component } from "react";
import Map from "./maps/Map";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Meetings extends Component {
  constructor() {
    super();
    this.state = { listOfMeetings: [] };
  }

  getAllMeetings = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/meetings/`).then(responseFromApi => {
      this.setState({
        listOfMeetings: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.getAllMeetings();
  }

  render() {
    return (
      <div>
        <h1>Quedadas</h1>
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-6" style={{marginTop:"100px"}}>

          {this.state.listOfMeetings.length > 0 ? (
            <Map id="myMap" meetings={this.state.listOfMeetings} />
            ) : (
              ""
              )}
        </div>
        <div className="col-md-6" style={{marginTop:"50px"}}>
        <button className="btn btn-success btn-class"><Link className="btn-class" to="/Createmeeting">Crea tu quedada</Link></button>
          <div>
            <div>
              {this.state.listOfMeetings.map((meetings, index) => {
                return (
                  <div className="card" style={{margin: "5px"}}>
                  <div className="card-body" key={meetings._id}>
                    <h4><b>·{meetings.name}·</b></h4>
                    <p>Descripción: <strong className="size">{meetings.description}</strong></p>
                    <p>Lugar: <strong className="size">{meetings.place}</strong></p>
                    <p>Día: <strong className="size">{meetings.date}</strong></p>
                    <p>Hora: <strong className="size">{meetings.time}</strong></p>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
