const express = require("express");
const app = express();

// BEGIN: Middleware Definition
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
// END: Middleware Definition

// Adding the Middleware Globally
app.use(requestTime);

// Defining the '/stats' Route
app.get("/stats", (req, res) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

// Start the Server
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
