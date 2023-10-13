import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Selector2 from './Selector2';

const Navbar2 = ({setUpdateListMap}) => { 

  /*Help Me*/
  /*I am not sure how to update or pass parameters back to the parent component
  the updateListMap should be empty and updated after the FindHouse button is clicked
  in the Selector2 component*/
  const [selectedLocation, setSelectedLocation] = useState(''); // State to store selected location
  const [selectedPriceRange, setSelectedPriceRange] = useState(''); // State to store selected price range
  const [selectedNoOfRooms, setSelectedNoOfRooms] = useState(''); // State to store selected number of rooms
  const [locationLatLng, setLocationLatLng] = useState(null); // State to store location lat/lng

  const handleFindHouse = () => {
    // Handle the logic when the "FindHouse" button is clicked
    console.log('Selected Location:', selectedLocation);
    const apiKey = "AIzaSyCx3ImOYKc2pq4_FCQpG0FupDkroHmNK30"
    const region = 'SG';

    // Check if a location is selected
    if (selectedLocation) {
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

    console.log('Selected Price Range:', selectedPriceRange);
    console.log('Selected No. of Rooms:', selectedNoOfRooms);
    

    const selectedCriteria = {

      location: selectedLocation,
      latlng: locationLatLng,
      priceRange: selectedPriceRange,
      noOfRooms: selectedNoOfRooms,
    };

    

    // Update the updateListMap state with the selected criteria
    setUpdateListMap(selectedCriteria);
  };

  return (
    <div className="flex items-center justify-between p-4 z-[90] w-full relative border mx-auto h-full">
      <ul className="flex h-[50px] mx-auto ">
        <li className="p-2">
          <Selector2
            txtfile="/gistfile1.txt"
            placeHolder="Select Location"
            onSelect={(selectedItem) => {
              setSelectedLocation(selectedItem); // Set the selected location
            }}
          />
        </li>
        <li className="p-2">
          <Selector2
            txtfile="/pricefile1.txt"
            placeHolder="Price Range"
            onSelect={(selectedItem) => {
              setSelectedPriceRange(selectedItem); // Set the selected price range
            }}
          />
        </li>
        <li className="p-2">
          <Selector2
            txtfile="/housesize.txt"
            placeHolder="No. of Rooms"
            onSelect={(selectedItem) => {
              setSelectedNoOfRooms(selectedItem); // Set the selected number of rooms
            }}
          />
        </li>
        <button
          onClick={handleFindHouse}
          className="rounded-lg p-2 border bg-black-600 w-24 font-medium h-10 text-white"
        >
          FindHouse
        </button>
      </ul>
    </div>
  );
};

export default Navbar2;
