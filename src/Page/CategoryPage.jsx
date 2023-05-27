import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/MainLayout.jsx/Navbar';
import Newsletter from '../components/MainLayout.jsx/Newsletter';
import Footer from '../components/MainLayout.jsx/Footer';
import CatArticle from '../components/CatArticle';

const CategoryPage = () => {
  const { number } = useParams();

  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar/>
      </div>
      <CatArticle number={number} className="z-0" />
      <Newsletter />
      <Footer />
    </>
  );
};

export default CategoryPage;

