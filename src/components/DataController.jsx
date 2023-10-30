import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import HouseSearchController from './HouseSearchController';

const DataController = ({handleFindHouse, setSelectedLocation, setSelectedPriceRange, setSelectedNoOfRooms, setSelectedSize, setSelectedHouseType}) => { 

 
  return (
    <div className="flex items-center justify-between mt-[-40px] p-4 z-[94] w-full relative border mx-auto h-full bg-gray-800">
      <ul className="flex h-[50px] mx-auto ">
        <li className="p-2">
          <HouseSearchController
            txtfile="/Locations.txt"
            placeHolder="Select Location"
            onSelect={(selectedItem) => {
              setSelectedLocation(selectedItem); // Set the selected location
            }}
          />
        </li>
        <li className="p-2">
          <HouseSearchController
            txtfile="/PriceRange.txt"
            placeHolder="Price Range"
            onSelect={(selectedItem) => {
              setSelectedPriceRange(selectedItem); // Set the selected price range
            }}
          />
        </li>
        <li className="p-2">
          <HouseSearchController
            txtfile="/NoOfRoom.txt"
            placeHolder="No. of Rooms"
            onSelect={(selectedItem) => {
              setSelectedNoOfRooms(selectedItem); // Set the selected number of rooms
            }}
          />
        </li>
        <li className="p-2">
          <HouseSearchController
            txtfile="/HouseSize.txt"
            placeHolder="Size (Square ft)"
            onSelect={(selectedItem) => {
              setSelectedSize(selectedItem); // Set the selected number of rooms
            }}
          />
        </li>
        <li className="p-2">
          <HouseSearchController
            txtfile="/HouseType.txt"
            placeHolder="Type of House"
            onSelect={(selectedItem) => {
              setSelectedHouseType(selectedItem); // Set the selected number of rooms
            }}
          />
        </li>
        <button
          onClick={handleFindHouse}
          className="rounded-lg p-2 border bg-black-900 w-24 font-medium h-10 text-white"
        >
          FindHouse
        </button>
      </ul>
    </div>
  );
};

export default DataController;