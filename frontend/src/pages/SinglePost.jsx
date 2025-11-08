import { MessageCircle, ThumbsUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import {
  commentPost,
  getPost,
  likePost,
  unLikePost,
  deletePost,
} from "../services/postServices";
import { useAuth } from "../context/AuthContext";

const SinglePost = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const axios = useAxios();
  const [post, setPost] = useState(null);
  const { auth } = useAuth();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  dayjs.extend(utc);

  const handleLike = async (id) => {
    const res = await likePost(axios, id);
    setLikes(res.totalLikes);
    setHasLiked(true);
  };

  const handleUnlike = async (id) => {
    const res = await unLikePost(axios, id);
    console.log(res);
    setLikes(res.totalLikes);
    setHasLiked(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const res = await commentPost(axios, id, { content: comment });
    console.log(res);
    setComments((prev) => [...prev, res.comment]);
    setCommentCount(commentCount + 1);
  };

  const handleDelete = async () => {
    await deletePost(axios, id);
    navigate("/");
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await getPost(axios, id);
      console.log(res);
      setPost(res.post);
      setLikes(res.likes);
      setCommentCount(res.comments.length);
      setHasLiked(res.hasLiked);
      setComments(res.comments);
    };
    fetchPost();
  }, []);
  return (
    <div className="bg-white shadow rounded px-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          {" "}
          <span className="font-semibold">{post?.userId?.username}</span>{" "}
          <span className="text-gray-400 text-sm inline-block mx-2">
            {dayjs(post?.createdAt).fromNow()}
          </span>
        </div>
        <div>
          {(auth?.user.id === post?.userId?._id || auth?.role === "admin") && (
            <button
              onClick={handleDelete}
              className="bg-red-500 px-4 py-2 rounded-lg text-sm text-white font-semibold cursor-pointer"
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">{post?.title}</h3>
        <p className="text-gray-400 text-base/8 mb-4">{post?.content}</p>
        <img
          src={post?.imageUrl}
          alt={post?.title}
          className="w-full h-auto max-h-[500px] object-contain rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gray-100 mt-2 w-fit p-2 rounded cursor-pointer">
          <div className="flex items-center gap-2">
            {hasLiked ? (
              <>
                <ThumbsUp
                  onClick={() => handleUnlike(post._id)}
                  color="green"
                  className="hover:scale-120 "
                />
              </>
            ) : (
              <>
                {" "}
                <ThumbsUp
                  onClick={() => handleLike(post._id)}
                  className="hover:scale-120 "
                />
              </>
            )}
            <span className="text-md">{likes}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 mt-2 w-fit p-2 rounded cursor-pointer">
          <MessageCircle className="hover:scale-120" /> {commentCount}
        </div>
      </div>
      <div className="border border-green-500 mb-4"></div>
      <div>
        <h4 className="font-semibold text-base">Comments</h4>
        <div className="mb-4 h-[200]">
          {comments.length > 0 ? (
            <>
              {" "}
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="mt-2 bg-gray-200 p-2 rounded-2xl"
                >
                  <div>
                    <span className="text-sm font-bold">
                      {comment?.userId?.username}
                    </span>
                    <span className="inline-block text-xs font-light text-gray-400 mx-2">
                      {dayjs(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="text-sm tracking-tight">{comment?.content}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No Comments</p>
          )}
        </div>
      </div>
      <form onSubmit={handleComment}>
        <textarea
          className="border w-full rounded-2xl focus:outline-none px-2 py-1"
          required
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 hover:bg-white/90 hover:shadow hover:text-green-500 transition duration-200 px-4 py-2 rounded text-white font-semibold cursor-pointer"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default SinglePost;
