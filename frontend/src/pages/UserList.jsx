import React, { useCallback, useEffect, useState } from "react";
import User from "../components/User";
import useAxios from "../hooks/useAxios";
import { getUsers } from "../services/userServices";

const UserList = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchUsers = useCallback(async () => {
    try {
      const res = await getUsers(axios);
      setUsers(res.users);
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  }, [axios]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <User user={user} key={user._id} />
      ))}
    </div>
  );
};

export default UserList;
