/**
 * Created by Max on 28.05.15.
 */

var express = require('express');
var router = express.Router();
var path = require('path');
router.get('/', function (req, res) {
    console.log(__dirname);

    res.render('Login');
});

module.exports = router;
