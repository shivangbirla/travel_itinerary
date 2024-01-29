import React from "react";
import loginImg from "../assets/login-img.png";
import { Link, useNavigate } from "react-router-dom";
import { SignIn, useAuth } from "@clerk/clerk-react";

export default function Login() {
  const {isSignedIn} = useAuth()
  const navigate = useNavigate()
  if(isSignedIn){
    navigate("/")
  }
  return (
    <div className="flex items-center justify-center min-h-screen  ">
      
      <SignIn  />
    </div>
  );
}
