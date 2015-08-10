/**
 * Created by z002ew6p on 28.07.2015.
 */
var express=require('express');
var router=express.Router();
var cf =require('cloud-foundry');
var config=require('../config/config');
var async=require('async');
//var https = require('https');
//https.globalAgent.options.secureProtocol = 'SSLv3_method';
var requester=require('request');
var proxy="http://solutions02.nbg9.siemens.de:3128";
//Authenticate
proxy="";
var r;
if (proxy!="")
{
    r=requester.defaults({'proxy':proxy});
}else
{
    r=requester;
}

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
    var token=req.headers['authorization'];
    getQuotaPercantage(token,req,res,function(quota,app,orgs){
        console.log(quota);
        console.log(app);
        console.log(orgs);

    });

});

router.get('/ListApps',function(req,res){
    var token=req.headers['authorization'] || req.headers['Authorization'] ;
    getAllApps(token,function(data){
       res.send(data);
    });
});

router.get('/ListOrgs',function(req,res){
    var token=req.headers['authorization'] || req.headers['Authorization'] ;
    var dataresponse;
    getAllOrgs(token,function(data){
        console.log(data);
    });
});

router.post('/AppUsageInfo',function(req,res){
    var token=req.headers['authorization'] || req.headers['Authorization'] ;
    var dataresponse;
    var guid=req.body.guid;
    getAppStats(token,guid,function(data){
        console.log(data);
        res.send(data);
    });
});


function getQuotaPercantage(token,res,req,callback)
{
    var quota;
    var app;
    var orgs;
    async.parallel([
        function(callback){
            getAllApps(token, function(data){
                app=data;
                console.log('Apps fetched');
                callback();
            })},
        function(callback)
        {
            getAllOrgs(token,function(data){
                orgs=data;
                console.log('orgs fetched');
                callback();
            })},
                function(callback){
                    getQuota(token,function(data){
                    quota=data;
                    console.log('quota fetched');
                        callback();
                })
}
    ],function(err){
        console.log(err);
        callback(quota,app,orgs);
    });

}

function calculateQuotaPercentage(quota,organisations,apps)
{

}

function getQuota(token,callback)
{
    var host=config.cf_endpoint+"/v2/quota_definitions";
    var headers={"Authorization":token };

    requester({uri:host,headers:headers,method:'GET'}, function (error, response, body) {
        console.log('request');
        if (!error) {
            console.log(body) // Show the HTML for the Google homepage.
            callback(JSON.parse(body));
        }
    });
}



function authenticate(user,password,callback)
{
    var host=config.uaa_endpoint+"/oauth/token"
    var header={"content-type":"application/x-www-form-urlencoded",
        "accept":"application/json;charset=utf-8","authorization":"Basic Y2Y6"};
    var data={username:user,password:password,grant_type:"password"};

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
    r({uri:host,headers:headers,method:'GET'},function(error,res,body){
        if(error==null)
        {
            callback(JSON.parse(body));
        }

    });
}

function getAppStats(token,AppID,callback)
{
    var host=config.cf_endpoint+"/v2/apps/"+AppID+"/stats"
    var headers={"Authorization":token };

    r({uri:host,headers:headers,method:'GET'},function(error,res,body){
        if(error==null)
        {
            callback(JSON.parse(body));
        }

    });
}

function getAllOrgs(token,callback)
{
    var host=config.cf_endpoint+"/v2/organizations"
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