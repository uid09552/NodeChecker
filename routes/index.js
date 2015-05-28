/**
 * Created by Max on 28.05.15.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    router.sendfile('Login.html', {root: path.join(__dirname, '../public')});
});

module.exports = router;
