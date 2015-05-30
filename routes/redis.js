/**
 * Created by Max on 30.05.15.
 */
var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
   console.log('write to redis');
    res.type('text/plain');
    res.status(201);
    res.send('OK');
});

module.exports=router;