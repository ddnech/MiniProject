import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSearchBarValue, setSelectedCategory, setSortOrder } from '../Store/ReducerFilter';

const SearchDrop = () => {
  const [searchValue, setSearchValue] = useState('');
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.searchFilter.selectedCategory || '');
  const sortOrder = useSelector((state) => state.searchFilter.sortOrder || '');

  useEffect(() => {
    axios
      .get('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value === 'All' ? '' : event.target.value;
    dispatch(setSelectedCategory(selectedCategoryId));
  };

  const handleSortOrderChange = (event) => {
    const sortOrder = event.target.value === 'Latest' ? 'DESC' : 'ASC';
    dispatch(setSortOrder(sortOrder));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(setSearchBarValue(searchValue));
    }
  };

  return (
    <div className="flex bg-white rounded-full items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
      <div className="pt-2">
        <AiOutlineSearch size={25} />
      </div>
      <input
        className="font-sans bg-transparent p-2 w-full focus:outline-none"
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />

      <select
        className="ml-2 bg-gray-200 outline-none border-rounded"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All categories</option> {/* Set initial value to empty string */}
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        className="ml-2 bg-gray-200 transparent outline-none border-rounded"
        value={sortOrder === 'DESC' ? 'Latest' : 'Oldest'}
        onChange={handleSortOrderChange}
      >
        <option value="Latest">Latest</option>
        <option value="Oldest">Oldest</option>
      </select>
    </div>
  );
};

export default SearchDrop;
