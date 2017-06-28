var http = require("http");

var httpPortNumber = 7425;

/*
var server = http.createServer(httpHandler);

function httpHandler(request, response) {
    console.log("HTTP connection");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Testing</title>");
    response.write("</head>");
    response.write("<body>");
    response.write("Hello World!");
    response.write("</body>");
    response.write("</html>");
    response.end();
}

server.listen(httpPortNumber);
console.log("Server is listening on port " + httpPortNumber + ".");
*/
 
var websocket = require("./websocket.js");

websocket.createServer(httpPortNumber);
