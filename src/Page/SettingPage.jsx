import React from 'react';
import UserProfile from './SettingsPage';
import Navbar from '../components/MainLayout.jsx/Navbar';
import Newsletter from '../components/MainLayout.jsx/Newsletter';
import Footer from '../components/MainLayout.jsx/Footer';

const SettingPage = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar/>
      </div>
      <UserProfile/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default SettingPage;