import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBlogs = () => {
    const [ blogs, setBlogs ] = useState([]);
    const loggedInUserId = sessionStorage.getItem("UserId");
    useEffect(() => {
        fetch("/allblogs", {
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.log(err))
    }, []);
    const handleDelete = (id) => {
        axios.delete("/delete/" + id)
        .then(() => {
            toast.error("Deleted Successfully");
        }).catch((err) => console.log(err))
    }
    return(
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <div className="blog-container">
                <h1 className="blog-title">All Blogs</h1>
                <ul className="blog-list">
                    {blogs.map((blog) => (
                        <li className="blog-item">
                        <h2 className="blog-item-title">{blog.title}</h2>
                        <p className="blog-item-description">{blog.description}</p>
                        <p className="blog-item-date">{blog.createdAt}</p>
                        {loggedInUserId === blog.author && (
                                <button className="delete-button" onClick={() => handleDelete(blog._id)}>Delete</button>
                            )}
                        </li>
                     ))}
                </ul>
            </div>
        </>
    )
}

export default AllBlogs;
