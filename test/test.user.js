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
        db = mongoose.connect('mongodb://localhost/test', function(err){
            if(err) console.log(err);
        });
        User = require('../models/user');
        mongoose.Promise = Promise;
        done();
    });

    after(function(done) {
        mongoose.connection.close();
        done();
    });

    function saveAndFindUser(pUserName, pPassword) {

        let promise = new Promise(function(resolve, reject) {
            let user = new User({
                username: pUserName,
                password: pPassword
            });
            user.save(function(err) {
                if(err)console.log('error! ' + err.message);
                User.findOne({
                    username: pUserName
                }, function(err, foundUser) {
                    if (err) {
                        console.log('Error');
                        console.log(err.message);
                        reject();
                    }
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
                    .then(function(user) {
                        let check = (pUserName ===  user.username );
                        User.deleteMany({}, function(err){
                            if(err)console.log(err.message);
                        });
                        return check;
                    });
            });
        jsv.check(findUsername).then(function(x){
            assert.equal(x, true);
            done();
        });
    });

});
