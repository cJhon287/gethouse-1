
import React from 'react'
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Selector2 from './components/Selector2';
import Navbar2 from './components/Navbar2';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mappage from './pages/Mappage';
import { GoogleMap, useLoadScript,useJsApiLoader, Marker } from "@react-google-maps/api";
import Map from './components/Map';



function App() {

  
  
  return (
    <div className=''>
      


       <Routes>
          <Route path='/' element ={<Home/>} />
          <Route path='/login' element = {<Login />} />
          <Route path='/signup' element = {<Signup />} />
          <Route path='/mappage' element = {<Mappage />} />
        </Routes> 
        


    </div>
  );
}

export default App;
