import React from "react";
import Logo from "../assets/logo.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  console.log(user);
  useEffect(() => {
    if (isAuthenticated) {
      sendUserData();
    }
  }, [isAuthenticated, user]);

  const sendUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/user_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user?.sub,
          name: user?.name,
          email: user?.email,
        }),
      });

      if (response.ok) {
        console.log("User data sent successfully!");
      } else {
        console.error("Failed to send user data");
      }
    } catch (error) {
      console.error("Error sending user data:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full flex justify-between px-5 md:px-20 py-3  items-center z-50  shadow-md shadow-gray-950 backnavdrop bg-[#1A3129]">
      <div className="flex items-center gap-4 text-white font-semibold text-lg ">
        <img src={Logo} alt="logo" className="w-10 rounded-full" />
        <h1 className="text-white hover:text-gray-300">Hypothetica</h1>
      </div>

      {/* <div className="flex  justify-between items-center gap-4 w-full"></div> */}
      <div className="">
        <button className="bg-[#CBEA7B] px-[10px] py-[8px] sm:px-[16px] sm:py-[12px] rounded-lg text-[10px] sm:text-[14px] text-[#262626] font-semibold mr-[10px]">
          Contact Us
        </button>
        {isAuthenticated ? (
          <button
            onClick={() => logout()}
            className="bg-[#CBEA7B] px-[10px] py-[8px] sm:px-[16px] sm:py-[12px] rounded-lg text-[10px] sm:text-[14px] text-[#262626] font-semibold mr-[10px]"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-[#CBEA7B] px-[10px] py-[8px] sm:px-[16px] sm:py-[12px] rounded-lg text-[10px] sm:text-[14px] text-[#262626] font-semibold mr-[10px]"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
