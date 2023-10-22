
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';

import Login from './pages/Login';
import Signup from './pages/Signup';
import { GoogleMap, useLoadScript,useJsApiLoader, Marker } from "@react-google-maps/api";

import DisplayInfoUI from './pages/DisplayInfoUI';
import Account from './pages/Account';



function App() {
  
  return (
    <div className=''>
      


       <Routes>
          <Route path='/' element ={<Home/>} />
          <Route path='/display' element = {<DisplayInfoUI/>} />
          <Route path='/login' element = {<Login />} />
          <Route path='/signup' element = {<Signup />} />
          <Route path='/account' element = {<Account />} />
        </Routes> 
        


    </div>
  );
}

export default App;
