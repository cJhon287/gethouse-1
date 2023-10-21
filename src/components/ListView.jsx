

import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader,useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { getDistance } from 'geolib';
import svy21Wrapper from './svy21Wrapper';
function ListView ({ matchingItems }) {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
    console.log("hi")
  console.log(matchingItems)
  console.log("hi")
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
    <div>
      {!isLoaded? (
        <p>Loading...</p>
      ) : (
        <ul>hi
          {filteredProperties.map((property, index) => (
            <li key={index}>
              <h3>{property.project}</h3>
              <p>Street: {property.street}</p>
              {/* Add more property details as needed */}
            </li>
          ))}
        </ul>
        
      )}
    </div>
  );
};

export default ListView;