// will add the core module ,you can also add your own js file by using \http or .\http, no need to add .js extension
const http = require("http");
const routes = require("./routes");
console.log(routes.someText);
// function rqListner(req, res)
// http.createServer(rqListner);
const server = http.createServer(routes.handler);
server.listen(3000);
