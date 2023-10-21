

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

function MapView({updateListMap}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCx3ImOYKc2pq4_FCQpG0FupDkroHmNK30"
  })

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [matchingItems, setMatchingItems] = useState([]);

  useEffect(() => {
    console.log("hiiiiiiiiii")
    console.log(updateListMap)
    console.log("byeeeeeeeeeee")
    
    if (isLoaded) {
      // Fetch your rental data from the JSON file
      fetch('/rental.json') // Adjust the path as needed
        .then((response) => response.json())
        .then((data) => {
          // Create an array to store markers
          const markersArray = [];
          const matchingItemsArray = []
  
          // Loop through the data and filter based on the criteria
          data.Result.forEach((item) => {

           

            let shouldAddMarker = false;
            if(
            (updateListMap.location!=="" 
            || updateListMap.priceRange!=="" 
            || updateListMap.noOfRooms!=="" 
            || updateListMap.sizeOfHouse!==""
            || updateListMap.typeOfHouse!=="") 
            &&
            (isWithin1000m(updateListMap.latlng, item)
            &&isPriceInRange(updateListMap.priceRange, item)
            &&hasMatchingNoOfRooms(updateListMap.noOfRooms, item)
            &&isSizeInRange(updateListMap.sizeOfHouse,item)
            &&isSameHouseType(updateListMap.typeOfHouse, item))
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

              matchingItemsArray.push(item);
            }
          });
  
          // Set the markers on the map
          setMarkers(markersArray);

          setMatchingItems(matchingItemsArray);

          
          
        })
        .catch((error) => {
          console.error('Error fetching rental data:', error);
        });
    }
  }, [isLoaded, updateListMap]);
  
  // Helper function to check if coordinates are within 1000m
  function isWithin1000m(location, item) {
    if(location!==null){
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
    if(selectedPriceRange!==""){
      const [minRent, maxRent] = selectedPriceRange.split('-');
      
      return item.rental.some((rental) => (rental.rent >= parseInt(minRent) && rental.rent <= parseInt(maxRent)));
      

    }
    else{
      return true;
    }
  }
  
  // Helper function to check if the number of rooms matches
  function hasMatchingNoOfRooms(selectedNoOfRooms, item) {
    if(selectedNoOfRooms!==""){
      return item.rental.some((rental) => parseInt(rental.noOfBedRoom) === parseInt(selectedNoOfRooms));
    }
    else{
      return true;
    }
  }
    // Helper function to check if the size matches
  function isSizeInRange(selectedSize, item) {
    if(selectedSize!==""){
      const [minSize, maxSize] = selectedSize.split('-');

      return item.rental.some((rental)=>{
        const [minSqft,maxSqft]=rental.areaSqft.split('-');
        const selectedMin = parseInt(minSize);
        const selectedMax = parseInt(maxSize);
        const itemMin = parseInt(minSqft);
        const itemMax = parseInt(maxSqft); 
        //1001-2000 -> 1050 ->     return 1000<=1050<=1100
        return ((selectedMin+selectedMax)/2)<= itemMax && ((selectedMin+selectedMax)/2) >= itemMin

      });
      

    }
    else{
      return true;
    }
  }

  function isSameHouseType(selectedHouseType, item) {
    if(selectedHouseType!==""){
      return item.rental.some((rental) => rental.propertyType.trim() === selectedHouseType.trim());
    }
    else{
      return true;
    }
  }


  const onLoad = React.useCallback(function callback(map) {
    
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

export default MapView