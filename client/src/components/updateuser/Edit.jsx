import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

    const initialUser = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        role: "Patients" 
    }

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(initialUser);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log('Updated Value', user);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" })
                navigate("/")
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='addUser'>
            <Link to={"/"}>Back</Link>
            <h3>Update user</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fname">First name</label>
                    <input type="text" value={user.fname} onChange={inputChangeHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lname">Last name</label>
                    <input type="text" value={user.lname} onChange={inputChangeHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
                </div>

                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={user.password} onChange={inputChangeHandler} id="password" name="password" autoComplete='off' placeholder='Password' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="role">Role</label>
                    <select name="role" value={user.role} onChange={inputChangeHandler} id="role">
                        <option value="Patients">Patients</option>
                        <option value="Doctors">Doctors</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <div className="inputGroup">
                    <button type="submit">UPDATE USER</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;
