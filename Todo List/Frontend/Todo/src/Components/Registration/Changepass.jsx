import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';



function Changepass() {

  const [changepass,setChangepass]=useState([]);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [newpassword,setNewpassword]=useState('');

 const navigate=useNavigate()


  const handlechangepass=async(e)=>{
    e.preventDefault();

    await axios.post("http://localhost:2025/admin/changepass",{email,password,newpassword},{withCredentials:true})
    .then((res)=>{
     console.log(res);
     setChangepass(res.data)
     navigate("/login")
    })
    .catch((err)=>{
      window.alert("Email or Password Something Went to Wrong")
      console.log(err)
    })
  }


  return (

    <div className="register-container">
    <div className="register-box">
      <h2>Change Password</h2>
 <br />
      <form onSubmit={handlechangepass}>

        <div className="input-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="username"
            placeholder='Enter your old password'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="email"
            placeholder='Enter your New password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            placeholder='Enter your Password'
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
            required
          />
        </div>

        <button type='submit' className="submit-btn">
          Submit
        </button>

        <p>Don't Change password ? <a href="/login">Go to Login</a></p>
      </form>
    </div>
  </div>
  )
}

export default Changepass