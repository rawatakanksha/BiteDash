import React, { useState } from "react";
import logo from "../assets/cat-image.png";
import { NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

function Header() {
  const [loginBtn,setLoginBtn]=useState('Login')
  const onlineStatus=useOnlineStatus();
  const handleLogin=()=>{
    if(loginBtn==="Login"){
      return setLoginBtn("Logout")
    }
    else{
      return setLoginBtn("Login")
    }
  }

  return (
    <>
      <div className="flex justify-between items-center border-b">
        <div>
          <img src={logo} className="w-28 rounded-4xl" />
        </div>
        <div>
          <ul className="flex space-x-4 mr-6 items-center text-lg">
            <li>{onlineStatus?"🟢":"🔴"}</li>
            <li className="cursor-pointer">
              <NavLink to='/' className={({isActive})=>isActive?'text-amber-500':''}>Home</NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink to='/about' className={({isActive})=>isActive?'text-amber-500':''}>About</NavLink>
            </li>
            <li className="cursor-pointer">   <NavLink to='/contact' className={({isActive})=>isActive?'text-amber-500':''}>Contact Us</NavLink></li>
            <li className="cursor-pointer">   <NavLink to='/grocery' className={({isActive})=>isActive?'text-amber-500':''}>Grocery</NavLink></li>
            <li className="cursor-pointer" >Cart</li>
            <li className="cursor-pointer"><button onClick={handleLogin}>{loginBtn}</button></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
