import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { addPost } from "../services/postServices";

const AddPost = ({ onPostAdded }) => {
  const axios = useAxios();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
    setExpanded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content && !image) {
      return setMessage("Write something or add an image");
    }
    try {
      setLoading(true);
      setMessage("");
      const formData = new FormData();
      if (title) formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await addPost(axios, formData);
      setMessage(res.message || "Posted!");

      if (onPostAdded) onPostAdded();

      // reset
      setTitle("");
      setContent("");
      setImage(null);
      setPreview(null);
      setExpanded(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-4">
      {/* top row: avatar + input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1">
            {!expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="w-full text-left text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full"
              >
                What’s on your mind?
              </button>
            )}

            {expanded && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
                <textarea
                  placeholder="Write something..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setExpanded(true)}
                  className="w-full border rounded-lg px-3 py-2 h-24 resize-y"
                />
              </div>
            )}
          </div>
        </div>

        {/* image preview */}
        {preview && (
          <div className="rounded-xl overflow-hidden border">
            <img src={preview} alt="Preview" className="w-full object-cover" />
          </div>
        )}

        {/* actions row */}
        <div className="flex items-center justify-between pt-1">
          <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
              Add Photo
            </span>
          </label>

          {expanded && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  setTitle("");
                  setContent("");
                  setImage(null);
                  setPreview(null);
                  setMessage("");
                }}
                className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm disabled:opacity-60"
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          )}
        </div>

        {message && (
          <p className="text-center text-sm text-gray-600 pt-1">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddPost;
