import Post from "./Post";

const PostFeed = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No posts yet.</p>
      ) : (
        posts.map((post) => <Post post={post} key={post._id} />)
      )}
    </div>
  );
};

export default PostFeed;
