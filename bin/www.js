/**
 * Created by Max on 24.05.15.
 */
var express = require('express');
var fs = require('fs');
var logger = require('log4js');
var app = express();
app.set('port', process.env.PORT || 3000);
//app.port('4000');


//get static index file
//Get Login-Page

//Get Status-Info

//routes
app.get('/SayHello', function (req, res) {
    res.type('text/plain');
    res.status(200);
    res.send('Hello from express');

});

//Write to Mongo


//Write to redis


//Read from Redis


//Read from Mongo


//List filesystem

//page not found
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

module.exports.start1 = function () {
    app.listen(app.get('port'), function () {
        console.log('Server started');
        //logger.info('Server started on Port');
    });
};