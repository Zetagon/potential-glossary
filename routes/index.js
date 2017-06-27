/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';
const express  = new require('express'),
      User     = require('../models/user'),
      passport = require('passport'),
      router   = express.Router();


router.get('/', (req, res) => {
    console.log(req.user);
    res.render('index', {user: req.user});
});

router.get('/register', (req, res) => {
    res.render('register', { });
});

router.post('/register', (req, res) => {
    console.log('New registration incoming!');
    console.log(req.body);
    User.register(new User({ username: req.body.username }), req.body.password, function( err, account){
        if(err){
            console.log('Error registering user!');
            return res.render('register', {account: account});
        }

        passport.authenticate('local')(req, res, function(){
            console.log('User registered!');
            res.redirect('/');
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login', { user: req.user});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', checkAuthentication, (req, res) => {
    res.send(req.session.passport.user + req.user);
});

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/ping', (req, res ) => {
    res.status(200).send('pong!');
});

module.exports = router;
