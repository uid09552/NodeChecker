/**
 * Created by Max on 24.05.15.
 */
var express = require('express');
var bodyParser = require("body-parser");
var config=require('../config/config');
var mongoose=require('mongoose');
var morgan = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var forever=require('forever');
forever.checkProcess();
//var User   = require('../models/user'); // get our mongoose model


var app = express();
app.set('port', config.port);
console.log("port:"+app.get('port'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//logging
app.use(morgan('dev'));


//Routes
var index = require('../routes/index');
var mongo = require('../routes/mongo');//Write to Mongo
var redis=require('../routes/redis');
var auth=require('../routes/auth');
var login=require('../routes/login');
var filesystem=require('../routes/filesystem');
var setup=require('../routes/setup');
var start=require('../routes/start');
var verify = require('../routes/verify');
//get static index file
app.use(express.static('./public'));
//HTML VIEW ENGINGE
app.set('views', './Views');
//app.set('view engine', 'html');
//app.engine('html', require('ejs').renderFile);

app.set('view engine', 'jade');

    //Configuration reading
    mongoose.connect(config.mongodb);

    app.set('secret',config.secret);
    console.log('Configuration read');
    var db=mongoose.connection;
    db.once('open',function(callback){
        console.log('connected to mongo:'+db.host);
    });
    db.on('error',console.error.bind(console, 'connection error:'));


//ROUTES

app.use('/', index);
//Login and auth
app.use('/auth',auth);
app.use('/Login',login);

//rest api todo authentication

console.log('Route api set');
//app.use(verify);
app.get('/SayHello', function (req, res) {
    res.type('text/plain');
    res.status(200);
    res.send('Hello from express');
    console.log('/SayHello');

});

    function isAuthenticated(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-auth-token'];

        // decode token
        if (token) {

            //https://www.npmjs.com/package/jsonwebtoken
            // verifies secret and checks exp
            jwt.verify(token, app.get('secret'), function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }

            });

        } else {

            // if there is no token
            // return an error

            return res.redirect('/');
            //res.end();

           // return res.status(403).send({
              //  success: false,
               // message: 'No token provided.'
            //});

        }
    }
//protected area
app.use('/mongo',isAuthenticated, mongo);
app.use('/api/redis',isAuthenticated,redis);
app.use('/api/getFilesystem',isAuthenticated, filesystem);//DONE
app.use('/setup',isAuthenticated,setup);
app.use('/start',isAuthenticated,start);


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
        console.log('Server started on port:'+app.get('port'));
        //logger.info('Server started on Port');
    });
};