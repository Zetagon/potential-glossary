/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';

let assert = require('assert'),
    mongoose = require('mongoose'),
    jsv = require('jsverify'),
    User;
let db;

describe('User', function() {
    before(function(done) {
        db = mongoose.connect('mongodb://localhost/test');
        User = require('../models/user');
        mongoose.Promise = Promise;
        done();
    });

    after(function(done) {
        mongoose.connection.close();
        done();
    });

    function saveAndFindUser(pUserName, pPassword) {
        let user = new User({
            username: pUserName,
            password: pPassword
        });

        let promise = new Promise(function(resolve, reject) {
            user.save(function(err) {
                User.findOne({
                    username: pUserName
                }, function(err, foundUser) {
                    if (err) {
                        console.log(err.message);
                        reject();
                    }
                    console.log('Resolve!');
                    resolve(foundUser);
                });
            });
        });


        return promise;
    }

    it('finds a user by username', function(done) {
        let findUsername = jsv.forall(jsv.asciinestring, jsv.asciinestring,
            function(pUserName, pPassword) {
                return saveAndFindUser(pUserName, pPassword)
                    .then(function(error) {
                        console.log('then');
                        User.remove({});
                        return _.isEqual(pUserName);
                    });
            });
        jsv.assert(findUsername);
        done();
    });

});
