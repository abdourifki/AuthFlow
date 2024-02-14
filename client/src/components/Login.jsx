import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import visibleIcon from '../assets/visible.png';
import hiddenIcon from '../assets/invisible.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useDispatch,useSelector} from "react-redux"
import { getRoles } from "../store/auth/authSlice";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata]= useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();


  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        if(!localStorage.getItem('token')){
          return console.log('no token found')
        }
        const response = await axios.get('http://localhost:5000/auth/checkLogin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response)

        if (response.data.loggedIn) {
          navigate('/Navbar');
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkLoggedIn();
  }, [navigate]);

  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', formdata);
      console.log(response.data);
      
      // Récupérer le token depuis la réponse
      const token = response.data.token;
      console.log(token);
  
      // Stocker le token dans le localStorage
      localStorage.setItem('token', token);
  
      // Rediriger vers la page Navbar
      navigate('/Navbar');
    } catch (err) {
      console.error(err);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch=useDispatch()
  const roles=useSelector(state=>state)
  useEffect(()=>{
    const getU=()=>{
  dispatch(getRoles())
    }
    getU()
  },[dispatch])
  console.log(roles)


  return (
    <>
      <div className="bg-[#19283D] bg-rgb(24,38,58) flex items-center justify-center h-screen">
        <div className="h-fit p-6 w-[450px] bg-[#0C131D] bg-rgb(12,19,29) rounded-xl shadow" style={{ boxShadow: '0px 0px 20px 0px cyan' }}>"
          <h2 className=" text-4xl font-bold mb-2 text-center underline p-7 text-white">
            Login
          </h2>
          <form className="pt-1 ml-5 mr-5">
            <div className="mb-1">
              <label
                htmlFor="username"
                className="block text-cyan-600 font-bold "
              >
                Username:
              </label>
              <input
                onChange={(e) => setFormdata({...formdata, username: e.target.value})}
                type="text"
                id="username"
                value={formdata.username}
                name="username"
                className="text-white font-bold w-full  py-1 px-2 border-b-2 focus:outline-none focus:border-white-600 bg-transparent"
              />
            </div>

            <div className="mb-4 relative">
              <img
                className="absolute right-3 top-5 w-[30px] cursor-pointer"
                src={showPassword ? hiddenIcon : visibleIcon}
                alt={showPassword ? 'Hidden' : 'Visible'}
                onClick={togglePasswordVisibility}
              />
              <label
                htmlFor="password"
                className="block text-cyan-600 font-bold pt-2 mt-2"
              >
                Password:
              </label>
              <input
                onChange={(e) => setFormdata({...formdata, password: e.target.value})}
                type={showPassword ? "text" : "password"}
                value={formdata.password}
                id="password"
                name="password"
                className=" text-white bg-transparent w-full px-2  border-b-2 focus:outline-none focus:border-white-600"
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <button
              onClick={handleSubmit}
                type="button"
                className="mt-4 w-44   text-white px-4 py-2 rounded-md transition duration-200 ease-in-out bg-blue-600 hover:bg-blue-700 active:bg-blue-900 focus:outline-none"
              >
                Login
              </button>
            </div>
            <p className="text-white text-center pt-7">
              You don't have an account?
            </p>
            <div className="w-full flex items-center justify-center">
              <Link
                to="/register"
                className="text-cyan-600 hover:underline items-center "
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
