/**
 * Created by Max on 10.06.15.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.post('/', function (req, res) {
    var app = req.app;
    var username = req.body.Name;
    var pwd = req.body.pwd;
    var secret = app.get('secret');

    User.findOne({"name": username}, function (err, result) {
        if (err) console.error(err);
        console.log(result);
        if (!result) {
            res.status(201);
            res.json({"success": false, "token": null, "message": "User or password incorrect"});
            res.end();
        } else if (result) {

            // var hashedPassword = passwordHash.generate(pwd);
            if (passwordHash.verify(pwd, result.password)) {
                console.log('authenticated... generate token');
                //todo scope, no password in jwt
                result.password = "";
                var token = jwt.sign(result, secret, {
                    expiresInMinutes: 10
                });
                res.json({"success": true, "token": token, "message": "authenticated"});

                res.end();

            }
        }
    });

});


router.get('/', function (req, res) {
    res.render('auth', {"LOGIN": "Login to CF Test"});
});


module.exports = router;