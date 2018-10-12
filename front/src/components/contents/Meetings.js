import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';



class Meetings extends Component {

  render() {
    const style = {
      width: '600px',
      height: '100%',
      marginRight: '750px',
    }
    return (
      <div>
        <h1>Quedadas</h1>
          <hr/>
            <div >
              <Map style = {style} google={this.props.google} zoom={14} initialCenter = {{ lat: 40.4169473, lng: -3.7057172 }}>
                <Marker onClick={this.onMarkerClick} name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                        {/* <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div> */}
                </InfoWindow>
              </Map>
            </div>
            <div>
              <Link to='/Createmeeting'>Crea tu quedada</Link>
                  {/* Lista Quedadas */}
              </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCtFGWWXJyAzch--tvKAt82xqXSj7W383M")
})(Meetings)