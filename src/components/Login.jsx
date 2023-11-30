import React from "react";
import loginImg from "../assets/login-img.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="ml-10 w-[40vw] h-full object-contain"
          src={loginImg}
          alt=""
        />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-white p-8 px-8 rounded-lg">
          <h2 className="text-4xl font-semibold text-center mb-2">SIGN IN</h2>
          <div className="flex flex-col py-2">
            <label>User Name</label>
            <input
              className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500  focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500  focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex justify-between  py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <Link to="/home">
            <button className="w-full my-5 py-2 bg-[#0E72ED] hover:bg-[#1a659e] text-white rounded-lg">
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
