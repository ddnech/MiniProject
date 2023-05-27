import { useEffect } from 'react'
import Home from './pages/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LogIn from './pages/login'
import SignUp from './pages/signup'
import HomeUser from './pages/homeuser'
import EmailVerification from './pages/emailverification'
import SettingUser from './pages/settinguser'
import WriteUser from './pages/writeuser'
import MyBlogUser from './pages/mybloguser'
import EditPic from './components/users/EditPic'
import { useDispatch } from 'react-redux'
import { keep } from './store/reducer/authSlice'
import SinglePostUser from './pages/singlepostuser'
import SinglePost from './pages/singlepost'
import { postLike } from './store/reducer/postSlice'
import { LikePostUser } from './api/likepost'

function App() {
  const dispatch = useDispatch()

  useEffect (() => {
    if (localStorage.getItem("token")) {
      dispatch(keep(localStorage.getItem("token")));
      LikePostUser(localStorage.getItem("token"))
      .then((likeResponse) => {
        dispatch(postLike(likeResponse.data));
    })
    }

  }, [])

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/verification/:token" element={<EmailVerification/>}/>
            <Route path="/homeuser" element={<HomeUser/>}/>
            <Route path='/settinguser' element={<SettingUser/>}/>
            <Route path='/writeuser' element={<WriteUser/>}/>
            <Route path='/mybloguser' element={<MyBlogUser/>}/>
            <Route path='/editpic' element={<EditPic/>}/>
            <Route path='/post'>
              <Route path=':postId' element={<SinglePost/>}/>
            </Route>
            <Route path='/postIdUser'>
              <Route path=':postIdUser' element={<SinglePostUser/>}/>
            </Route>
          </Routes> 
      </Router>
    </>
  )
}

export default App