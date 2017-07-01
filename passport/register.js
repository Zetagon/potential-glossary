/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';

const User     = require('../models/user'),
      passport = require('passport'),
      logger   = require('winston').loggers.get('registration-login');

module.exports = function (req, res, next){
    req.logout();
    logger.info('New registration incoming!');
    User.register(new User({ username: req.body.username }), req.body.password, function( err, account){
        if(err){
            logger.error('Error registering user!');
            return res.render('register', {account: account, error: err.message});
        }

        passport.authenticate('local')(req, res, function(err){
            if (err) {
                return next(err);
            }

            logger.info('User registered!');
            res.redirect('/');
        });
    });
}
