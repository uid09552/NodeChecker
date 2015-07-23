/**
 * Created by Max on 30.05.15.
 */
var express=require('express');
var router=express.Router();

var basicHC = require('basic-healthcheck');

router.get('/',function(req,res){
    try {


        var mystatus = basicHC.status(['memory', 'node_version']);
        res.status(201);
        res.send(mystatus);

    }catch (e)
    {
        console.error(e);
    }
});




module.exports=router;