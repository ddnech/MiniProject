import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineCalendar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Navbar from './MainLayout.jsx/Navbar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleArticle = () => {
  const [article, setArticle] = useState(null);
  const [likes, setLikes] = useState(0);
  const [alreadyLikes, setAlreadyLikes] = useState(false);
  const { id } = useParams();
  const { BlogId } = useParams();
  const token = useSelector((state) => state.tokenAuth.token);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://minpro-blog.purwadhikabootcamp.com/api/blog/${id}`
        );
        setArticle(response.data[0]);
        setLikes(response.data[0].total_fav || 0);

        if (token && BlogId) {
          const response1 = await axios.get(
            `https://minpro-blog.purwadhikabootcamp.com/api/blog/byUser`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAlreadyLikes(
            response1.data.map((x) => x.BlogId).includes(Number(BlogId))
          );
        }
      } catch (error) {
        console.error('Failed to fetch the article:', error);
      }
    };

    fetchArticle();
  }, [id, token, BlogId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleImageError = (event) => {
    event.target.src =
      'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
  };

  const handleLike = () => {
    if (!token) {
      alert('Please login to like the article.');
      return;
    }

    axios
      .post(
        'https://minpro-blog.purwadhikabootcamp.com/api/blog/like',
        { BlogId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlreadyLikes(true);
      })
      .catch((error) => {
        console.error('Failed to like the article:', error);
      });
  };

  return (
    <div>
      <Navbar className="z-50" />
      <div className="grid w-[50rem] m-auto">
        <div className="justify-center items-center bg-gray-200 py-5 px-4 ">
          <div className="max-w-[1640px] mx-auto mb-5">
            <div className="bg-white p-4  ">
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center">
                  {article.User.imgProfile ? (
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src={`https://minpro-blog.purwadhikabootcamp.com/${article.User.imgProfile}`}
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-black rounded-full mr-2" />
                  )}
                  <span>{article.User.username}</span>
                </div>
                <div className="flex items-center">
                  <AiOutlineCalendar className="pb-1" />
                  <p className="text-sm">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <img
                className="w-full h-64 object-cover mx-auto my-4 "
                src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                onError={handleImageError}
                alt="/"
              />
              <div className="flex flex-col justify-center ">
                <p className="font-bold flex justify-between">
                  <span className="bg-gray-400 text-white">
                    {article.Category.name}
                  </span>
                  {article.Blog_Keywords &&
                    article.Blog_Keywords.map((keyword) => (
                      <span className="bg-ivory rounded-xl bg-gray-300 keyword px-2 text-sage font-semibold w-fit mx-1 ">
                        #{keyword?.Keyword?.name}
                      </span>
                    ))}
                  <span>
                    {token && (
                      <button
                        className="ml-2 bg-gray-200 text-white py-2 px-2 rounded"
                        onClick={handleLike}
                      >
                        {alreadyLikes ? (
                          <AiFillHeart color="red" />
                        ) : (
                          <AiOutlineHeart />
                        )}
                      </button>
                    )}
                    {!token && (
                      <button
                        className="ml-2 bg-gray-200 text-white py-2 px-2 rounded"
                        onClick={() => alert('Please login to like the article.')}
                      >
                        <AiOutlineHeart />
                      </button>
                    )}
                  </span>
                </p>
                <h1 className="font-sans md:text-2xl sm:text-1xl text-1xl font-bold py-2">
                  {article.title || 'Title'}
                </h1>
                <div className="font-sans md:text-2xl sm:text-1xl text-1xlpy-2">
                  {article.content || 'Content'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;