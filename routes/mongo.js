/**
 * Created by Max on 28.05.15.
 */
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
require('../models/testdata');



router.get('/', function (req, res) {
    res.type('text/plain');
   // res.status(200);
  //  res.send('Hello from mongo route');
    var testdata=mongoose.model('testdata');
    testdata.remove(function(err,result){
        if(err) res.send("error delete old");
        console.log('delete old mongo data');
        var mytestdat=new testdata({mytestdata:"ABC"});
        mytestdat.save(function(err,result){
            if (err) res.send("Error writing data to mongo");
            console.log('Data wrote to mongo');
            res.send("Data wrote to mongo");
        });

    });
});



router.post('/',function(req,res){
    var data=req.body;

    var testdata=mongoose.model('testdata');
    var mydata=new testdata({mytestdata:JSON.stringify(data)});
    mydata.save(function(err,result){
        if (err) console.log(err);
        testdata.find({},function(err,result) {
            if(err) console.log(err);
            console.log(result);
        });
    });

});



module.exports = router;