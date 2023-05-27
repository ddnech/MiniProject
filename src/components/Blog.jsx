import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';

const BlogPost = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike')
      .then(response => setBlogPosts(response.data.result))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='w-full bg-gray-200 py-16 px-4'>
      <div className='max-w-[1640px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        {blogPosts.map(blogPost => (
          <div className='bg-white p-4 relative' key={blogPost.id}>
            <div className='flex items-end justify-end absolute top-1 right-3'>
              <div className='flex items-center bg-gray-200 rounded-full px-3 py-1'>
                <FaHeart className='text-gray-500 mr-1' />
                <span>{blogPost.likes}</span>
              </div>
            </div>
            <img
              className='w-[500px] mx-auto my-4'
              src='https://asianwiki.com/images/c/c8/Itaewon_Class-mp1.jpg'
              alt='/'
            />
            <div className='flex flex-col justify-center'>
              <p className='font-bold'>{blogPost.Blog.title}</p> {/* Display the blog post title */}
              <h1 className='font-montserrat md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
                {blogPost.Blog.title || 'Title'}
              </h1>
              <p>{blogPost.Blog.content}</p> {/* Display the blog post content */}
              <button className='bg-gray-200 w-[200px] rounded font-medium mx-auto my-6 py-3 text-black hover:text-red-500'>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
