import React, { use } from "react";
import Logo from "../assets/logo.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./Form";
import { SignIn, useUser, SignOutButton, useSession } from "@clerk/clerk-react";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (isSignedIn) {
      sendUserData();
      // console.log(user,user.fullName,user.emailAddresses[0].emailAddress,)
    }
  }, [isSignedIn, user]);

  const sendUserData = async () => {
    console.log("called");
    try {
      const response = await fetch(`${BASE_URL}/user_data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user?.id,
          name: user?.fullName,
          email: user?.emailAddresses[0].emailAddress,
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
      <div
        className="flex items-center gap-4 text-white font-semibold text-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-10 rounded-full" />
        <h1 className="text-white hover:text-gray-300">Hypothetica</h1>
      </div>

      {/* <div className="flex  justify-between items-center gap-4 w-full"></div> */}
      <div className="flex justify-end gap-4">
        {/* <button className="bg-[#CBEA7B] px-[10px] py-[8px] sm:px-[16px] sm:py-[12px] rounded-lg text-[10px] sm:text-[14px] text-[#262626] font-semibold mr-[10px]">
          Contact Us
        </button> */}

        <HashLink
          to="/#faq"
          className="bg-[#CBEA7B] scroll-smooth px-[10px] py-[8px] sm:px-[16px] sm:py-[12px] rounded-lg text-[10px] sm:text-[14px] text-[#262626] font-semibold mr-[10px]"
          smooth
        >
          FaQ
        </HashLink>

        {isSignedIn ? (
          <SignOutButton className="bg-[#CBEA7B] px-[10px] py-[8px] sm:px-[16px] sm:py-[12px] rounded-lg text-[10px] sm:text-[14px] text-[#262626] font-semibold mr-[10px]">
            Logout
          </SignOutButton>
        ) : (
          <button
            onClick={() => navigate("/login")}
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
