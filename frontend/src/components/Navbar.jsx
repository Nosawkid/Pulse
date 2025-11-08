import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authServices";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    setAuth(null);
    navigate("/login");
  };
  return (
    <div className="w-screen bg-green-500 dark:bg-gray-600 p-5 text-white flex items-center justify-between shadow">
      <div>
        <h1 className="font-bold text-2xl md:text-4xl animate-pulse font-mono">
          <Link to={"/"}>Pulse</Link>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {auth ? (
          <>
            <p className="bg-white px-2 py-1 rounded-2xl text-black text-xs">
              {auth?.user?.username}
            </p>
            {auth?.role === "admin" ? (
              <p className="bg-green-950 text-red-50 text-xs px-4 py-2 rounded-4xl shadow">
                Admin
              </p>
            ) : (
              ""
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {" "}
            <button className="bg-green-900 px-3 py-1 md:px-4 md:py-2 rounded cursor-pointer font-semibold hover:bg-white hover:text-green-900">
              <Link to={"/login"}>Sign In</Link>
            </button>
            <button className="bg-green-600 px-3 py-1 md:px-4 md:py-2 rounded cursor-pointer font-semibold hover:bg-white hover:text-green-600">
              <Link to={"/register"}>Register</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
