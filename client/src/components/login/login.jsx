import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const login = () => {

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
    await axios.post("http://localhost:8000/api/getone/:id", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" })
        navigate("/")
      })
      .catch(error => console.log(error))
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
          <button type="submit">lOGIN</button>
        </div>
      </form>
    </div>
  )
}

export default login;
