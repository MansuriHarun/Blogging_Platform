import React from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || sessionStorage.getItem("UserId");
  const dispach = useDispatch();
    const deleteStorage = () => {
    try {
      sessionStorage.removeItem("UserId");    
      dispach(authActions.logout());
      toast.warning("You have been logged out");  
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    <div className="header">
        <Link to="/" className="header-link">Blog App</Link>
        {isLogin && (
            <button onClick={deleteStorage} className="logout-button">Logout</button>
        )}
        {!isLogin && (
            <Link to="/signup" className="header-link">Sign Up</Link>
        )}
        <Link to="/composeblogs" className="header-link">Compose Blog</Link>
    </div>
    </>
  )
}

export default Header;
