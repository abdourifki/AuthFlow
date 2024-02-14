import React from 'react';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Register from '../components/Register';
import { Route, Routes } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <Routes>
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AuthLayout;
