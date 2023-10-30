

import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader,useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { getDistance } from 'geolib';
import svy21Wrapper from './svy21Wrapper';
import { GoBookmark,GoBookmarkFill } from 'react-icons/go';

import {db} from '../firebase';
import {arrayUnion, doc,updateDoc} from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import House from './House';

function ListView ({ matchingItems }) {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [savedProperties, setSavedProperties] = useState([]);

  const [like, setLike] = useState(false)
  const [saved,setSaved] = useState(false)

  const {user} = UserAuth();

  const propertyID = doc[db,'users', `${user?.email}`]



    console.log("hi")
  console.log(matchingItems)
  console.log("hiiiiiii")
  const api = axios.create({
    baseURL: 'http://localhost:3000', // Change this to your server's URL
  });
  

  const handleAddToFavorites = (property) => {
    // Make an API request to add the property to favorites
    api.post('/api/add-to-favorites', { property })
      .then((response) => {
        if (response.data.success) {
          // Add the property to the client-side state
          setSavedProperties([...savedProperties, property]);
        }
      })
      .catch((error) => {
        console.error('Failed to add to favorites:', error);
      });
  };

  // Function to remove a property from favorites
  const handleRemoveFromFavorites = (property) => {
    // Make an API request to remove the property from favorites
    api.post('/api/remove-from-favorites', { property })
      .then((response) => {
        if (response.data.success) {
          // Remove the property from the client-side state
          const updatedFavorites = savedProperties.filter((p) => p.id !== property.id);
          setSavedProperties(updatedFavorites);
        }
      })
      .catch((error) => {
        console.error('Failed to remove from favorites:', error);
      });
  };
  
  useEffect(() => {
    if (matchingItems.length) {
      setFilteredProperties(matchingItems);
      setIsLoaded(true);
    } else {
      setFilteredProperties([]); // Clear filteredProperties if matchingItems is empty
      setIsLoaded(false);
    }
  }, [matchingItems]);

  return (
    <div  className = "flex flex-col mx-auto my-auto h-[800px] w-full justify-center ">
      {!isLoaded? (
        <ul className="flex overflow-y-auto space-y-8 bg-gray-200 z-[91] mt-[-900px] ">
          <p>Loading...</p> 
        </ul>
      ) : (
        <ul className="flex flex-col overflow-y-auto space-y-8 bg-gray-200 z-[91] rounded-[20px]  ">
          {filteredProperties.map((property, index) => (
            <House key={index} item = {property.rental[0]} item2 = {property}/>
            ))}
        </ul>
        
      )}
    </div>
  );
};

export default ListView;



/*

    console.log("hi")
  console.log(matchingItems)
  console.log("hiiiiiii")
  const api = axios.create({
    baseURL: 'http://localhost:3000', // Change this to your server's URL
  });
  

  const handleAddToFavorites = (property) => {
    // Make an API request to add the property to favorites
    api.post('/api/add-to-favorites', { property })
      .then((response) => {
        if (response.data.success) {
          // Add the property to the client-side state
          setSavedProperties([...savedProperties, property]);
        }
      })
      .catch((error) => {
        console.error('Failed to add to favorites:', error);
      });
  };

  // Function to remove a property from favorites
  const handleRemoveFromFavorites = (property) => {
    // Make an API request to remove the property from favorites
    api.post('/api/remove-from-favorites', { property })
      .then((response) => {
        if (response.data.success) {
          // Remove the property from the client-side state
          const updatedFavorites = savedProperties.filter((p) => p.id !== property.id);
          setSavedProperties(updatedFavorites);
        }
      })
      .catch((error) => {
        console.error('Failed to remove from favorites:', error);
      });
  };
  
  useEffect(() => {
    if (matchingItems.length) {
      setFilteredProperties(matchingItems);
      setIsLoaded(true);
    } else {
      setFilteredProperties([]); // Clear filteredProperties if matchingItems is empty
      setIsLoaded(false);
    }
  }, [matchingItems]);

  return (
    <div  className = "flex flex-col mx-auto my-auto h-[800px] w-full justify-center ">
      {!isLoaded? (
        <ul className="flex overflow-y-auto space-y-8 bg-gray-200 z-[91] mt-[-900px] ">
          <p>Loading...</p> 
        </ul>
      ) : (
        <ul className="flex flex-col overflow-y-auto space-y-8 bg-gray-200 z-[91] rounded-[20px]  ">
          {filteredProperties.map((property, index) => (
            
            <li className ="bg-gray-400 p-2"key={index}>
            <h3></h3>
            <div>
            <p>{property.project} @ {property.street}</p>
            </div>
            
            <ul className="flex flex-col justify-between relative items-center">
              {property.rental.map((rentalItem, rentalIndex) => (
                <div key={rentalIndex} className="bg-gray-600 rounded-[20px] flex justify-between items-center h-24 xl:max-w-[1240px] md:w-full px-4 text-white relative z-[100] top-4 xl:mx-auto md:mx-4 mt-1">
                  <li >{rentalItem.propertyType}</li>
                  <li>No. of Rooms: {rentalItem.noOfBedRoom}</li>
                  <li>AreaSqft: {rentalItem.areaSqft}</li>
                <li className="flex" key={rentalIndex}>
                  <li className = "p-2">Rent Price: {rentalItem.rent}</li>
                  <li key={property.id}>
                        {savedProperties.some((p) => p.id === property.id) ? (
                          // Display GoBookmarkFill if the property is in favorites
                          <button onClick={() => handleRemoveFromFavorites(property)}>
                            <GoBookmarkFill />
                          </button>
                        ) : (
                          // Display GoBookmark if the property is not in favorites
                          <button onClick={() => handleAddToFavorites(property)}>
                            <GoBookmark size={28} />
                          </button>
                        )}
                        
                      </li>
                  
                </li>
                
                </div>
              ))}
            </ul>
          </li>
          ))}
        </ul>
        
      )}
    </div>
  );
};

export default ListView;
*/