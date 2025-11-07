import { useCallback, useState } from "react";
import AddPost from "../components/AddPost";
import PostFeed from "../components/PostFeed";
import useAxios from "../hooks/useAxios";
import { getPosts } from "../services/postServices";
import { useEffect } from "react";

const UserDashboard = () => {
  const axios = useAxios();
  const [posts, setPosts] = useState([]);

  // const fetchPosts = async () => {
  //   try {
  //     const res = await getPosts(axios);
  //     setPosts(res.posts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      <div className="flex flex-col gap-4">
        <AddPost onPostAdded={fetchPosts} />
        <PostFeed posts={posts} fetchPosts={fetchPosts} />
      </div>
    </div>
  );
};

export default UserDashboard;
