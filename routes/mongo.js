/**
 * Created by Max on 28.05.15.
 */
var express = require('express');
var router = express.Router();

router.use('/', function (req, res) {
    res.type('text/plain');
    res.status(200);
    res.send('Hello from mongo route');
});


module.exports = router;