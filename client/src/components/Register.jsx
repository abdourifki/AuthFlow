import React, { useState } from "react";
import { Link } from "react-router-dom";
import visibleIcon from '../assets/visible.png';
import hiddenIcon from '../assets/invisible.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formdata, setFormdata]= useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate();
  const handleSubmit= async()=>{
    try{
       const response = await axios.post('http://localhost:5000/auth/signup',formdata)
       console.log(response.data)
       alert('created succefully')
    }catch(err){

    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="bg-[#19283D] bg-rgb(24,38,58) flex items-center justify-center h-screen">
        <div className="h-fit p-6 w-[450px] bg-[#0C131D] bg-rgb(12,19,29) rounded-xl shadow" style={{ boxShadow: "0px 0px 20px 0px cyan" }}>
          <h2 className="text-4xl font-bold mb-2 text-center underline p-7 text-white">
            Register
          </h2>
          <form className="pt-1 ml-5 mr-5">
            <div className="mb-1">
              <label
                htmlFor="username"
                className="block text-cyan-600 font-bold"
              >
                Username:
              </label>
              <input
                type="text"
                value={formdata.username}
                onChange={(e) => setFormdata({...formdata, username: e.target.value})}
                id="username"
                name="username"
                className="text-white font-bold w-full py-1 px-2 border-b-2 focus:outline-none focus:border-white-600 bg-transparent"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-cyan-600 font-bold pt-2 mt-2"
              >
                Email:
              </label>
              <input
                type="email"
                value={formdata.email}
                onChange={(e) => setFormdata({...formdata, email: e.target.value})}
                id="email"
                name="email"
                className="text-white font-bold bg-transparent w-full px-2 border-b-2 focus:outline-none focus:border-white-600"
              />
            </div>

            <div className="mb-4 relative">
              <img
                className="absolute right-3 top-4 w-[30px] cursor-pointer"
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
                type={showPassword ? "text" : "password"}
                id="password"
                value={formdata.password}
                onChange={(e) => setFormdata({...formdata, password: e.target.value})}
                name="password"
                className="text-white bg-transparent w-full px-2 border-b-2 focus:outline-none focus:border-white-600"
              />
            </div>

            <div className="mb-4 relative">
              <img
                className="absolute right-3 top-4 w-[30px] cursor-pointer"
                src={showConfirmPassword ? hiddenIcon : visibleIcon}
                alt={showConfirmPassword ? 'Hidden' : 'Visible'}
                onClick={toggleConfirmPasswordVisibility}
              />
              <label
                htmlFor="confirmPassword"
                className="block text-cyan-600 font-bold pt-2 mt-2"
              >
                Confirm Password:
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formdata.confirmPassword}
                onChange={(e) => setFormdata({...formdata, confirmPassword: e.target.value})}
                name="confirmPassword"
                className="text-white bg-transparent w-full px-2 border-b-2 focus:outline-none focus:border-white-600"
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 w-44 bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-white text-center pt-7">
            Already have an account?
          </p>
          <div className="w-full flex py-2 items-center justify-center">
            <Link
              to="/Login"
              className="text-cyan-600 hover:underline items-center"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
