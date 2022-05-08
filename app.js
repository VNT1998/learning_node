// will add the core module ,you can also add your own js file by using \http or .\http, no need to add .js extension
const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", (req, res, next) => {
  console.log("This is always runs");
  next();
});

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
// function rqListner(req, res)
// http.createServer(rqListner);
// const server = http.createServer(app);
app.listen(3000);
