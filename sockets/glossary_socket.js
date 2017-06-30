/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';
let io,
    db,
    allClients = [];
module.exports = function init (pIo, pDb, sessionMiddleware){
    db = pDb;
    io = pIo;

    io.use(function(socket, next){
        sessionMiddleware(socket.request, {}, next);
    });

    io.on('connection', function( socket ){
        console.log('New connection with id: ' + socket.id + 'and username: ' + socket.request.session.passport.user);
        allClients.push(socket);


        socket.on('disconnect', function(reason){
            allClients.splice(allClients.indexOf(socket), 1);
            console.log('Connection with socket ' + socket.id + 'has been lost due to reason: ' + reason);
        });
    });
};
