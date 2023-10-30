


import React, { useEffect, useState } from 'react';
import { getDistance } from 'geolib';
import svy21Wrapper from './svy21Wrapper';

function HousingDataUpdate({ updateListMap, onDataFiltered1, onDataFiltered2 }) {
  const [matchingItems, setMatchingItems] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch('/rental.json') // Adjust the path as needed
      .then((response) => response.json())
      .then((data) => {
        const matchingItemsArray = [];
        const markersArray = [];

        data.Result.forEach((item) => {
          let shouldAddMarker = false;
          const matchingRental = []; // Store matching rental items

          if (
            (updateListMap.location !== "" ||
              updateListMap.priceRange !== "" ||
              updateListMap.noOfRooms !== "" ||
              updateListMap.sizeOfHouse !== "" ||
              updateListMap.typeOfHouse !== "") &&
            (isWithin1000m(updateListMap.latlng, item) &&
              isPriceInRange(updateListMap.priceRange, item) &&
              hasMatchingNoOfRooms(updateListMap.noOfRooms, item) &&
              isSizeInRange(updateListMap.sizeOfHouse, item) &&
              isSameHouseType(updateListMap.typeOfHouse, item))
          ) {
            shouldAddMarker = true;
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

            // Store the matching rental items
            matchingRental.push(
              ...item.rental.filter((rentalItem) => {
                return (
                  isPriceInRange(updateListMap.priceRange, { rental: [rentalItem] }) &&
                  hasMatchingNoOfRooms(updateListMap.noOfRooms, { rental: [rentalItem] }) &&
                  isSizeInRange(updateListMap.sizeOfHouse, { rental: [rentalItem] }) &&
                  isSameHouseType(updateListMap.typeOfHouse, { rental: [rentalItem] })
                );
              })
            );

            matchingItemsArray.push({ ...item, rental: matchingRental });
          }
        });

        // Set the markers on the map
        setMarkers(markersArray);

        setMatchingItems(matchingItemsArray);

        onDataFiltered1(markersArray);
        onDataFiltered2(matchingItemsArray);
      })
      .catch((error) => {
        console.error('Error fetching rental data:', error);
      });
  }, [updateListMap, onDataFiltered1, onDataFiltered2]);

    // Helper function to check if coordinates are within 1000m
    function isWithin1000m(location, item) {
        if(location!=null){
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

  return null; // This component doesn't render anything, it's just for filtering and data management
}

export default HousingDataUpdate;