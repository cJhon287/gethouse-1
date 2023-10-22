

import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader,useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { getDistance } from 'geolib';
import svy21Wrapper from './svy21Wrapper';
import { GoBookmark,GoBookmarkFill } from 'react-icons/go';
function ListView ({ matchingItems }) {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
    console.log("hi")
  console.log(matchingItems)
  console.log("hiiiiiii")
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
    <div  className = "flex flex-col mx-auto h-[800px] w-full justify-center ">
      {!isLoaded? (
        <ul className="flex flex-col overflow-y-auto space-y-8 bg-gray-200 z-[91]  ">
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
                  <li>Size: {rentalItem.areaSqft}</li>
                <li className="flex" key={rentalIndex}>
                  <li className = "p-2">Rent Price: {rentalItem.rent}</li>
                  <button>
                    <GoBookmark size={28} />
                  </button>
                  
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