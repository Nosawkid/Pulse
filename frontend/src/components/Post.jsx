import { ChevronRight, MessageCircle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { likePost, unLikePost } from "../services/postServices";
import useAxios from "../hooks/useAxios";

const Post = ({ post }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  const [likes, setLikes] = useState(post?.likeCount);
  const [hasLiked, setHasLiked] = useState(post?.hasLiked);
  const axios = useAxios();

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
  return (
    <div className="bg-white/90 mb-4 rounded px-2 py-3">
      <div className="text-black text-base tracking-tighter mb-4">
        {post?.userId?.username}
        <span className="inline-block mx-2 text-xs tracking-tighter text-gray-400">
          {dayjs(post.createdAt).fromNow()}
        </span>
      </div>
      <div className="px-2">
        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-400 line-clamp-3 mb-4">
          {post?.content && post.content}
        </p>
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          {post?.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-contain rounded-lg"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 mt-2 w-fit p-2 rounded cursor-pointer">
            <div className="flex items-center gap-2">
              {hasLiked ? (
                <>
                  <ThumbsUp
                    color="green"
                    onClick={() => handleUnlike(post._id)}
                    className="hover:scale-120 "
                  />
                </>
              ) : (
                <ThumbsUp
                  onClick={() => handleLike(post._id)}
                  className="hover:scale-120 "
                />
              )}
              <span className="text-md">{likes}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 mt-2 w-fit p-2 rounded cursor-pointer">
            <MessageCircle className="hover:scale-120" /> {post.commentCount}
          </div>
          <Link to={`/post/${post._id}`}>
            <div className="flex items-center gap-2 bg-gray-100 mt-2 w-fit p-2 rounded cursor-pointer">
              <ChevronRight className="hover:scale-120" />
              <span>View More</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
