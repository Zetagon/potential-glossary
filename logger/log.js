/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';
let winston = require('winston');
winston.emitErrs = true;

//For general use
winston.loggers.add('general', {
    console: {
        level:'debug',
        handleExceptions:true,
        json:false,
        colorize:true,
        label:'General',
        timestamp:true
    }
});

//For mongoose
winston.loggers.add('mongoose', {
    console: {
        level:'debug',
        handleExceptions:true,
        json:false,
        colorize:true,
        label:'Mongoose',
        timestamp:true
    }
    
});

//For stuff relating to websockets
winston.loggers.add('socket', {
    console: {
        level:'debug',
        handleExceptions:true,
        json:false,
        colorize:true,
        label:'Socket.io',
        timestamp:true
    }
});

//For stuff relating to logging in or registration
winston.loggers.add('registration-login', {
    console: {
        level:'debug',
        handleExceptions:true,
        json:false,
        colorize:true,
        label:'Registration/Login',
        timestamp:true
    }
});

//For unit/integration-test
winston.loggers.add('test', {
    console: {
        level:'debug',
        handleExceptions:true,
        json:false,
        colorize:true,
        label:'Tests',
        timestamp:true
    }
});
