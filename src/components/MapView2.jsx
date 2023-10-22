import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '900px',
  height: '600px',
};

const center = {
  lat: 1.371106,
  lng: 103.948827,
};

const singaporeBounds = {
  // Define the LatLngBounds that encapsulate the entire Singapore area.
  north: 1.470771, // Adjust these coordinates as needed
  south: 1.202882,
  east: 104.053650,
  west: 103.607494,
};

function MapView2({ markers }) {
    
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCx3ImOYKc2pq4_FCQpG0FupDkroHmNK30"
      })

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map) {
      // Set the initial zoom level to fit the entire Singapore area.
      const bounds = new window.google.maps.LatLngBounds(singaporeBounds);
      map.fitBounds(bounds);
    }
  }, [isLoaded, map]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={singaporeBounds}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
        <></>
      </GoogleMap>
    </>
  ) : <></>;
}

export default MapView2;