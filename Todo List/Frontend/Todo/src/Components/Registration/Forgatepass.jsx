import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Forgatepass'

function Forgatepass() {

  const [forgatepass,setForgatepass]=useState([]);
  const [email,setEmail]=useState('')

  const navigate=useNavigate();

  const handleforgetpass=async(e)=>{
  e.preventDefault();

    await axios.post("http://localhost:2025/admin/forgetpass",{email},{withCredentials : true})
    .then((res)=>{
        console.log(res)
        setForgatepass(res.data)
        window.alert("Otp Send Successfully...")
        navigate("/verifyotp")
    })
    .catch((err)=>{
      console.log(err);
      window.alert("faild Otp not send...")
      
    })

  }

  return (
    <div className="register-container">
    <div className="register-box">
      <h2>Forget Password</h2>
 <br />
      <form onSubmit={handleforgetpass}>

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

        <button type='submit' className="submit-btn">
          Submit
        </button>

        
      </form>
    </div>
  </div>

  )
}

export default Forgatepass