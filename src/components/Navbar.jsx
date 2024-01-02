import React from "react";
import Logo from "../assets/logo.jpg";
// import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  // const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <nav className="fixed top-0 w-full flex justify-between px-5 md:px-20 py-3  items-center z-50  shadow-md shadow-gray-950 backnavdrop ">
      <div className="flex items-center gap-4 text-white font-semibold text-lg ">
        <img src={Logo} alt="logo" className="w-10 rounded-lg" />
        <h1 className="text-white hover:text-gray-300">Hypothetica</h1>
      </div>
      {/* {isAuthenticated ? (
        <button onClick={() => logout()} className="text-white">
          Logout
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()} className="text-white">
          Log In
        </button>
      )} */}
      {/* <div className="flex  justify-between items-center gap-4 w-full">
          
        </div> */}
    </nav>
  );
};

export default Navbar;
