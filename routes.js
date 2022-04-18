const fs = require("fs");

const requestHandler = (req, res) => {
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
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        console.log(err);
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Further block has been executed</h1>");
  res.end();
  //   process.exit();
};

// module.exports = requestHandler;
// module.exports = {handler:requestHandler, someText:"Hi"};

// module.exports.handler=requestHandler;
// module.exports.someText="Hi";

//Offered only by nodeJS
exports.handler=requestHandler;
exports.someText="Hi";

