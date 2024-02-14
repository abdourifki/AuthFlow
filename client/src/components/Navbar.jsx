import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate= useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/Login');
  }


    return (
      <div className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">Mon Site</h1>
          <div>
           
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };


export default Navbar;
