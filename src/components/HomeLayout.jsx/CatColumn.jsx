import React, { useEffect, useState } from 'react';

const CatColumn = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  const imageUrls = [
    'https://assets.entrepreneur.com/content/3x2/2000/20191127190639-shutterstock-431848417-crop.jpeg',
    'https://www.effective-states.org/wp-content/uploads/growth-1.jpg',
    'https://www.analyticsinsight.net/wp-content/uploads/2021/07/Technology-Can-Boost-Your-Business-Productivity.jpg',
    'https://i2-prod.mirror.co.uk/incoming/article28845344.ece/ALTERNATES/s615/0_Los-Angeles-Lakers-v-Miami-Heat.jpg',
    'https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium',
    'https://lp-cms-production.imgix.net/2023-02/shutterstock_776445706.jpg',
    'https://cdn.domestika.org/c_fit,dpr_auto,f_auto,t_base_params,w_820/v1648225075/content-items/010/941/507/04-books-films-original.jpg?1648225075',
  ];

  const categoryTexts = {
    bisnis: 'Explore the world of business and entrepreneurship',
    ekonomi: 'Stay updated with the latest economic trends and news',
    teknologi: 'Discover the latest advancements in technology',
    olahraga: 'Get the latest updates on sports and athletics',
    kuliner: 'Discover mouthwatering culinary delights',
    internasional: 'Explore international cultures and destinations',
    fiksi: 'Immerse yourself in the world of fiction and imagination',
  };

  const handleCategoryClick = () => {
    //later fill to change list according to specific categories//
  };

  return (
    <div className="max-w-5xl mx-auto p-3 py-0 grid gap-4 md:gap-8">
      {categories.map((category) => (
        <div
          className="relative rounded-xl overflow-hidden cursor-pointer"
          key={category.id}
          onClick={handleCategoryClick}
        >
          <img
            className="max-h-[150px] md:max-h-[270px] w-full object-cover rounded-xl"
            src={imageUrls[category.id - 1]}
            alt={category.name}
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-xl">
            <div className="text-white p-2 text-center ">
              <p className="font-bold text-2xl bg-gray-500/60">{category.name}</p>
              <p className="text-sm text-gray-200 mb-2 bg-gray-500/60">{categoryTexts[category.name.toLowerCase()]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatColumn;
