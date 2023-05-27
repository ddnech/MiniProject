import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatArticle = ({number}) => {
  const [catArticles, setCatArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${number}&sort=DESC`)
      .then((response) => setCatArticles(response.data.result))
      .catch((error) => console.log(error));
  }, [number]);

  const handleImageError = (event) => {
    event.target.src =
      'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
  };

  return (
    <div className="w-full bg-gray-100 py-8 px-4">
      <div className="max-w-[1640px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {catArticles.map((article) => (
          <div className="bg-white p-4 relative" key={article.id}>
            <div className="flex items-end justify-end absolute top-1 right-3">
              <p className="text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
            <img
              className="w-[600px] h-[400px] mx-auto my-4"
              src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
              alt={article.title}
              onError={handleImageError}
            />
            <div className="flex flex-col justify-center">
              <p className='font-bold flex justify-between'>
                <span className='bg-gray-400 text-white'>{article.Category.name}</span>
                <span>By {article.User.username}</span>
              </p>
              <h1 className="font-montserrat md:text-4xl sm:text-3xl text-2xl font-bold py-2">
                {article.title || 'Title'}
              </h1>
              <button className="bg-gray-200 w-[200px] rounded font-medium mx-auto my-6 py-3 text-black hover:text-red-500">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatArticle;
