/**
 * Created by z002ew6p on 28.07.2015.
 */
var express=require('express');
var router=express.Router();
var cf =require('cloud-foundry');
var config=require('../config/config');
var requester=require('request');


router.get('/quotas',function(req,res){
    var token=req.headers['cf-bearer'];

    if (token==null)
    {
        authenticate("maximilian.hoch@siemens.com","",res,req,getQuota);
    }else getQuota(token,res,req);
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
function authenticate(user,password,res,req,callback)
{
    var host="https://uaa.sys.sagicsfmo.cf.canopy-cloud.com/oauth/token"
    var header={"content-type":"application/x-www-form-urlencoded",
        "accept":"application/json;charset=utf-8","authorization":"Basic Y2Y6"};
    var data={username:user,password:password,grant_type:"password"};
    requester({uri:host,headers:header,method:'POST',form:data},function(error,res,body){
        if(error==null)
        {
            res.setHeader("cf-bearer",body.access_token);
            callback(body.access_token,res,req);
        }

    });
}



module.exports=router;