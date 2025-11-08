import dayjs from "dayjs";
import { useState } from "react";
import { makeMod, unMod } from "../services/userServices";
import useAxios from "../hooks/useAxios";

const User = ({ user }) => {
  const [role, setRole] = useState(user?.role);
  const axios = useAxios();

  const mod = async (id) => {
    await makeMod(axios, id);
    setRole("mod");
  };
  const makeUser = async (id) => {
    await unMod(axios, id);
    setRole("user");
  };
  return (
    <div className="bg-white shadow text-center max-w-md p-4 rounded-2xl hover:scale-90 transition duration-300">
      <div className="mb-4">
        <h3 className="text-2xl md:text-4xl font-bold mb-2 ">
          {user?.username}
        </h3>
        <p className="text-sm bg-green-500 px-4 py-1 rounded-2xl w-fit mx-auto text-white">
          {role === "admin" ? "admin" : role === "user" ? "user" : "mod"}
        </p>
      </div>
      <p className="text-xs text-gray-400 font-light mb-4">
        Date of joining {dayjs(user.createdAt).format("DD/MM/YYYY")}
      </p>

      <button
        onClick={
          role === "user" ? () => mod(user._id) : () => makeUser(user._id)
        }
        className="bg-green-500 px-4 py-2 text-white rounded-xl hover:bg-black transition duration-200 "
      >
        {role === "user" ? "Make Mod" : "Make User"}
      </button>
    </div>
  );
};

export default User;
