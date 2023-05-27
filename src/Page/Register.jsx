import React from 'react';
import Navbar from '../components/MainLayout.jsx/Navbar';
import Login from '../components/Login';
import Newsletter from '../components/MainLayout.jsx/Newsletter';
import Footer from '../components/MainLayout.jsx/Footer';

const Register = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar/>
      </div>
      <Login/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Register;