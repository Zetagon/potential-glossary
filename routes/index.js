/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';
const express  = new require('express'),
      User     = require('../models/user'),
      passport = require('passport'),
      router   = express.Router(),
      register = require('../passport/register');




router.get('/register', (req, res) => {
    res.render('register', { });
});

router.post('/register', register);

router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('index', {user: req.user});
    } else {
        res.render('login', { user: req.user});
    }

});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
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
