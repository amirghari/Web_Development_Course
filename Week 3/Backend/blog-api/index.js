const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Sample data for blog posts and comments
const posts = [];
const comments = [];

app.get("/api/posts", (req, res) => {
  // Return an array of all post objects
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  // Find the post with the specified ID
  const post = posts.find((p) => p.id === id);

  // If the post is not found, respond with a 404 status code and a message
  if (!post) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }

  // Respond with the post object
  res.json(post);
});
app.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;

  // Check if title and contents properties are present in the request body
  if (!title || !contents) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  }

  // Create a new post object
  const newPost = {
    id: Date.now().toString(),
    title,
    contents,
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Add the new post to the posts array
  posts.push(newPost);

  // Respond with the newly created post and HTTP status 201 (Created)
  res.status(201).json(newPost);
});
app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  // Find the index of the post with the specified ID
  const index = posts.findIndex((p) => p.id === id);

  // If the post is not found, respond with a 404 status code and a message
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }

  // Check if title and contents properties are present in the request body
  if (!title || !contents) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  }

  // Update the post's title, contents, and updated_at
  posts[index].title = title;
  posts[index].contents = contents;
  posts[index].updated_at = new Date();

  // Respond with the updated post
  res.json(posts[index]);
});
app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the post with the specified ID
  const index = posts.findIndex((p) => p.id === id);

  // If the post is not found, respond with a 404 status code and a message
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }

  // Remove the post from the array and store the deleted post
  const deletedPost = posts.splice(index, 1)[0];

  // Respond with the deleted post
  res.json(deletedPost);
});
app.get("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  // Find the post with the specified ID
  const post = posts.find((p) => p.id === id);

  // If the post is not found, respond with a 404 status code and a message
  if (!post) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }

  // Find comments associated with the post
  const postComments = comments.filter((comment) => comment.post_id === id);

  // Respond with the array of comments
  res.json(postComments);
});

app.post("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  // Find the post with the specified ID
  const post = posts.find((p) => p.id === id);

  // If the post is not found, respond with a 404 status code and a message
  if (!post) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }

  // Check if the text property is present in the request body
  if (!text) {
    return res
      .status(400)
      .json({ message: "Please provide text for the comment" });
  }

  // Create a new comment object
  const newComment = {
    text,
    post_id: id,
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Add the new comment to the comments array
  comments.push(newComment);

  // Respond with the newly created comment and HTTP status 201 (Created)
  res.status(201).json(newComment);
});

app.get("/api/comments/:id", (req, res) => {
  const { id } = req.params;

  // Find the comment with the specified ID
  const comment = comments.find((c) => c.id === id);

  // If the comment is not found, respond with a 404 status code and a message
  if (!comment) {
    return res
      .status(404)
      .json({ message: "The comment with the specified ID does not exist" });
  }

  // Respond with the comment object
  res.json(comment);
});

app.put("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  // Find the index of the comment with the specified ID
  const index = comments.findIndex((c) => c.id === id);

  // If the comment is not found, respond with a 404 status code and a message
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "The comment with the specified ID does not exist" });
  }

  // Check if text property is present in the request body
  if (!text) {
    return res
      .status(400)
      .json({ message: "Please provide text for the comment" });
  }

  // Update the comment's text and updated_at
  comments[index].text = text;
  comments[index].updated_at = new Date();

  // Respond with the updated comment
  res.json(comments[index]);
});

app.delete("/api/comments/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the comment with the specified ID
  const index = comments.findIndex((c) => c.id === id);

  // If the comment is not found, respond with a 404 status code and a message
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "The comment with the specified ID does not exist" });
  }

  // Remove the comment from the array and store the deleted comment
  const deletedComment = comments.splice(index, 1)[0];

  // Respond with the deleted comment
  res.json(deletedComment);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
