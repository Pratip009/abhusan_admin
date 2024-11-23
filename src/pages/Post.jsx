import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Post = ({ token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]); // State to hold the posts
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch posts from the server
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.data); // Update posts state
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Post created successfully!");
        setTitle("");
        setContent("");
        setImage(null);
        fetchPosts(); // Fetch posts again to update the list
      } else {
        throw new Error(`Failed to create post: ${response.statusText}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete a post
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          toast.success("Post deleted successfully!");
          fetchPosts(); // Fetch posts again to update the list
        } else {
          throw new Error("Failed to delete post");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, [token]);

  return (
    <div className="w-full">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              rows="4"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
          >
            Create Post
          </button>
        </form>
      </div>
      <div className="w-full mx-auto mt-6">
        <h2 className="text-xl font-bold mt-10 mb-4 text-gray-800 text-center">
          Posts
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading posts...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">Title</th>
                <th className="py-2 px-4 border-b text-center">Content</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-center">
                      {post.title}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {post.content}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdDelete/>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 text-center text-gray-500">
                    No posts available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Post;
