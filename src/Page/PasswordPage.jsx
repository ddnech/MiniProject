import React from 'react';
import Navbar from '../components/MainLayout.jsx/Navbar';
import Newsletter from '../components/MainLayout.jsx/Newsletter';
import Footer from '../components/MainLayout.jsx/Footer';
import Password from './Password';

const Passwords = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar/>
      </div>
      <div className="">
      <Password/>
      </div>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Passwords;