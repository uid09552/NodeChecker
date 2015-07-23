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

router.post('/save',function(req,res)
{
   var title=req.body;
   console.log(title);
    res.status(303);
    res.send("Not implimented yet");
});

module.exports=router;