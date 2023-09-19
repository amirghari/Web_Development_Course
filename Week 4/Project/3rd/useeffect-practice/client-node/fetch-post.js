const apiUrl = "http://localhost:3001/api/blogs/";

const blog = {
  title: "Hello",
  body: "YOYO",
  author: "Amir",
};

const addBlog = async () => {
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(blog),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
};

addBlog();
