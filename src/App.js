
import React, { useEffect, useState } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home';

import Login from './pages/Login';
import Signup from './pages/Signup';
import { GoogleMap, useLoadScript,useJsApiLoader, Marker } from "@react-google-maps/api";

import DisplayInfoUI from './pages/DisplayInfoUI';
import Account from './pages/Account';
import BaseUIClass from './components/BaseUICLass';
import { AuthContextProvider } from './context/AuthContext';



function App() {
  
  const  [view, setView] = useState('map');
const  [navbar,setNavbar] = useState('NavbarHome');
const [textFromFile, setTextFromFile] = useState('');
const [updateListMap,setUpdateListMap] = useState({});
const navigate = useNavigate();

const toggleView = (selectedView)=>{
 setView(selectedView);
}
const toggleNavbar= (homeON)=>{
 setNavbar(homeON);
}
useEffect(() => {
  // Check if we are on the /login route
  if (window.location.pathname === '/login') {
    // Set the navbar to 'NavbarLogIn' if on the /login route
    setNavbar('NavbarLogIn');
  } else if (window.location.pathname === '/') {
    setNavbar('NavbarHome');
  } else if (window.location.pathname === '/display') {
    setNavbar('NavbarDisplay');
  } else if (window.location.pathname === '/account') {
    setNavbar('NavbarAccount');
  } else if (window.location.pathname === '/signup') {
    setNavbar('NavbarSignUp');
  }
}, []);

useEffect(() => {
 // Check if we should navigate to /display
 if (navbar === 'NavbarDisplay') {
   navigate('/display');
 }
}, [navbar, navigate]);



  
  return (
    <div className=''>
      <AuthContextProvider>

        <BaseUIClass toggleView={toggleView} view={view} toggleNavbar={toggleNavbar} navbar={navbar} />


        <Routes>
            <Route path='/' element ={<Home/>} />
            <Route path='/display' element = {<DisplayInfoUI viewValue={view} toggleView={toggleView}/>} />
            <Route path='/login' element = {<Login viewValue={view} toggleNavbar={toggleNavbar}/>} />
            <Route path='/signup' element = {<Signup viewValue={view} toggleNavbar={toggleNavbar} />} />
            <Route path='/account' element = {<Account viewValue={view} toggleNavbar={toggleNavbar}/>} />
          </Routes> 
        
        </AuthContextProvider>

    </div>
  );
}

export default App;
