/**
 * Created by Max on 28.05.15.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

  //res.sendfile('./Views/login.html');
    res.render('index',{"LOGIN":"Login to CF Test","CountUsr":"1","User":req.user});
});

module.exports = router;
