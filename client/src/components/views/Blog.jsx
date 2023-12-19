import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { useEffect, useState } from "react";
import BlogPostCard from "../modules/BlogPostCard";
import { Pagination } from "antd";
import { handleGetAllBlogs } from "../../action/blogAction";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogs = await handleGetAllBlogs();
        setBlogPosts(blogs);

      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      }
    };

    fetchBlog();
  }, []);

  return (
    <div className="bg-green-200">
      <Navbar />
      <div className="bg-green-200 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Welcome to LoveCook's Flavorful World! 🌟
        </h1>
        <div className="container mx-auto px-4">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
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
