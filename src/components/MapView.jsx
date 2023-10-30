import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { FaMapMarkerAlt,FaMapMarker } from "react-icons/fa";
import CustomMarker from '../assets/images/icons8-markerpurple.png'
import MarkerInfo from './MarkerInfo';

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

function MapView({ markers, matchingItems }) {
    
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCx3ImOYKc2pq4_FCQpG0FupDkroHmNK30"
      })

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

  const handleMarkerMouseEnter = (marker,index) => {

    // Set the selected marker when mouse enters
    console.log("hihi")
    console.log(matchingItems[selectedIndex])
    console.log("hihi")
    setSelectedMarker(marker);
    setSelectedIndex(index);
    setInfoWindowOpen(true);


  };

  const handleMarkerMouseLeave = () => {
    // Clear the selected marker when mouse leaves
    setSelectedMarker(null);
    setSelectedIndex("");
    setInfoWindowOpen(false);
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={singaporeBounds}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {markers.map((marker, index) => (
          
          <Marker
            key={index}
            
            position={marker}
            options ={{
              icon: CustomMarker,
            }}
            onClick={() => handleMarkerMouseEnter(marker,index)}
            ></Marker>
          ))}
  
          {selectedMarker&& infoWindowOpen&& matchingItems[selectedIndex]&&(
            <InfoWindow
              position={selectedMarker}
              onCloseClick={() => {
                setSelectedMarker(null);
                setSelectedIndex("");
                setInfoWindowOpen(false);
                handleMarkerMouseLeave()
              }} // Handle closing the InfoWindow
            >
              <h1>{matchingItems[selectedIndex].street}</h1>
              
            </InfoWindow>
          )}
        
      </GoogleMap>

      
    </>

    
  ) : <></>;
}

export default MapView;