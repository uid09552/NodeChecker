/**
 * Created by Max on 19.06.15.
 */

var express = require('express');
var router = express.Router();
var user = require('../models/user');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

router.get('/', function (req, res) {
    user.find({"name": "administrator"}, function (err, users) {
        if (err) console.error(err);

        console.log(users);
        if (users.length > 0) {
            res.status(202);
            res.send('already exists');
            res.end();

        } else {
            var hashedPassword = passwordHash.generate('mysecretpassword');

            var admin = new user({"name": "administrator", "password": hashedPassword, "scope": "{admin:true}"});
            admin.save(function (err) {
                if (err) throw err;

                console.log('User saved successfully');
                res.json({success: true});
                res.end();
            });
        }
    });

});

router.get('/delete', function (req, res) {
    user.remove({}, function (err, stat) {
        if (err) console.error(err);
        console.log(stat);
        res.status(201);
        res.send('deleted');
        res.end();

    });
});

module.exports = router;