/**
 * Created by Max on 23.06.15.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    //res.sendfile('./Views/login.html');
    res.render('auth',{"LOGIN":"Login to CF Test","CountUsr":"1","User":req.user});
});

module.exports = router;
