import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link} from 'react-router-dom';

const Top5 = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav'
        );
        if (Array.isArray(response.data.result)) {
          setArticles(response.data.result.slice(0, 8).reverse());
        } else {
          console.log('Invalid response:', response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleImageError = (event) => {
    const fallbackImage =
      'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
    if (!event.target.src || event.target.src === 'null') {
      event.target.src = fallbackImage;
    }
  };

  return (
    <div>
      <div className='justify-content-center'>
        <div className='font-bold text-xl pl-4'>TRENDING</div>
      </div>
      <div className='max-w-[1640px] mx-auto p-4 py-5'>
        <Carousel
          showArrows
          infiniteLoop
          centerMode
          centerSlidePercentage={33.33}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          emulateTouch
          swipeable
          dynamicHeight={false}
          swipeScrollTolerance={5}
          selectedItem={0}
        >
          {articles.map((article) => (
            <div key={article.id} className='rounded-xl relative gap-3'>
              <div className='absolute inset-0 bg-black/50 text-white flex flex-col justify-end p-4'>
                <p className='font-bold text-xs px-2 pt-3'>{article.title}</p>
                <p className='px-2'>{article.Category.name}</p>
                <Link to={`/blog/${article.id}/${article.id}`} className='border-white bg-gray-200 text-black mt-2'>Read</Link>
              </div>
              <img
                className='max-w-full h-52 md:h-64 object-cover rounded-xl'
                src={article.image || ''}
                onError={handleImageError}
                alt={article.title}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Top5;