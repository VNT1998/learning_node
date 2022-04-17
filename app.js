// will add the core module ,you can also add your own js file by using \http or .\http, no need to add .js extension
const http = require("http");
const fs = require("fs");

// function rqListner(req, res)
// http.createServer(rqListner);
const server = http.createServer((req, res) => {
  //   console.log(req.url, req.headers, req.method);
  const reqUrl = req.url;
  const reqMethod = req.method;
  if (reqUrl === "/") {
    res.write("<h1>Hello World</h1>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form>"
    );
    return res.end(); //To exit the process and not continue with the further execution
  }
  if (reqUrl === "/message" && reqMethod === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Further block has been executed</h1>");
  res.end();
  //   process.exit();
});

server.listen(3000);
