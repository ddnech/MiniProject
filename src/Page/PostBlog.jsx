import React from 'react';
import Navbar from '../components/MainLayout.jsx/Navbar';
import Hero from '../components/Hero';
import Newsletter from '../components/MainLayout.jsx/Newsletter';
import Footer from '../components/MainLayout.jsx/Footer';

const Blog = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar/>
      </div>
      <Hero/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Blog;