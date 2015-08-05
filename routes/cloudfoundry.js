/**
 * Created by z002ew6p on 28.07.2015.
 */
var express=require('express');
var router=express.Router();
var cf =require('cloud-foundry');
var config=require('../config/config');
var https = require('https');
https.globalAgent.options.secureProtocol = 'SSLv3_method';
var requester=require('request');
var proxy="http://solutions02.nbg9.siemens.de:3128";
//Authenticate

router.post('/token',function(req,res){
   var user=req.body.username;
   var pwd=req.body.password;
   authenticate(user,pwd,function(token){
       var result=false;
       if (token!=null) {
           res.set('Authorization', 'bearer ' + token);
           result=true;
       }
       res.send({'Authenticated':result});
   }) ;
});

router.get('/quotas',function(req,res){
    var token=req.headers['Authorization'];

});

router.get('/ListApps',function(req,res){
    var token=req.headers['authorization'] || req.headers['Authorization'] ;
    getAllApps(token,function(data){
       res.send(data);
    });
});



function getQuota(token,res,req)
{
    var host=config.cf_endpoint+"/v2/quota_definitions";
    var headers={"Authorization":"bearer " + token };

    requester({uri:host,headers:headers,method:'GET'}, function (error, response, body) {
        console.log('request');
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
            res.send(body);
        }
    });
}


function authenticate(user,password,callback)
{
    var host=config.uaa_endpoint+"/oauth/token"
    var header={"content-type":"application/x-www-form-urlencoded",
        "accept":"application/json;charset=utf-8","authorization":"Basic Y2Y6"};
    var data={username:user,password:password,grant_type:"password"};
    var r=requester.defaults({'proxy':proxy});
    r({uri:host,headers:header,method:'POST',form:data},function(error,res,body){
        if(error==null)
        {
            callback(JSON.parse(body).access_token);
        }

    });
}

function getAllApps(token,callback)
{
    var host=config.cf_endpoint+"/v2/apps"
    var headers={"Authorization":token };
    var r=requester.defaults({'proxy':proxy});
    r({uri:host,headers:headers,method:'GET'},function(error,res,body){
        if(error==null)
        {
            callback(JSON.parse(body));
        }

    });
}

function checkToken(token)
{

    //TOBEDONE client secret neccessary
    var host=config.uaa_endpoint+"/check_token";
    var header={"content-type":"application/x-www-form-urlencoded",
        "accept":"application/json;charset=utf-8","Authorization":"Basic Y2Y6"};
    var data={token:user,password:password,grant_type:"password"};

}

module.exports=router;