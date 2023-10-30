import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import Icon from '../components/Icon'
import { useNavigate } from 'react-router-dom'
import BaseUIClass from '../components/BaseUICLass'
import MapView from '../components/MapView'
import { UserAuth } from '../context/AuthContext'
import { onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Account = ({viewValue,toggleView}) => {
      const [property,setPropetys] =useState([])
      const {user}=UserAuth()
      
    const  [navbar,setNavbar] = useState('NavbarAccount');
    const navigate = useNavigate();




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
      <div className="max-w-[800px] mt-[-400px] h-[550px] w-full mx-auto text-center flex flex-col justify-center">
            <MapView markers = {[]}/>
       </div>
      </>
  )
}

export default Account  