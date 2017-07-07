/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';

const User     = require('../models/user'),
      passport = require('passport');

/*
 * handles registration
 */
function register(req, res, next){
    req.logout();
    console.log('New registration incoming!');
    console.log(req.body);
    User.register(new User({ username: req.body.username }), req.body.password, function( err, account){
        if(err){
            console.log('Error registering user!');
            return res.render('register', {account: account, error: err.message});
        }

        passport.authenticate('local')(req, res, function(err){
            if (err) {
                return next(err);
            }

            console.log('User registered!');
            res.redirect('/');
        });
    });
}
module.exports = register;
