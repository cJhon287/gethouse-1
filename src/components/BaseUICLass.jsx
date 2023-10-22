import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { GoBookmark } from 'react-icons/go';

const BaseUIClass = ({ toggleView,toggleNavbar,view,navbar }) => {
  const [nav, setNav] = useState(true);
  const navigate = useNavigate();

  

  const handleNav = () => {
    setNav(!nav);
  };

  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
    {navbar==='NavbarHome'?(
    
    <div className="bg-gray-600 rounded-[20px] flex justify-between items-center h-24 xl:max-w-[1240px] md:w-full px-4 text-white relative z-[100] top-4 xl:mx-auto md:mx-4">
      
      <ul className="hidden md:flex">
        <button onClick={() => setIsOpen((prev) => !prev)} className="p-4">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <GoBookmark /> Favorites
          </span>
        </button>
        {isOpen && (
          <button className="bg-gray-400 absolute left-2 top-24 flex flex-col item-start rounded-lg p-4 w-[140px]">
            <Link to="/login">
              <button onClick={() => setIsOpen((prev) => !prev)}>Login/SignUp</button>
            </Link>
          </button>
        )}
        <li className="p-4"></li>
      </ul>
      <Link to="/">
        <h1 onClick ={()=>{
          toggleNavbar('NavbarHome')
        }}
          className="  w-full text-3xl font-bold text-[#0061df] flex items-center justify-center ">
          Welcome Home
        </h1>
      </Link>
      <ul className="hidden md:flex">
        {/* Toggle to display */}
        <Link>
        <button
          onClick={() => {
            toggleView('map'); // Call toggleView with 'map' to switch to Map component
            toggleNavbar('NavbarDisplay');
            
          }}
          className="p-4 border rounded-lg"
        >
          Search
        </button>
        </Link>
      </ul>

      <button onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </button>
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 ' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className="w-full text-3xl font-bold text-[#0061df] m-4">GetHouse</h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b  border-gray-600">Favorite</li>
          <li className="p-4 border-b border-gray-600">Search</li>
        </ul>
      </div>
    </div>
    ):navbar==='NavbarDisplay'?(

    
    <div className="bg-gray-600 rounded-[20px] flex justify-between items-center h-24 xl:max-w-[1240px] md:w-full px-4 text-white relative z-[100] top-4 xl:mx-auto md:mx-4">
    <ul className="hidden md:flex">
      <button onClick={() => setIsOpen((prev) => !prev)} className="p-4">
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <GoBookmark /> Favorites
        </span>
      </button>
      {isOpen && (
        <button className="bg-gray-400 absolute left-2 top-24 flex flex-col item-start rounded-lg p-4 w-[140px]">
          <Link to="/login">
            <button onClick={() => setIsOpen((prev) => !prev)}>Login/SignUp</button>
          </Link>
        </button>
      )}
      <li className="p-4"></li>
    </ul>
    <Link to="/">
      <h1 onClick ={()=>{
        toggleNavbar('NavbarHome')
      }}
        className="  w-full text-3xl font-bold text-[#0061df] flex items-center justify-center ">
        Welcome Home
      </h1>
    </Link>
    <ul className="hidden md:flex">
      {/* Toggle to Map */}
      <Link>
      <button
        onClick={() => {
          toggleView('map'); // Call toggleView with 'map' to switch to Map component
          toggleNavbar('NavbarDisplay');
          
          
        }}
        className="p-4 border rounded-lg"
      >
        Map
      </button>
      </Link>
      
      {/* Toggle to List */}
      <Link>
      <button
        onClick={() => {
          toggleView('list'); // Call toggleView with 'list' to switch to List component
          toggleNavbar('NavbarDisplay');
          

        }}
        className="p-4 border rounded-lg"
      >
        List
      </button>
      </Link>
    </ul>

    <button onClick={handleNav} className="block md:hidden">
      {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
    </button>
    <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 ' : 'ease-in-out duration-500 fixed left-[-100%]'}>
      <h1 className="w-full text-3xl font-bold text-[#0061df] m-4">GetHouse</h1>
      <ul className="uppercase p-4">
        <li className="p-4 border-b  border-gray-600">Favorite</li>
        <li className="p-4 border-b border-gray-600">List</li>
        <li className="p-4 border-b border-gray-600">Map</li>
      </ul>
    </div>
    </div>
    ):(
      <div className="bg-gray-600 rounded-[20px] flex justify-between items-center h-24 xl:max-w-[1240px] md:w-full px-4 text-white relative z-[100] top-4 xl:mx-auto md:mx-4">
    <ul className="hidden md:flex">
      <button>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          Sign Out
        </span>
      </button>
      <li className="p-4"></li>
    </ul>
    <Link to="/">
      <h1 onClick ={()=>{
        toggleNavbar('NavbarHome')
      }}
        className="  w-full text-3xl font-bold text-[#0061df] flex items-center justify-center ">
        Welcome X
      </h1>
    </Link>
    <ul className="hidden md:flex">
    
      
      <Link to='/display'>
      <button
        onClick={() => {
          toggleView('list'); // Call toggleView with 'list' to switch to List component
          toggleNavbar('NavbarDisplay');
          

        }}
        className="p-4 border rounded-lg"
      >
        Search
      </button>
      </Link>
    </ul>
    </div>
    )
    }
  </>
  );
};

export default BaseUIClass;