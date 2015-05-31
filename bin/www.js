/**
 * Created by Max on 24.05.15.
 */
var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var logger = require('log4js');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//Routes
var index = require('../routes/index');
var mongo = require('../routes/mongo');//Write to Mongo
var redis=require('../routes/redis');
var filesystem=require('../routes/filesystem');

//get static index file
app.use(express.static('./public'));
//HTML VIEW ENGINGE
app.set('views', './Views');
//app.set('view engine', 'html');
//app.engine('html', require('ejs').renderFile);

app.set('view engine', 'jade');



//ROUTES
app.use('/', index);
app.use('/mongo', mongo);
app.use('/redis',redis);
app.use('/filesystem', filesystem);//DONE


app.get('/SayHello', function (req, res) {
    res.type('text/plain');
    res.status(200);
    res.send('Hello from express');

});



//page not found
app.use(function (req, res) {
    res.type('text/plain');
    res.status(400);
    res.send('Page not Found');
    console.log('Page not Found');
    //  logger.info('Page not Found');
});


//Error handling
app.use(function (err, req, res, next) {
    res.type('text/plain');
    res.status(500);
    res.send(err);
    console.log(err);
});


module.exports.start1 = function () {
    app.listen(app.get('port'), function () {
        console.log('Server started');
        //logger.info('Server started on Port');
    });
};