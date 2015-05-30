/**
 * Created by Max on 28.05.15.
 */

var express = require('express');
var router = express.Router();
var path = require('path');
router.get('/', function (req, res) {

  //res.sendfile('./Views/login.html');
    res.render('login');
});

module.exports = router;
