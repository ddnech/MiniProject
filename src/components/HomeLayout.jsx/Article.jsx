import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const selectedCategory = useSelector((state) => state.searchFilter.selectedCategory);
  const sortOrder = useSelector((state) => state.searchFilter.sortOrder);
  const searchBarValue = useSelector((state) => state.searchFilter.searchBarValue);
  const location = useLocation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        let page = searchParams.get('page');
        if (!page) page = 1;

        let selectedCategoryValue = selectedCategory || '';
        let sortOrderValue = sortOrder || 'DESC';
        let searchBarValueValue = searchBarValue || '';

        const url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${page}&sort=${sortOrderValue}&search=${searchBarValueValue}&id_cat=${selectedCategoryValue}`;
        const response = await axios.get(url);
        setArticles(response.data.result);
        setCurrentPage(parseInt(page));
        setTotalPages(Math.ceil(response.data.rows / response.data.listLimit));
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
  }, [selectedCategory, sortOrder, searchBarValue, location]);

  const handleImageError = (event) => {
    event.target.src =
      'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
  };

  const goToPage = (page) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page);
    window.location.search = searchParams.toString();
  };

  // PAGINATION 
  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-6">
        <button
          className="px-3 py-2 bg-gray-200 rounded text-gray-600"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="mx-4">
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="px-3 py-2 bg-gray-200 rounded text-gray-600"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-200 py-5 px-4">
      <div className="justify-content-center">
        <div className="font-bold text-3xl pb-5 text-center">BLOG</div>
      </div>
      <div className="max-w-[1640px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div className="bg-white p-4 relative rounded-xl" key={article.id}>
            <div className="flex flex-row items-center font-bold justify-between">
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
                <AiOutlineCalendar className="text-gray-600" />
                <p className="text-sm ml-1">{new Date(article.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <img
              className="w-full h-64 object-cover mx-auto my-4"
              src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
              onError={handleImageError}
              alt="/"
            />
            <div className="flex flex-col justify-center">
              <p className="font-bold flex justify-between">
                <span className="bg-gray-400 text-white">{article.Category.name}</span>
                {article.Blog_Keywords.map((keyword) => (
                  <span
                    key={keyword?.Keyword?.id}
                    className="bg-ivory rounded-xl bg-gray-300 keyword px-2 text-sage font-semibold w-fit mx-1"
                  >
                    #{keyword?.Keyword?.name}
                  </span>
                ))}
              </p>
              <h1 className="font-montserrat md:text-2xl sm:text-1xl text-1xl font-bold py-2">
                {article.title || 'Title'}
              </h1>
              <button className="bg-gray-200 w-[200px] rounded font-medium mx-auto my-6 py-3 text-black hover:text-red-500">
                <Link to={`/blog/${article.id}/${article.Blog_Keywords[0].BlogId}`}>Read More</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default Article;