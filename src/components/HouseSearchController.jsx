import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const HouseSearchController = ({ onSelect, txtfile, placeHolder }) => {
  const [roadNames, setRoadNames] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch the text file containing road names
    fetch(txtfile)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch road names");
        }
        return response.text();
      })
      .then((data) => {
        // Split the text into an array of road names (one per line)
        const namesArray = data.split("\n");
        // Add "Deselect" as the first option in the list
        namesArray.unshift("Deselect");
        setRoadNames(namesArray);
      })
      .catch((error) => {
        console.error("Error fetching road names:", error);
      });
  }, []);

  const handleSelect = (roadName) => {
    if (roadName === "Deselect") {
      // Handle deselection by clearing the selection
      setSelected("");
    } else {
      setSelected(roadName);
    }
    setOpen(false);
    setInputValue("");
    onSelect(roadName === "Deselect" ? "" : roadName);
  };

  return (
    <div className="w-44 font-medium h-80">
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
            onClick={() => handleSelect(roadName)}
          >
            {roadName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseSearchController;