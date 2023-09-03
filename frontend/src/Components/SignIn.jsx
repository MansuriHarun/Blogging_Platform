import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const SignIn = () => {
  const dispach = useDispatch();
  const Navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if(res.status === 400) {
      toast.error("Invalid Email");
    }
    else if(res.status === 401) {
      toast.error("Invalid Password");
    }
    else if(res.status === 422) {
      toast.warn("Please fill the required fields");
    }
    else if (!data) {
      toast.error("Unexpected response from the server");
    }
    else{
      dispach(authActions.login());
      toast.success("You are now authenticated");
      Navigation("/");
    }
};
  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    <div className="login-container">
      <h1 className="login-heading">Sign In</h1>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="Enter Your Email" className="input-field" value={email} onChange={handleEmailChange} />
        <input type="password" placeholder="Enter your password" className="input-field" value={password} onChange={handlePasswordChange} />
        <button className="login-button">Sign In</button>
        <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
    </>
    )
}

export default SignIn
