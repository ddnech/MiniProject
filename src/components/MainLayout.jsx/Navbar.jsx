import React, { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineFileAdd, AiOutlineUnorderedList, AiOutlineLock, AiOutlineLogout, AiOutlineEdit } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchDrop from "../SearchBarDrop";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../Store/Reducer";
import axios from "axios";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.tokenAuth.token);
  const [username, setUsername] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      axios
        .get("https://minpro-blog.purwadhikabootcamp.com/api/auth/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsername(response.data.username);
          setUserProfileImage(response.data.imgProfile);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.log("Error:", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }

    axios
      .get("https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [token]);

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
    setCategoriesMenuOpen(false);
  };

  const handleCategoriesMenuToggle = () => {
    setCategoriesMenuOpen(!categoriesMenuOpen);
    setProfileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("token");
    navigate("/register");
  };

  const isLoginPage = location.pathname === "/register";

  return (
    <div className='flex justify-content-center items-center h-24 mx-w-(1240px) px-4 text-gray-800 bg-gray-200 font-sans'>
      <h1 className="w-full text-4xl font-bold text-black font-sans">
        Word<span className="text-red-500">.Smith</span>
      </h1>
      <div>
        <SearchDrop />
      </div>
      {/* Nav */}
      <ul className="flex">
        <li className="font-sans p-4 hover:text-red-500">
          <Link to="/home">Home</Link>
        </li>
        {!isLoggedIn && (
          <li className="font-sans p-4 hover:text-red-500">
            <Link to="/register">Login</Link>
          </li>
        )}
      </ul>
      {/* Hidden Profile Menu */}
      {isLoggedIn && !isLoginPage && (
        <div className="relative">
          <button className="focus:outline-none" onClick={handleProfileMenuToggle}>
            <div className="flex items-center">
              {userProfileImage ? (
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={`https://minpro-blog.purwadhikabootcamp.com/${userProfileImage}`}
                  alt="Profile"
                />
              ) : (
                <AiOutlineUser size={30} />
              )}
              <div className="w-32 overflow-hidden overflow-ellipsis">
                <p className="text-sm truncate">{username}</p>
              </div>
            </div>
          </button>
          {profileMenuOpen && (
            <div className="absolute top-12 right-0 bg-white border-2 border-gray-900 rounded-lg shadow-lg py-2 px-4">
              <ul className="uppercase">
                <li className="flex items-center p-2 border-b border-gray-600 hover:text-red-500">
                  <AiOutlineFileAdd size={20} className="mr-2" />
                  <Link to={`/EditBlog`}><span>Create Blog</span></Link>
                </li>
                <li className="flex items-center p-2 border-b border-gray-600 hover:text-red-500">
                  <AiOutlineUnorderedList size={20} className="mr-2" />
                  <Link to="/myblogs">My Blogs</Link>
                </li>
                <li className="flex items-center p-2 border-b border-gray-600 hover:text-red-500">
                  <AiOutlineUnorderedList size={20} className="mr-2" />
                  <Link to="/likeblogs">Liked Blog</Link>
                </li>
                <li className="flex items-center p-2 border-b border-gray-600 hover:text-red-500">
                  <AiOutlineEdit size={20} className="mr-2" />
                  <Link to={`/setting`}><span>Edit Profile</span></Link>
                </li>
                <li className="flex items-center p-2 border-b border-gray-600 hover:text-red-500">
                  <AiOutlineLock size={20} className="mr-2" />
                  <Link to={`/password`}><span>Change Password</span></Link>
                </li>
                <li className="flex items-center p-2 hover:text-red-500">
                  <AiOutlineLogout size={20} className="mr-2" />
                  <span onClick={handleLogout}>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
      {/* Hidden Categories Menu */}
      {categoriesMenuOpen && (
        <div className="absolute top-20 right-0 bg-white border-2 border-gray-900 rounded-lg shadow-lg py-2 px-4">
          <ul className="uppercase">
            {categories.map((category) => (
              <li
                className="flex items-center p-2 border-b border-gray-600 hover:text-red-500"
                key={category.id}
              >
                <Link to={`/category/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
