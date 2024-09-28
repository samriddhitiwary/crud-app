import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "Patients" // default value
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" })
        navigate("/")
      })
      .catch(error => console.log(error))
  }

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Add new user</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='Password' />
        </div>
        <div className="inputGroup">
          <label htmlFor="role">Role</label>
          <select name="role" onChange={inputHandler} id="role">
            <option value="Patients">Patients</option>
            <option value="Doctors">Doctors</option>
          </select>
        </div>
        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  )
}

export default Add;
