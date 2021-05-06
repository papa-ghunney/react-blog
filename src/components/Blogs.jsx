import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectUserInput, setBlogData } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import "../styling/blogs.css";

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=698c1f44212bd8d5ed0aff70d7973956`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

  const getBlogs = async () => {
    const response = await axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBlogs();
  }, [searchInput]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h1>Loading...</h1> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a href={blog.url} target="_blank" className="blog">
            <img src={blog.image} alt=".." />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <span>{blog.publishedAt}</span>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}
        {blogs?.totalArticles == 0 && (
          <h1 className="no__blogs">No blogs available</h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
