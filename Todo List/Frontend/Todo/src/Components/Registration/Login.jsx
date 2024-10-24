import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'


function Login() {
   
  const [login,setLogin]=useState([]);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  


  const navigator=useNavigate();

const handlelogin=async(e)=>{
 
  e.preventDefault();

  await axios.post("http://localhost:2025/admin/loginadmin",{email,password},{withCredentials : true})
  .then((res)=>{
      console.log(res)
      setLogin([...login,res.data]);
      
   
      window.alert("Login Successfully ...!!")

      navigator("/insertadmin");
        
      

  })
  .catch((err)=>{
    console.log(err);
    window.alert("Login Failed , please Try Again...!!")
    
  })
  
}
  return (
    <>
    <div style={{marginTop :"150px",textAlign:"center"}}>
   
    </div>
    <div className="login-container">
     
    <div className="login-box">
      <h2>Log In</h2>

    


      <form onSubmit={handlelogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit"  className="submit-btn">
         Log in
        </button>

        <div className="extra-links">
          <p style={{fontStyle:"italic"}}><a href="/changepass">* Change your Password ? </a></p>
          <p style={{fontStyle : "italic"}}><a href="/forgetpass">* Forgot your password ?</a></p>
          <p>Don't have an account? <br /><a href="/">Go to Registration page</a></p>
        </div>
      </form>
    </div>
  </div>
</>
  )
}

export default Login