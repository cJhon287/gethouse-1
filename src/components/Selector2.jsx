import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios'; // Import axios

const Selector2 = ({ onSelect, txtfile, placeHolder }) => {
  const [roadNames, setRoadNames] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);

  // Function to handle geocoding
  const getCoordinates = async (location) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCx3ImOYKc2pq4_FCQpG0FupDkroHmNK30`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        onSelect(`${location}: Lat ${lat}, Lng ${lng}`);

        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const handleSelect = (roadName) => {
    setSelected(roadName);
    setOpen(false);
    setInputValue('');
    onSelect(roadName); // Call the callback prop with the selected roadName

    // Call the getCoordinates function to fetch coordinates when a location is selected
    getCoordinates(roadName);
  };

  useEffect(() => {
    // Fetch the text file containing road names
    fetch(txtfile)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch road names');
        }
        return response.text();
      })
      .then((data) => {
        // Split the text into an array of road names (one per line)
        const namesArray = data.split('\n');
        setRoadNames(namesArray);
      })
      .catch((error) => {
        console.error('Error fetching road names:', error);
      });
  }, []);

  return (
    <div className="shrink w-72 font-medium h-80">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : placeHolder}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder=" "
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {roadNames.map((roadName) => (
          <li
            key={roadName}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              roadName.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              roadName.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (roadName.toLowerCase() !== selected.toLowerCase()) {
                setSelected(roadName);
                setOpen(false);
                setInputValue("");
                onSelect(roadName);
              }
            }}
          >
            {roadName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector2;