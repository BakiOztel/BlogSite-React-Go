import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/layout.js';
import MainPage from './Page/MainPage/main.js';
import "./css/app.css";
import ProfilePage from './Page/ProfilePage/profile.js';
import Post from './Page/post/post.js';
import PostLayout from './layout/postLayout.js';
import LoginRegisterLayout from './Page/LoginRegister/layout.js';
import LoginPage from './Page/LoginRegister/LoginPage/Login.js';
import RegisterPage from './Page/LoginRegister/register/Register.js';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
        <Route path='/post/:postid' element={<Post />} />
      </Route>
      <Route element={<LoginRegisterLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
