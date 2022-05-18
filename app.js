// will add the core module ,you can also add your own js file by using \http or .\http, no need to add .js extension
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");

app.set("view engine", "ejs");
app.set("views", "./views");
// app.set('view options', { layout: 'other' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", (req, res, next) => {
  console.log("This is always runs");
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);
// function rqListner(req, res)
// http.createServer(rqListner);
// const server = http.createServer(app);
app.listen(3000);
