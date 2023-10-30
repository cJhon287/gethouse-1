import React, { useState,useEffect } from 'react'
import Main from '../components/Main'
import Icon from '../components/Icon'
import BaseUIClass from '../components/BaseUICLass';
import { useNavigate } from 'react-router-dom';

const Home = () => {

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

useEffect(() => {
  // Fetch the content of the .txt file and update the state variable
  fetch('/Homepage.txt')
    .then((response) => response.text())
    .then((data) => {
      setTextFromFile(data);
    })
    .catch((error) => {
      console.error('Error fetching text file:', error);
    });
}, []);

  return (
    <>
        
        

        <Main/>
        <Icon/>
        <div className = 'text-white text-lg bg-gray-600 p-2 m-2 mt-[-10px] rounded-[20px] '>{textFromFile}</div>s
        

    
    </>
  )
}

export default Home