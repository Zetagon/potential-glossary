/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';
let mongoose              = require('mongoose'),
    Schema                = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

let Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
