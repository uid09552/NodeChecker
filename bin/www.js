/**
 * Created by Max on 24.05.15.
 */
var express = require('express');
var fs = require('fs');
var logger = require('log4js');
var app = express();
app.set('port', process.env.PORT || 3000);
//app.port('4000');


app.use(function (req, res) {
    res.type('text/plain');
    res.status(400);
    res.send('Page not Found');
    console.log('Page not Found');
    //  logger.info('Page not Found');
});

//Error
app.use(function (err, req, res, next) {
    res.type('text/plain');
    res.status(500);
    res.send('internal Server error');

});

app.listen(app.get('port'), function () {
    console.log('Server started');
    //logger.info('Server started on Port');
});