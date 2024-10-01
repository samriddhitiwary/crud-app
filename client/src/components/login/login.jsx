import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
// import "./add.css";
import toast from 'react-hot-toast';

const Login = () => {

  const users = {
   
    email: "",
    password: "",
    
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/login", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/appointment");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.msg, { position: "top-right" });
        } else {
          toast.error("Something went wrong", { position: "top-right" });
        }
        console.log(error);
        navigate("/login");
      });
  }
  

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h1>USER LOGIN PORTAL</h1>
      <form className='addUserForm' onSubmit={submitForm}>

     
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
        </div>
     
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='Password' />
        </div>
       
      
        <div className="inputGroup">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
