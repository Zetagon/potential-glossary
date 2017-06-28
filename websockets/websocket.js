var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;

    switch (path) {
        case '/':
            fs.readFile(__dirname + "/index.htm", function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/socket.htm':
            fs.readFile(__dirname + "/socket.htm", function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
});

var chatMessages = [];

server.listen(7425);

var listener = io.listen(server);
listener.sockets.on('connection', function (socket) {
    console.log("User connected");

    socket.on('customPing', function (data) {
        console.log("Server received ping.");
        socket.emit('customPong', {});
    });
    socket.on('customPong', function (data) {
        console.log("Server received pong.");
    });
    socket.on('disconnect', function (reason) {
        console.log("User disconnected");
    });

    socket.on('chat', function (data) {
        switch(data.action) {
            case "join":
            if(socket.rooms['globalChat']){
                socket.emit('chatMessage', 'You are already connected the chat!');
            } else {
                socket.emit('chatHistory', chatMessages);
                socket.emit('chatMessage', 'You joined the chat!');
                console.log("user joined chat.");
            }
            socket.join('globalChat');
            break;

            case "leave":
            if(socket.rooms['globalChat']){
                socket.emit('chatMessage', 'You left the chat.');
                console.log("user left chat.")
            } else {
                socket.emit('chatMessage', 'You are already disconnected from the chat.');
            }
            socket.leave('globalChat');
            break;

            case "message":
            if(socket.rooms['globalChat']){
                chatMessages.push(data.text);
                listener.to('globalChat').emit('chatMessage', data.text);
            } else {
                socket.emit('chatMessage', 'You need to join the chat before you can send and receive messages.');
            }
            break;

            default:
        }
    });
});
