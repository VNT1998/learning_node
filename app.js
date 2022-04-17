// will add the core module ,you can also add your own js file by using \http or .\http, no need to add .js extension
const http = require("http");

// function rqListner(req, res)
// http.createServer(rqListner);
const server = http.createServer((req, res) => {
  //   console.log(req.url, req.headers, req.method);
  const reqUrl = req.url;
  if (reqUrl === "/") {
    res.write("<h1>Hello World</h1>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form>"
    );
    return res.end(); //To exit the process and not continue with the further execution
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Further block has been executed</h1>");
  res.end();
  //   process.exit();
});

server.listen(3000);
