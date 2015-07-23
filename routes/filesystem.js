/**
 * Created by Max on 30.05.15.
 */
var express=require('express');
var router=express.Router();

var basicHC = require('basic-healthcheck');

router.get('/',function(req,res){
    var mystatus = basicHC.status([ 'memory', 'disk', 'node_version' ]);
    res.status(201);
    res.send(mystatus);
});




module.exports=router;