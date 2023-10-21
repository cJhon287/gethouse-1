import React, { useState } from 'react';
import DataController from './DataController';

const SearchCriteria = ({ setUpdateListMap }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedNoOfRooms, setSelectedNoOfRooms] = useState('');
  const [locationLatLng, setLocationLatLng] = useState(null);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedHouseType,setSelectedHouseType] = useState('');
  

  const handleFindHouse = () => {
    // Handle the logic when the "FindHouse" button is clicked
    console.log('Selected Location:', selectedLocation);
    const apiKey = "AIzaSyCx3ImOYKc2pq4_FCQpG0FupDkroHmNK30"
    const region = 'SG';

    // Check if a location is selected
    if (selectedLocation!=="") {
      // Call the geocoding API to get lat/lng for the selected location
      
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${selectedLocation}&region=${region}&key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setLocationLatLng({ lat, lng }); // Set the lat/lng in state
            console.log(`Lat/Lng: ${lat}, ${lng}`);
            console.log(locationLatLng)
          }
        })
        .catch((error) => {
          console.error('Error fetching lat/lng:', error);
        });
    }
    else{
        setLocationLatLng(null);
    }


    
    const selectedCriteria = {

      location: selectedLocation,
      latlng: locationLatLng,
      priceRange: selectedPriceRange,
      noOfRooms: selectedNoOfRooms,
      sizeOfHouse: selectedSize,
      typeOfHouse: selectedHouseType
    };

    

    // Update the updateListMap state with the selected criteria
    setUpdateListMap(selectedCriteria);
    
  };


  return (
    <DataController
      handleFindHouse={handleFindHouse}
      setSelectedLocation={setSelectedLocation}
      setSelectedPriceRange={setSelectedPriceRange}
      setSelectedNoOfRooms={setSelectedNoOfRooms}
      setSelectedSize={setSelectedSize}
      setSelectedHouseType={setSelectedHouseType}
    />
  );
};

export default SearchCriteria;