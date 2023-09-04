import React, {useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ComposeBlogs = () => {
    const Naviagtion = useNavigate();
    const [ composes, setComposes ] = useState({
    title: "",
    description: ""
});
let name, value;
const handleBlogs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setComposes({...composes, [name]:value});
}
const postData = async (e) => {
    e.preventDefault();
    const { title, description } = composes;
    const res = await fetch("https://blogging-platform-api.onrender.com/compose", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
            title,
            description
        })
    })
    try {
        const data = await res.json();
        if (res.status === 422 || !data) {
            toast.error("please try again");
        }
        else if(res.status === 401) {
            toast.warn("Please signin in order to compose blog");
        }
        else {
            toast.success("Blog Created Successfully");
            Naviagtion("/");
        }
    } catch (error) {
        console.error("Error parsing JSON response:", error);
    }
}
  return (
    <>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <form method="post" className="compose-form">
            <input className="compose-input" type="text" placeholder="Enter Blog Title" name="title" value={composes.title} onChange={handleBlogs} />
            <textarea className="compose-textarea" placeholder="Enter Blog Description" name="description" rows={20} cols={20} value={composes.description} onChange={handleBlogs}></textarea>
            <button className="compose-button" onClick={postData}>Compose Blog</button>
        </form>
    </>
  )
}

export default ComposeBlogs;
