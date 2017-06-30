/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';
require('dotenv').config();
const app           = require('express')(),
      bodyparser    = require('body-parser'),
      cookieParser  = require('cookie-parser'),
      http          = require('http'),
      url           = require('url'),
      mongoose      = require('mongoose'),
      socketio      = require('socket.io'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      server        = http.createServer(app),
      io            = socketio(server),
      port          = 8080;

mongoose.connect('mongodb://' + process.env.DB_HOST + ':/Users');
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error'));
db.once('open', () =>{
    console.log("Connection with mongodb established!");
    //TODO:
});


app.set('views', './views');//Set directory for views
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.use('/', require('./routes/index'));

// Passport config
let User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Catch 404 and forward to error handler
app.use( (req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});
//production error handler will print stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// develpment error handler
// will print stacktrace

// app.post('/login',
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     (req, res) => {
//      res.redirect('/');
//     });


server.listen(port, () => {
    console.log('Listening on: ' + server.address().port);
});
