/**
 * Created by Max on 02.07.15.
 */
var express=require('express');
var router=express.Router();


router.get('/',function(req,res){
    res.render('start',{"LOGIN":"Login to CF Test","CountUsr":"1","User":req.user});
});


module.exports=router;