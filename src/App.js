import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/index';
import { setToken } from './Store/Reducer';
import Home from './Page/Home';
import Blog from './Page/PostBlog';
import Login from './components/Login';
import Register from './Page/Register';
import CategoryPage from './Page/CategoryPage';
import EmailVerification from './components/Verify';
import SignUp from './components/SignUp';
import SettingPage from './Page/SettingPage';
import Passwords from './Page/PasswordPage';
import CreateBlog from './components/CreateBlog';
import SingleArticle from './components/SingleArticle';
import MyBlogs from './components/MyBlogs';
import LikedBlogs from './components/LikeBlog';

const App = () => {
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      store.dispatch(setToken(storedToken));
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:number" element={<CategoryPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/verification/:token" element={<EmailVerification />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/password" element={<Passwords />} />
          <Route path="/EditBlog" element={<CreateBlog />} />
          <Route path="/blog/:id/:BlogId" element={<SingleArticle />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/likeblogs" element={<LikedBlogs />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;