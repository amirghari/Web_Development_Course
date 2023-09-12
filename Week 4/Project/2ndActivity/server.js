const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());
const userRouter = require("./routers/users");

// Sample user data array
const users = [];

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// Configure user routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
