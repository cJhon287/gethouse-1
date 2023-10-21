import React, { useState,useEffect } from 'react'
import Main from '../components/Main'
import Icon from '../components/Icon'
import BaseUIClass from '../components/BaseUICLass';
import { useNavigate } from 'react-router-dom';

const Home = () => {

 const  [view, setView] = useState('map');
 const  [navbar,setNavbar] = useState('NavbarHome');
 const [updateListMap,setUpdateListMap] = useState({});
 const navigate = useNavigate();

 const toggleView = (selectedView)=>{
  setView(selectedView);
 }
 const toggleNavbar= (homeON)=>{
  setNavbar(homeON);
 }
 useEffect(() => {
  // Check if we are on the /display route
  if (window.location.pathname === '/') {
    // Set the navbar to 'NavbarDisplay' if on the /display route
    setNavbar('NavbarHome');
  }
}, []);

useEffect(() => {
  // Check if we should navigate to /display
  if (navbar === 'NavbarDisplay') {
    navigate('/display');
  }
}, [navbar, navigate]);

  return (
    <>
        
        <BaseUIClass toggleView={toggleView} view={view} toggleNavbar={toggleNavbar} navbar={navbar} />

        <Main/>
        <Icon/>
        <div className = 'text-white'>hi</div>
        

    
    </>
  )
}

export default Home