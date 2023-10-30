import React, { useState } from 'react';
import DataController from './DataController';
import axios from 'axios';

const SearchCriteria2 = ({ setUpdateListMap }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedNoOfRooms, setSelectedNoOfRooms] = useState('');
  const [locationLatLng, setLocationLatLng] = useState(null);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedHouseType,setSelectedHouseType] = useState('');
  

  const handleFindHouse = async() => {
    // Handle the logic when the "FindHouse" button is clicked
    const requestData = {
        street: selectedLocation,
        rental_price: selectedPriceRange,
        num_of_bedroom: selectedNoOfRooms,
        area: selectedSize,
        houseType: selectedHouseType,

      };
    const apiKey = "AIzaSyCx3ImOYKc2pq4_FCQpG0FupDkroHmNK30"
    const region = 'SG';

    // Check if a location is selected
/*
    fetch('/filter-housing-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the filtered data received from the backend
          // Update the UI as needed with the filtered data
          // For example, setMatchingItems and setMarkers based on the response
            setUpdateListMap(data)
        })
        .catch((error) => {
          console.error('Error filtering housing data:', error);
        });
  };
*/
      const criteria = {
        location: selectedLocation,
        priceRange: selectedPriceRange,
        houseType: selectedHouseType,
        size: selectedSize,
        numberOfRooms: selectedNoOfRooms
      };

      // Construct the URL based on user criteria
      const apiUrl = `http://localhost:8080/search?location=Raffles&priceRange=0-2500&houseType=Non-landed%20Properties&size=30&numberOfRooms=1`;
      console.log("hmmmm")
      try{

        const response1 = await fetch(apiUrl);
        const result1 =await response1.json();
        console.log(result1)
      }catch (error){
        console.log("FAILLLLLLLLLLLL")
        console.error('Error fetching data:', error);
        console.log("FAILLLLLLLLLLLL")
        
      };
      console.log("hmmmm")
      // Make a fetch request to the constructed URL
      fetch(apiUrl, {
            mode: 'no-cors',
            method: "get",
            headers: {
                 "Content-Type": "application/json"
            },
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("huh")
        return response.json();
      
      })
      .then(data => {
        console.log(data)
        console.log("suceess")
      })
      .catch(error => {
        console.log("fail")
        console.error('Error fetching data:', error);
        console.log("fail")
      });

      

        axios.get(apiUrl)
         .then((response) => {
          // Handle the filtered data received from the backend
          // Update the UI as needed with the filtered data
          // For example, setMatchingItems and setMarkers based on the response
           console.log(response.data)
          })
          .catch((error) => {
            console.error('Error filtering housing data:', error);
          });
      /*
            // Use Axios to make the POST request
        axios.post('/filter-housing-data', requestData, {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
        // Handle the filtered data received from the backend
        // Update the UI as needed with the filtered data
        // For example, setMatchingItems and setMarkers based on the response
        setUpdateListMap(response.data);
        })
        .catch((error) => {
        console.error('Error filtering housing data:', error);
        });

        */
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

export default SearchCriteria2;