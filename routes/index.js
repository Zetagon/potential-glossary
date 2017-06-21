/*jslint node: true*/
/*jslint esversion: 6*/
const router = require('express').Router();

router.get('/', (req, res){
    res.render('index');
});

exports = router;
