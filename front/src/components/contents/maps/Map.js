import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCtFGWWXJyAzch--tvKAt82xqXSj7W383M",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  let markers;
  let marker = '';
  console.log(props.marker);

  if(props.marker) {
    marker = <Marker position={{ lat: props.marker[0].lat, lng: props.marker[0].lng }} />
  }

  if (props.markers) {
    markers = props.markers.map((e, i) => (
      <Marker key={i} position={{ lat: e.lat, lng: e.lng }} />
    ));
  }

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 40.4169473, lng: -3.7057172 }}
      onClick={e => props.onMarkerClick(e)}
    >
      {markers}
      {marker}
    </GoogleMap>
  );
});

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  componentDidMount() {
    this.getMarkers();
  }

  getMarkers = () => {
    if (this.props.meetings && this.props.meetings.length > 0) {
      const keep = this.props.meetings.map(e => {
        return {
          lat: e.location.coordinates[0],
          lng: e.location.coordinates[1]
        };
      });

      this.setState({ markers: keep });
    }
  };

  handleMarkerClick = e => {
    this.setState({ marker: [{ lat: e.latLng.lat(), lng: e.latLng.lng() }] });
    if (this.props.handleClick) this.props.handleClick(e);
  };

  render() {
    return (
      <MyMapComponent
        onMarkerClick={this.handleMarkerClick}
        markers={this.state.markers}
        marker={this.state.marker}
      />
    );
  }
}

export default Map;
