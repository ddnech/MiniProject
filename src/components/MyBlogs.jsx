import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineCalendar, AiOutlineDelete } from 'react-icons/ai';
import Navbar from './MainLayout.jsx/Navbar';
import { useSelector } from 'react-redux';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const token = useSelector((state) => state.tokenAuth.token);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          'https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlogs(response.data.result);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, [token]);

  const handleImageError = (event) => {
    event.target.src =
      'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${blogId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  return (
    <div>
      <Navbar className="z-50" />
      <div className="w-full bg-gray-200 py-5 px-4">
        <div className="max-w-[1640px] mx-auto">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div className="bg-white p-4 mb-6 flex" key={blog.id}>
                <div className="w-2/5 pr-4">
                  <img
                    className="w-full h-64 object-cover mx-auto"
                    src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}
                    onError={handleImageError}
                    alt="/"
                  />
                </div>
                <div className="flex flex-col justify w-full">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-500 self-end flex">
                      <AiOutlineCalendar className="item-center" />
                      {new Date(blog.createdAt).toLocaleDateString()} Category: {blog.Category.name} 
                    </p>
                  </div>

                  <div className='grid-flow-col'>
                    <div>
                      <h1 className="text-2xl font-bold ">{blog.title || 'Title'}</h1>
                    </div>
                    <div>
                      <p className="">{blog.content || 'Content'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end self-end">
                  <p className="text-sm text-gray-500">Author: {blog.User.username}</p>
                  <AiOutlineDelete
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(blog.id)}
                  />
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

export default MyBlogs;