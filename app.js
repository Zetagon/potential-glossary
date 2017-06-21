/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';
const app      = require('express')(),
      http     = require('http'),
      url      = require('url'),
      mongoose = require('mongoose'),
      socketio = require('socket.io'),
      server   = http.createServer(app),
      io       = socketio(server),
      port     = 8080;

mongoose.connect('mongodb://localhost:/test');//Connect to database 'test'
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error'));
db.once('open', () =>{
    console.log("Connection with mongodb established!");
    //TODO:
});


app.set('views', './views');//Set directory for views
app.set('view engine', 'ejs');
app.use('/', require('./routes/index'));


server.listen(port, () => {
    console.log('Listening on: ' + server.adress().port);
});
