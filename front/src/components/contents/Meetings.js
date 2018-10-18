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
    return (
      <div>
        <h1>Quedadas</h1>
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-6">

          {this.state.listOfMeetings.length > 0 ? (
            <Map id="myMap" meetings={this.state.listOfMeetings} />
            ) : (
              ""
              )}
        </div>
        <div className="col-md-6">
        <button className="btn btn-success btn-class"><Link className="btn-class" to="/Createmeeting">Crea tu quedada</Link></button>
          <div />
          <div>
            <div>
              {this.state.listOfMeetings.map((meetings, index) => {
                return (
                  <div key={meetings._id}>
                    <p>{meetings.name} </p>
                    <p>{meetings.description} </p>
                    <p>{meetings.place} </p>
                    <p>{meetings.date} </p>
                    <p>{meetings.time}</p>
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
