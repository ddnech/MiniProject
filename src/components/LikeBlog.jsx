import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineCalendar } from 'react-icons/ai';
import Navbar from './MainLayout.jsx/Navbar';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

const LikedBlogs = () => {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const token = useSelector((state) => state.tokenAuth.token);

  useEffect(() => {
    const fetchLikedBlogs = async () => {
      try {
        const response = await axios.get(
          'https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedBlogs(response.data.result);
      } catch (error) {
        console.error('Failed to fetch liked blogs:', error);
      }
    };

    fetchLikedBlogs();
  }, [token]);

  const handleImageError = (event) => {
    event.target.src =
      'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
  };

  return (
    <div>
      <Navbar className="z-50" />
      <div className="w-full bg-gray-200 py-5 px-4">
        <div className="max-w-[1640px] mx-auto">
          {likedBlogs.length > 0 ? (
            likedBlogs.map((likedBlog) => (
              <div className="bg-white p-4 mb-6 flex" key={likedBlog.id}>
      
                <div className="flex flex-col justify w-full">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-500 self-end flex">
                      <AiOutlineCalendar className="item-center" />
                      {new Date(likedBlog.createdAt).toLocaleDateString()} Category: {likedBlog.Blog.Category.name} 
                    </p>
                  </div>

                  <div className='grid-flow-col'>
                    <div>
                    <Link to={`/blog/${likedBlog.BlogId}/${likedBlog.BlogId}`} className="text-2xl font-bold">{likedBlog.Blog.title || 'Title'}</Link>
                    </div>
                    <div>
                      <p className="">{likedBlog.Blog.content || 'Content'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedBlogs;