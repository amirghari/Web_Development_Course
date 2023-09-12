//[GET] /api/posts
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Sample data for blog posts and comments
const posts = [];
const comments = [];
// Import the comment router
const commentsRouter = require("./router/comments-router");
// Import the post router
const postsRouter = require("./routers/posts-router");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(commentsRouter);
// Use the post router as middleware
app.use(postsRouter);

app.get("/api/posts", (req, res) => {
  res.status(200).json(posts);
});

//[GET] /api/posts/:id

app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  // Find the posts with the specified ID
  const post = posts.find((p) => p.id === id);

  // If the posts is not found, respond with a 404 status code and a message
  if (!post) {
    return res
      .status(404)
      .json({ message: "The posts with the specified ID does not exist" });
  }

  // Respond with the posts object
  res.json(post);
});

//[posts] /api/posts

app.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;

  // Check if title and contents properties are present in the request body
  if (!title || !contents) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the posts" });
  }

  // Create a new posts object
  const newpost = {
    id: Date.now().toString(),
    title,
    contents,
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Add the new posts to the posts array
  posts.push(newpost);

  // Respond with the newly created posts and HTTP status 201 (Created)
  res.status(201).json(newpost);
});

//[PUT] /api/posts/:id

app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  // Find the index of the posts with the specified ID
  const index = posts.findIndex((p) => p.id === id);

  // If the posts is not found, respond with a 404 status code and a message
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "The posts with the specified ID does not exist" });
  }

  // Check if title and contents properties are present in the request body
  if (!title || !contents) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the posts" });
  }

  // Update the posts's title, contents, and updated_at
  posts[index].title = title;
  posts[index].contents = contents;
  posts[index].updated_at = new Date();

  // Respond with the updated posts
  res.json(posts[index]);
});

//[DELETE] /api/posts/:id
app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the posts with the specified ID
  const index = posts.findIndex((p) => p.id === id);

  // If the posts is not found, respond with a 404 status code and a message
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "The posts with the specified ID does not exist" });
  }

  // Remove the posts from the array and store the deleted posts
  const deletedpost = posts.splice(index, 1)[0];

  // Respond with the deleted posts
  res.json(deletedpost);
});
