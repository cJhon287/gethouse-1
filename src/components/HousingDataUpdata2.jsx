import React, { useEffect, useState } from 'react';
import { getDistance } from 'geolib';
import svy21Wrapper from './svy21Wrapper';

function HousingDataUpdate2({ updateListMap, onDataFiltered1, onDataFiltered2 }) {
  const [matchingItems, setMatchingItems] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {

        const matchingItemsArray = [];
        const markersArray = [];

        updateListMap.Result.forEach((item) => { //updateListMap.forEach((item)=>{})
          

          // Push the marker coordinates into the array
          const wgs84Coords = svy21Wrapper.computeLatLon(
            parseFloat(item.y),
            parseFloat(item.x)
          );
          markersArray.push({
            lat: wgs84Coords.lat,
            lng: wgs84Coords.lon,
          });

          // Store the matching rental items
          

          matchingItemsArray.push(item);

        });

        // Set the markers on the map
        setMarkers(markersArray);
        setMatchingItems(matchingItemsArray);

        onDataFiltered1(markersArray);
        onDataFiltered2(matchingItemsArray);

  }, [updateListMap, onDataFiltered1, onDataFiltered2]);


  return null; // This component doesn't render anything, it's just for filtering and data management
}

export default HousingDataUpdate2;