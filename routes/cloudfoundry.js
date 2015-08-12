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

router.get('/AllData',function(req,res){
    var token=req.headers['authorization'];
    getQuotaPercantage(token,req,res,function(quota,app,orgs,spaces){

        var result=mergeData(quota,orgs,app,spaces);
        res.send(result);
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

    });
});

router.post('/AppUsageInfo',function(req,res){
    var token=req.headers['authorization'] || req.headers['Authorization'] ;
    var dataresponse;
    var guid=req.body.guid;
    getAppStats(token,guid,function(data){

        res.send(data);
    });
});


function getQuotaPercantage(token,res,req,callback)
{
    var quota;
    var app;
    var orgs;
    var spaces;
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
                })},
                        function(callback){
                            getAllSpaces(token,function(data){
                                spaces=data;
                                console.log('spaces fetched');
                                callback();
                            });
}
    ],function(err){
        console.log(err);
        callback(quota,app,orgs,spaces);
    });

}




function mergeData(quota,organisations,apps,spaces) {
    var res = {};
    res.orgs=[];
    var i;
    for (i = 0; i < organisations.resources.length; i++)
    {

        res.orgs[i]= {};
        res.orgs[i].Org_GUID=organisations.resources[i].metadata.guid;
        res.orgs[i].Org_Name=organisations.resources[i].entity.name;
        res.orgs[i].Org_metadata=organisations.resources[i].metadata;
        res.orgs[i].Org_entity=organisations.resources[i].entity;

        var space=spaces.resources.filter(function(space){
           return space.entity.organization_guid==  res.orgs[i].Org_GUID
        });
        res.orgs[i].Org_Spaces=space;
        var single_quota=quota.resources.filter(function(q){
           return q.metadata.guid==res.orgs[i].Org_entity.quota_definition_guid
        });

        if (single_quota.length>0){res.orgs[i].quota=single_quota[0];}

        var i_spaces;
        res.orgs[i].apps=[];

        var i_apps;
        var orgquota_mem=0;
        var orgquota_disk=0;
        //all spaces in org
        for (i_spaces=0;i_spaces<res.orgs[i].Org_Spaces.length;i_spaces++) {

            var app = apps.resources.filter(function (app) {
                return app.entity.space_guid ==res.orgs[i].Org_Spaces[i_spaces].metadata.guid
            });
            var spacequota_mem=0;
            var spacequota_disk=0;

            //all apps in space
            for (i_apps=0;i_apps<app.length;i_apps++)
            {

                    spacequota_mem = app[i_apps].entity.memory * app[i_apps].entity.instances+spacequota_mem;
                    spacequota_disk=app[i_apps].entity.disk_quota * app[i_apps].entity.instances+spacequota_disk;

            }

            orgquota_mem=spacequota_mem+orgquota_mem;
            orgquota_disk=orgquota_disk+spacequota_disk;

            res.orgs[i].Org_Spaces[i_spaces].allocatedSpace_Memory=spacequota_mem;
            res.orgs[i].Org_Spaces[i_spaces].allocatedSpace_Disk=spacequota_disk;

            res.orgs[i].apps.push(app); //for faster access
            res.orgs[i].Org_Spaces[i_spaces].apps=app;

        }

        res.orgs[i].allocatedOrg_Memory=orgquota_mem;
        res.orgs[i].allocatedOrg_Disk=orgquota_disk;

        res.orgs[i].quotaPerc= (res.orgs[i].allocatedOrg_Memory/res.orgs[i].quota.entity.memory_limit)*100;


    }



    return res;


}

function getQuota(token,callback)
{
    var host=config.cf_endpoint+"/v2/quota_definitions";
    var headers={"Authorization":token };

    r({uri:host,headers:headers,method:'GET'}, function (error, response, body) {
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

function getAllSpaces(token,callback)
{
    var host=config.cf_endpoint+"/v2/spaces"
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