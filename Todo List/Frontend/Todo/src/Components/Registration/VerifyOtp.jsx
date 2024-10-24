import React, { useState } from 'react'
import axios from 'axios';
import './Verifyotp.css';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
  const [verifyotp,setVerifyotp]=useState([]);
  const [otp,setOtp]=useState('');
  const [newpass,setNewpass]=useState('');
  const [confirmpass,setConfirmpass]=useState('');

  const navigate=useNavigate();

const handleverifyotp=async(e)=>{
  e.preventDefault();
    
  await axios.post("http://localhost:2025/admin/verifyOtp",{otp,newpass,confirmpass},{withCredentials : true})
  .then((res)=>{
   console.log(res)
   setVerifyotp(res.data)
   window.alert("Forget password Succssfully...!!");
   navigate("/login")

  })
  .catch((err)=>{
    console.log(err);

    window.alert("password not Forget Try again .....")
    
  })
}


  return (
    <div className="register-container">
    <div className="register-box">
      <h2>Verify OTP</h2>
 <br />
      <form onSubmit={handleverifyotp}>

        <div className="input-group">
          <label htmlFor="username">Otp</label>
          <input
            type="text"
            id="username"
            placeholder='Enter your Otp'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">New Password</label>
          <input
            type="text"
            id="username"
            placeholder='Enter your New password'
            value={newpass}
            onChange={(e) => setNewpass(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Confirm Password</label>
          <input
            type="text"
            id="username"
            placeholder='Enter your Confirm password'
            value={confirmpass}
            onChange={(e) => setConfirmpass(e.target.value)}
            required
          />
        </div>

        <button type='submit' className="submit-btn">
          Submit
        </button>

        <p> <a href="/forgetpass">RESEND OTP </a></p>
      </form>
    </div>
  </div>

  )
}

export default VerifyOtp