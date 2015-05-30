/**
 * Created by Max on 30.05.15.
 */
var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
   console.log('List filesystem');
});

module.exports=router;