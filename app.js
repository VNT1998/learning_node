// will add the core module ,you can also add your own js file by using \http or .\http, no need to add .js extension
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");
const sequelize = require("./utils/database");

app.set("view engine", "ejs");
app.set("views", "./views");
// app.set('view options', { layout: 'other' });
// db.execute('SELECT * FROM products').then(result => { console.log(result[0]) }).catch(err => { console.log(err) });
// ;
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

sequelize.sync().then(result => {
  // console.log(result);
  app.listen(3000);
}).catch(err => { console.log(err); });

