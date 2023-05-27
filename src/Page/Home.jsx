import React from 'react';
import Navbar from '../components/MainLayout.jsx/Navbar';
import Hero from '../components/Hero';
import Top5 from '../components/HomeLayout.jsx/Top5';
import Article from '../components/HomeLayout.jsx/Article';
import Newsletter from '../components/MainLayout.jsx/Newsletter';
import Footer from '../components/MainLayout.jsx/Footer';
import CatColumn from '../components/HomeLayout.jsx/CatColumn';

const Home = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar/>
      </div>
      <Hero/>
      <Top5/>
      <div className="flex">
        <div className="w-3/4">
          <Article/>
        </div>
        <div className="w-1/4 z-0">
            <CatColumn/>
        </div>
      </div>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;