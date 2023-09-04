import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const Navigation = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    let name, value;
    const handleUsers = (e) => {
     name = e.target.name;
     value = e.target.value;
     setUser({...user, [name]:value});
    }
    const UserData = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        const res = await fetch("https://blogging-platform-api.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                email,
                password
            })
        })
        try {
            const data = await res.json();
            if (res.status === 422) {
                toast.error("Please Fill The Required Fields");
            } else if (res.status === 409) {
                toast.error("Email already exists");
            } else if (!data) {
                toast.error("Unexpected response from the server");
            }
            else {
                toast.success("User Created Successfully");
                Navigation("/signin");
            }
            
        } catch (error) {
            console.error("Error parsing JSON response:", error);
        }
    }
  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    <div className="signup-container">
      <h1 className="signup-heading">Sign Up</h1>
      <form className="signup-form" method="post">
        <input type="email" name="email" placeholder="Enter Your Email" className="input-field" value={user.email} onChange={handleUsers} />
        <input type="password" name="password" placeholder="Enter your password" className="input-field" value={user.password} onChange={handleUsers} />
        <button className="signup-button" onClick={UserData}>Sign Up</button>
        <p className="login-link">Already have an account? <Link to="/signin">Sign In</Link></p>
      </form>
    </div>
    </>
  )
}

export default SignUp;
