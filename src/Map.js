import ReactMapGL, { Marker } from 'react-map-gl'
import React, { useState } from 'react';
import pin from './pin.png'


const Markers = ({data}) => {
  return data.map(loc => 
    <Marker longitude={loc.loc_long} latitude={loc.loc_lat}>
      <img src={pin} width={'15px'} height={'20px'}/>
    </Marker>
  )
}


const Map = (props) => {
  console.log()
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: props.center[1],
    longitude: props.center[0],
    zoom: 14
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/mapbox/light-v9'
      mapboxApiAccessToken="pk.eyJ1Ijoic2Jyb21sZXkiLCJhIjoiY2pvMXR1bno3MGV3NjN3cG9qZzVpYTl3ZiJ9.1utu9YP3dCe2_pmnmLgIgw"
      onViewportChange={setViewport}
    >
      {props.locations.map((l) => (
       <Marker longitude={l.loc_long} latitude={l.loc_lat}>
        <img src={pin} width={'15px'} height={'20px'}/>
      </Marker>
      ))}
      <Marker longitude={props.center[0]} latitude={props.center[1]}>
        <img src={pin} width={'15px'} height={'20px'}/>
      </Marker>
    </ReactMapGL>
  );
}

export default Map
