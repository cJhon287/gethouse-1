import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import Icon from '../components/Icon'
import MapView2 from '../components/MapView2'
import { useNavigate } from 'react-router-dom'
import BaseUIClass from '../components/BaseUICLass'

const Account = () => {

      const  [view, setView] = useState('account');
    const  [navbar,setNavbar] = useState('NavbarAccount');
    const navigate = useNavigate();

    const toggleView = (selectedView)=>{
        setView(selectedView);
       }
       const toggleNavbar= (homeON)=>{
           setNavbar(homeON);
       }

      useEffect(() => {
      // Check if we are on the /display route
      if (window.location.pathname === '/display') {
            // Set the navbar to 'NavbarDisplay' if on the /display route
            setNavbar('NavbarHome');
      }else if(window.location.pathname === '/'){
            setNavbar('NavbarDisplay');
      }
      }, []);
      
      useEffect(() => {
      // Check if we should navigate to /display
      if (navbar === 'NavbarHome') {
            navigate('/');
      }else if(navbar === 'NavbarDislay'){
            navigate('/display');
      }
      }, [navbar, navigate]);
  return (
      <>
            <BaseUIClass toggleView={toggleView} view={view} toggleNavbar={toggleNavbar} navbar={navbar} />
            <Main/>
      <div className="max-w-[800px] mt-[-400px] h-[550px] w-full mx-auto text-center flex flex-col justify-center">
            <MapView2 markers = {[]}/>
       </div>
      </>
  )
}

export default Account