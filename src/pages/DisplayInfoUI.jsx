import React, { useEffect, useState } from 'react'
import Main from '../components/Main';
import Icon from '../components/Icon';
import ListView from '../components/ListView';
import MapView from '../components/MapView';
import DataController from '../components/DataController';
import BaseUIClass from '../components/BaseUICLass';
import { useNavigate } from 'react-router-dom';
import SearchCriteria from '../components/SearchCriteria';
import HousingDataUpdate from '../components/HousingDataUpdate';
import SearchCriteria2 from '../components/SearchCriteria2';

const DisplayInfoUI = ({viewValue,toggleView}) => {

    
    const  [navbar,setNavbar] = useState('NavbarDisplay');
    const [updateListMap,setUpdateListMap] = useState({});
    const navigate = useNavigate();

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
      if (window.location.pathname === '/login') {
            // Set the navbar to 'NavbarDisplay' if on the /display route
            setNavbar('NavbarLogIn');
      }else if(window.location.pathname === '/'){
            setNavbar('NavbarHome');
      }else if(window.location.pathname === '/display'){
        setNavbar('NavbarDisplay');
        }else if(window.location.pathname === '/account'){
        setNavbar('NavbarAccount');
        }else if(window.location.pathname === '/signup'){
            setNavbar('NavbarSignUp');
        }
      }, []);
      
      useEffect(() => {
      // Check if we should navigate to /display
      if (navbar === 'NavbarHome') {
            navigate('/');
      }else if(navbar === 'NavbarDislay'){
            navigate('/display');
      }else if(navbar === 'NavbarAccount'){
            navigate('/account');
      }else if(navbar === 'NavbarLogIn'){
        navigate('/login');
        }
        else if(navbar === 'NavbarSignUp'){
            navigate('/signup');
            }
      }, [navbar, navigate]);
      

   
     return (
       <>
           
  
           <Main/>
           <Icon/>

           <SearchCriteria setUpdateListMap = {setUpdateListMap}/> 
           <HousingDataUpdate updateListMap = {updateListMap} onDataFiltered1 = {handleDataFilteredMap} onDataFiltered2 = {handleDataFilteredList}/>
           
           <div className="absolute w-full h-full bg-gray-600">
             <div className="flex flex-col mx-auto relatives items-center p-4">
               {viewValue === 'map' ? (
                 <MapView  markers = {marker} matchingItems={matchingItem}/> 
                 
               ) : (
                 <ListView matchingItems={matchingItem}/> // Render the List component conditionally based on the view state
               )}
             </div>
           </div>
           
   
       
       </>
     )
   }


export default DisplayInfoUI