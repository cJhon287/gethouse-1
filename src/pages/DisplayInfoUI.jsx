import React, { useEffect, useState } from 'react'
import Main from '../components/Main';
import Icon from '../components/Icon';
import ListView from '../components/ListView';
import MapView from '../components/MapView';
import DataController from '../components/DataController';
import BaseUIClass from '../components/BaseUICLass';
import { useNavigate } from 'react-router-dom';
import SearchCriteria from '../components/SearchCriteria';
import MapView2 from '../components/MapView2';
import HousingDataUpdate from '../components/HousingDataUpdate';

const DisplayInfoUI = ({viewValue}) => {

    const  [view, setView] = useState(viewValue);
    const  [navbar,setNavbar] = useState('NavbarDisplay');
    const [updateListMap,setUpdateListMap] = useState({});
    const navigate = useNavigate();

    const toggleView = (selectedView)=>{
        setView(selectedView);
       }
       const toggleNavbar= (homeON)=>{
           setNavbar(homeON);
       }

    const [marker, setMarkers] = useState([])
    const [matchingItem, setMatchingItem] = useState([])
   
    

    const handleDataFilteredMap = (filteredData1) => {
        setMarkers(filteredData1);
    };

    const handleDataFilteredList = (filteredData2) => {
        setMatchingItem(filteredData2);
    };
    

    useEffect(() => {
        // Check if we are on the /display route
        if (window.location.pathname === '/display') {
          // Set the navbar to 'NavbarDisplay' if on the /display route
          setNavbar('NavbarDisplay');
        }
      }, []);
      
      useEffect(() => {
        // Check if we should navigate to /display
        if (navbar === 'NavbarHome') {
          navigate('/');
        }
      }, [navbar, navigate]);
      

   
     return (
       <>
           
           <BaseUIClass toggleView={toggleView} view={view} toggleNavbar={toggleNavbar} navbar={navbar} />
   
           <Main/>
           <Icon/>

           <SearchCriteria setUpdateListMap = {setUpdateListMap}/> 
           <HousingDataUpdate updateListMap = {updateListMap} onDataFiltered1 = {handleDataFilteredMap} onDataFiltered2 = {handleDataFilteredList}/>
           
           <div className="absolute w-full h-full bg-gray-600">
             <div className="flex flex-col mx-auto relatives items-center p-4">
               {view === 'map' ? (
                 <MapView2  markers = {marker}/> 
                 
               ) : (
                 <ListView matchingItems={matchingItem}/> // Render the List component conditionally based on the view state
               )}
             </div>
           </div>
           
   
       
       </>
     )
   }


export default DisplayInfoUI