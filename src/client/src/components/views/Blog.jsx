import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { useEffect, useState } from "react";
import BlogPostCard from "../modules/BlogPostCard";
import CreateBlog from "../modules/CreateBlog";
import addIcon from "../../assets/add.png"
import { Pagination } from "antd";
import { handleGetAllBlogs } from "../../action/blogAction";
import { handleGetCurrentUser } from "../../action/userAction";
import { useCookies } from "react-cookie";
import Loading from "../modules/Loading";

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCreateBlogVisible, setCreateBlogVisible] = useState(false);
  const [isPostBlogVisible, setPostBlogVisible] = useState(true);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogs = await handleGetAllBlogs();
        const sortedBlogs = blogs.sort((a, b) => new Date(b.created_time) - new Date(a.created_time));

        setBlogPosts(sortedBlogs);

        const user = await handleGetCurrentUser(cookies.accessToken);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <Loading />;
      </div>
    );
  }

  const handleDeletePost = (deletedPostId) => {
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedPostId));
  };

  const handleEditPost = (editedPost) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === editedPost.id ? editedPost : post))
    );
  };

  const handlePostBlogClick = () => {
    setPostBlogVisible(false);
    setCreateBlogVisible(true);
  };
  const handleCancelCreateBlog = () => {
    setPostBlogVisible(true);
    setCreateBlogVisible(false);
  };
  const handleSubmitCreateBlog = (newBlog) => {
    setBlogPosts((prevPosts) => [newBlog, ...prevPosts]);
    setCreateBlogVisible(false);
    setPostBlogVisible(true);
  };


  return (
    <div className="bg-green-200">
      <Navbar />
      <div className="bg-green-200 py-8">
        <h1 className="text-2xl font-bold mb-3 text-center">
          Welcome to LoveCook's Flavorful World! 🌟
        </h1>

        <div className="w-full mx-auto flex flex-col items-center mb-2">
          {isPostBlogVisible && (
            <button
              onClick={handlePostBlogClick}
              className="bg-red-400 p-3 rounded-full mb-2 flex items-center font-semibold"
            >
              <img
                className="h-6 w-6 mr-2"
                src={addIcon}
                alt="Add Icon"
              />
              Post Blog
            </button>
          )}
          {isCreateBlogVisible && (
            <CreateBlog
              onCancel={handleCancelCreateBlog}
              currentUser={currentUser}
              onSubmit={handleSubmitCreateBlog}
            />
          )}
        </div>

        <div className="container mx-auto px-4">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id}
              post={post}
              currentUser={currentUser}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          ))}
        </div>
        <div className="container mx-auto text-center mt-4">
          <Pagination defaultCurrent={1} total={500} />
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default Blog;
