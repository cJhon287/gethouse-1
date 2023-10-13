import React from 'react'
import Main from '../components/Main'
import Icon from '../components/Icon'
import Navbar2 from '../components/Navbar2'
import Map from '../components/Map'
import { GoogleMap } from '@react-google-maps/api'

const Mappage = () => {
    return (
        <>
            <Main/>
            <Icon/>
            <Navbar2/>
            <div className ='absolute w-full h-full bg-gray-600 '>
                <div className='flex flex-col mx-auto relatives items-center p-4'>
                    <Map/>
                </div>
                
             

            </div>
    
            
    
        
        </>
      )
}

export default Mappage