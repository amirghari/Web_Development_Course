const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// create a new blog
const createBlog = async (req, res) => {
  const { title, body, author } = req.body;
  const blog = await Blog.create({ title, body, author });
  res.status(200).json(blog);
  // console.log("CREATE a blog");
  // res.send("createBlog");
};

// get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogs);
};

// get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.status(200).json(blog);
  // Your code here
};

// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const blog = await Blog.findOneAndDelete({ _id: id });
  res.status(200).json(blog);
  // Your code here
};

// Update blog using PATCH
const patchBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    {
      new: true, // To return the updated document
    }
  );
  res.status(200).json(blog);
  // Your code here
};

// Update blog using PUT
const putBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findOneAndUpdate({ _id: id }, req.body, {
    new: true, // To return the updated document
    overwrite: true, // This will replace the entire document
  });

  res.status(200).json(blog);
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  putBlog,
  patchBlog,
};
