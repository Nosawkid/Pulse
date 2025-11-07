import React, { useState } from "react";
import { registerUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    dob: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const getMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDay()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (confirmPassword === form.password) {
      try {
        const res = await registerUser(form);
        console.log(res);
        navigate("/");
        console.log(res);
      } catch (error) {
        console.log("Error", error);
        setError(error.response?.data?.message);
      }
    } else {
      setError("Password Mismatch");
    }
  };

  return (
    <div className="bg-green-400 py-6 max-w-md px-8 mx-auto mt-16 shadow-lg rounded-2xl ">
      <h2 className="text-white text-2xl font-semibold text-center mb-6">
        Register
      </h2>
      {error && (
        <p className="mb-4 bg-red-400 rounded p-2 text-xs tracking-tight text-white font-bold border-red-600">
          {error}
        </p>
      )}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            className="text-white text-sm font-medium tracking-wide"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="border border-white/70 bg-white/90 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            type="text"
            required
            id="username"
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-white text-sm font-medium tracking-wide"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border border-white/70 bg-white/90 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            type="email"
            required
            id="email"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-white text-sm font-medium tracking-wide"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="border border-white/70 bg-white/90 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            required
            onChange={(e) =>
              setForm({
                ...form,
                gender: e.target.value,
              })
            }
          >
            <option value="">Choose your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-white text-sm font-medium tracking-wide"
            htmlFor="dob"
          >
            Date of Birth
          </label>
          <input
            className="border border-white/70 bg-white/90 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            type="date"
            required
            id="dob"
            max={getMaxDate()}
            onChange={(e) =>
              setForm({
                ...form,
                dob: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-white text-sm font-medium tracking-wide"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-white/70 bg-white/90 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            type="password"
            required
            id="password"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-white text-sm font-medium tracking-wide"
            htmlFor="c-password"
          >
            Confirm Password
          </label>
          <input
            className="border border-white/70 bg-white/90 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            type="password"
            required
            id="c-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-white cursor-pointer hover:bg-white/90 hover:text-black/90 transition duration-200 text-black p-2 rounded font-bold "
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
