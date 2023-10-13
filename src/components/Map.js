

import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader,useLoadScript, Marker } from '@react-google-maps/api';
import { getDistance } from 'geolib';
import svy21Wrapper from './svy21Wrapper';

const containerStyle = {
  width: '900px',
  height: '600px'
};

const center = {
  lat:  1.371106,
  lng: 103.948827
};

function Map({updateListMap}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCx3ImOYKc2pq4_FCQpG0FupDkroHmNK30"
  })

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  console.log(updateListMap)

  useEffect(() => {

    console.log(updateListMap.location)
    
    
    if (isLoaded && (updateListMap.location || updateListMap.priceRange || updateListMap.noOfRooms)) {
      // Fetch your rental data from the JSON file
      fetch('/rental.json') // Adjust the path as needed
        .then((response) => response.json())
        .then((data) => {
          // Create an array to store markers
          const markersArray = [];
  
          // Loop through the data and filter based on the criteria
          data.Result.forEach((item) => {

           

            let shouldAddMarker = false;
            if((updateListMap.location!="" || updateListMap.priceRange!="" || updateListMap.noOfRooms!="")
            &&
            (isWithin1000m(updateListMap.latlng, item)&&isPriceInRange(updateListMap.priceRange, item)&&hasMatchingNoOfRooms(updateListMap.noOfRooms, item))
            ){
              shouldAddMarker=true;
            }
  
            if (shouldAddMarker) {
              // Push the marker coordinates into the array
              const wgs84Coords = svy21Wrapper.computeLatLon(
                parseFloat(item.y),
                parseFloat(item.x)
              );
              markersArray.push({
                lat: wgs84Coords.lat,
                lng: wgs84Coords.lon,
              });
            }
          });
  
          // Set the markers on the map
          setMarkers(markersArray);
        })
        .catch((error) => {
          console.error('Error fetching rental data:', error);
        });
    }
  }, [isLoaded, updateListMap]);
  
  // Helper function to check if coordinates are within 1000m
  function isWithin1000m(location, item) {
    if(location!=""){
      const wgs84Coords = svy21Wrapper.computeLatLon(
        parseFloat(item.y),
        parseFloat(item.x)
      );
      const distance = getDistance(
        {
          latitude: location.lat,
          longitude: location.lng,
        },
        {
          latitude: wgs84Coords.lat,
          longitude: wgs84Coords.lon,
        }
      );

      return distance <= 1000;
    }
    else{
      return true;
    }
    
  }
  
  // Helper function to check if price is within the selected range
  function isPriceInRange(selectedPriceRange, item) {
    if(selectedPriceRange!=""){
      const [minRent, maxRent] = selectedPriceRange.split('-');
      console.log("hi")
      console.log(minRent)
      console.log(maxRent)
      return item.rental.some((rental) => (rental.rent >= parseInt(minRent) && rental.rent <= parseInt(maxRent)));
      

    }
    else{
      return true;
    }
  }
  
  // Helper function to check if the number of rooms matches
  function hasMatchingNoOfRooms(selectedNoOfRooms, item) {
    if(selectedNoOfRooms!=""){
      return item.rental.some((rental) => parseInt(rental.noOfBedRoom) === parseInt(selectedNoOfRooms));
    }
    else{
      return true;
    }
  }

{/*
  useEffect(() => {
    console.log(updateListMap)
    if (isLoaded && updateListMap.location) {
      console.log("Im in map now")
      // Fetch your rental data from the JSON file
      fetch('/rental.json') // Adjust the path as needed
        .then((response) => response.json())
        .then((data) => {
          // Create an array to store markers
          const markersArray = [];
  
          // Loop through the data and filter based on the distance
          data.Result.forEach((item) => {
            const wgs84Coords = svy21Wrapper.computeLatLon(
              parseFloat(item.y),
              parseFloat(item.x)
            );
  
            const distance = getDistance(
              {
                latitude: updateListMap.latlng.lat,
                longitude: updateListMap.latlng.lng,
              },
              {
                latitude: wgs84Coords.lat,
                longitude: wgs84Coords.lon,
              }
            );
  
            if (distance <= 1000) {
              console.log("hi")
              // Push the marker coordinates into the array
              markersArray.push({
                lat: wgs84Coords.lat,
                lng: wgs84Coords.lon,
              });
            }
          });
  
          // Set the markers on the map
          console.log("Markers Array:", markersArray);
          setMarkers(markersArray);
        })
        .catch((error) => {
          console.error('Error fetching rental data:', error);
        });
    }
  }, [isLoaded, updateListMap]);
*/}

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
     <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        { 
          markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))
        }
        <></>
      </GoogleMap>

      
      </>
  ) : <></>
}

export default Map