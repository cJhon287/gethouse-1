

import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader,useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { getDistance } from 'geolib';
import svy21Wrapper from './svy21Wrapper';
function Listt ({ updateListMap }) {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch your rental data from the JSON file
    console.log("Im in listt now")
    console.log(updateListMap)
    
    fetch('/rental.json') // Adjust the path as needed
      .then((response) => response.json())
      .then((data) => {
        // Filter the data based on the criteria in updateListMap
        const filteredData = data.Result.filter((item) => {
          // Check if selectedLocation and locationLatLng are within 1000m

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
          console.log("hi")
          console.log(distance)

          if (distance <= 1000) {
            
            // Check if selectedPriceRange is within the rent range
            const [minRent, maxRent] = updateListMap.selectedPriceRange.split('-');
            console.log(minRent)
            if (item.rent >= minRent && item.rent <= maxRent) {
              // Check if selectedNoOfRooms matches the property's noOfBedRoom
              if (item.rental.some((rental) => rental.noOfBedRoom === updateListMap.selectedNoOfRooms)) {
                return true;
              }
            }
          }

          return false;
        });

        // Set the filtered properties in state
        setFilteredProperties(filteredData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching rental data:', error);
        setIsLoading(false);
      });
  }, [updateListMap]);

  return (
    <div>
      {isLoading ? (
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

export default Listt;