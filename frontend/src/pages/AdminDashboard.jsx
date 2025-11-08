import { useCallback, useEffect, useState } from "react";
import AddPost from "../components/AddPost";
import useAxios from "../hooks/useAxios";
import { getPosts } from "../services/postServices";
import PostFeed from "../components/PostFeed";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const axios = useAxios();
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await getPosts(axios);
      setPosts(res.posts);
    } catch (error) {
      console.log(error);
    }
  }, [axios]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <div>
      <div className="mb-4">
        <AddPost onPostAdded={fetchPosts} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 h-screen overflow-hidden">
        <div className="bg-white shadow rounded p-4 h-fit max-w-[250px]">
          <ul className="space-y-2">
            <Link to={"/users"}>
              {" "}
              <li className="border-b mb-4">View Users</li>
            </Link>
          </ul>
        </div>
        <div className="overflow-y-auto ">
          {" "}
          <PostFeed posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
