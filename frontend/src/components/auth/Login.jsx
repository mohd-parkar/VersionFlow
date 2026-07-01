import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import "./auth.css";

import { Button, Heading } from "@primer/react";   
import logo from "../../../src/assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {

const { setCurrentUser } = useAuth();

    useEffect(()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setCurrentUser(null);
    },[])

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const handlelogin = async () => {
        setLoading(true);
        
        try{
            let res = await axios.post("http://localhost:3000/login",{
                email : email,
                password : password
            });

            // now as we login we get token , in response 
            // we store it in localStorage and set it as current user
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("userId",res.data.userId);

            // and now set our current user as response userId
            setCurrentUser(res.data.userId);

            // proccess over
            setLoading(false);

            // finally we redirect our login user to home 
            window.location.href = "/";


        }catch(error){
            console.error(error);
            alert("Login Failed!");
            setLoading(false);
        }
    }
    

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
       <div className="login-heading">
  <h2>Login</h2>
</div>

        <div className="login-box">

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value = {email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange = {(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            onClick={handlelogin}
            disabled = {loading}
          >
            {loading ? "Loading...." : "Login"}
          </Button>
        </div>

        <div className="pass-box">
          <p>
            New to VersionFlow ? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
