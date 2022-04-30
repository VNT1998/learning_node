// will add the core module ,you can also add your own js file by using \http or .\http, no need to add .js extension
const http = require("http");
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("This is a middleware");
  next();
});

app.use((req, res, next) => {
  console.log("This is another a middleware");
  res.send("<h1>Hello World</h1>");
});
// function rqListner(req, res)
// http.createServer(rqListner);
// const server = http.createServer(app);
app.listen(3000);
