import React, { useState } from 'react'
import Main from '../components/Main'
import Icon from '../components/Icon'
import Navbar2 from '../components/Navbar2';
import Navbar from '../components/Navbar';
import Listt from '../components/Listt';
import Map from '../components/Map'

const Home = () => {

 const  [view, setView] = useState('map');
 const [updateListMap,setUpdateListMap] = useState({});

 const toggleView = (selectedView)=>{
  setView(selectedView);
 }

  return (
    <>
        
        <Navbar toggleView={toggleView} view={view} />

        <Main/>
        <Icon/>
        <Navbar2 setUpdateListMap = {setUpdateListMap}/> {/*Help Me */
        /* the empty state is supposed to be passed into the Navbar2 and
        update based on the selection made by the Selector2 component in Navbar2*/ } 
        <div className="absolute w-full h-full bg-gray-600">
          <div className="flex flex-col mx-auto relatives items-center p-4">
            {view === 'map' ? (
              <Map  updateListMap={updateListMap}/> 
              /*Help Me */
              /*Map component is supposed to receive a coordinate lat,lng*/ 
            ) : (
              <Listt updateListMap={updateListMap}/> // Render the List component conditionally based on the view state
            )}
          </div>
        </div>
        

    
    </>
  )
}

export default Home