const http = require("http");
const PORT = 5000;

const server = http.createServer(function (request, response) {
  const pathName = request.url;
  if (pathName === "/") {
    response.write("HOME PAGE");
    response.end();
  } else if (pathName === "/about") {
    response.write("ABOUT PAGE");
    response.end();
  } else if (pathName === "/form") {
    response.setHeader("Content-Type", "text/html");
    response.write(
      "<form action='/userdata' method='POST'><input type='text' placeholder='Enter your name' name='name1' /><button>SUBMIT</button></form>"
    );
    response.end();
  } else if (pathName === "/userdata") {
    console.log("user data");
    response.write(" data agaya!");
    response.end();
  }
});

server.listen(PORT, console.log("Server is running on localhost:5000"));
