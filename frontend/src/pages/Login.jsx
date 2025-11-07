import React, { useState } from "react";
import { loginUser } from "../services/authServices";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

const Login = () => {
  const { setAuth } = useAuth();
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      setAuth({
        accessToken: res.accessToken,
        user: res.user,
        role: res.user.role,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-md bg-green-400 px-8 py-6 mx-auto mt-16 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-center text-white mb-6">
        Login
      </h2>
      {error && <Error message={error} />}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="userid"
            className="text-white text-sm font-medium tracking-wide"
          >
            Email or Username
          </label>
          <input
            type="text"
            id="userid"
            required
            onChange={(e) =>
              setForm({
                ...form,
                userId: e.target.value,
              })
            }
            className="border border-white/70 bg-white/90 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-white text-sm font-medium tracking-wide"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="border border-white/70 bg-white/90 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="bg-white text-green-600 font-semibold mt-3 py-2 rounded-md shadow hover:bg-green-100 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
