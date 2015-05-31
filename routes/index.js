/**
 * Created by Max on 28.05.15.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

  //res.sendfile('./Views/login.html');
    res.render('auth',{"LOGIN":"Login to CF Test"});
});

module.exports = router;
