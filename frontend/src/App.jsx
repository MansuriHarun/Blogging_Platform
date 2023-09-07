import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ComposeBlogs from "./Components/ComposeBlogs";
import AllBlogs from "./Components/AllBlogs";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import NotFoundPage from "./Components/NotFoundPage";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return(
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<AllBlogs />} />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="/signin" element={ <SignIn /> } />
          <Route path="/composeblogs" element={ <ComposeBlogs /> } />
          <Route path="*" element={ <NotFoundPage /> } />
         </Routes>
      <Footer />
      </Router>
    </>
  )
}

export default App;
