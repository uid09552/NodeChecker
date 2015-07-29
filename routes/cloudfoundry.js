/**
 * Created by z002ew6p on 28.07.2015.
 */
var express=require('express');
var router=express.Router();
var cf =require('cloud-foundry');
var config=require('../config/config');
var requester=require('request');


router.get('/quotas',function(req,res){
 var host="https://api.sys.sagicsfmo.cf.canopy-cloud.com/v2/quota_definitions";
 var headers={"Authorization":"bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI1MTA4OTljMi1kOTQ2LTQ4MWYtOTBlZC0yYzdjY2ZhZDY0NzgiLCJzdWIiOiI3NDFlMDc0ZS02YzZiLTQ2YWEtOTYzZS04YTMyZThiMTRmYjAiLCJzY29wZSI6WyJwYXNzd29yZC53cml0ZSIsIm9wZW5pZCIsImNsb3VkX2NvbnRyb2xsZXIud3JpdGUiLCJjbG91ZF9jb250cm9sbGVyLnJlYWQiXSwiY2xpZW50X2lkIjoiY2YiLCJjaWQiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI3NDFlMDc0ZS02YzZiLTQ2YWEtOTYzZS04YTMyZThiMTRmYjAiLCJ1c2VyX25hbWUiOiJtYXhpbWlsaWFuLmhvY2hAc2llbWVucy5jb20iLCJlbWFpbCI6Im1heGltaWxpYW4uaG9jaEBzaWVtZW5zLmNvbSIsImlhdCI6MTQzODE1MDE0MSwiZXhwIjoxNDM4MTkzMzQxLCJpc3MiOiJodHRwczovL3VhYS5zeXMuc2FnaWNzZm1vLmNmLmNhbm9weS1jbG91ZC5jb20vb2F1dGgvdG9rZW4iLCJhdWQiOlsic2NpbSIsIm9wZW5pZCIsImNsb3VkX2NvbnRyb2xsZXIiLCJwYXNzd29yZCJdfQ.KGiVc8G4AKDN7x3t1QXmPo3pnK9PfFs5f8KV778bM4rVp67GLfqVPx48wDZA3dym3BMdrEwx4l8Ry2gLttt0x1l-8d58afh1PoaIPKhRVX4O2z6vt3tvQTYvq5cCwwtcIM2Mc83yrNUWrxYMjSZY5wN9_6SHhYHrWh5SBWsKCTi40NLe7Wv9ORyaeJuyI2WCodHiZS1HjsoRMtvofNCOgmy1nkjiKfGvTayjgDwOYB8_-KOKs6Oe9Ti1_-BgTGm9al9kMGB76ewFFIoagaLglpvCQVALRVcqrZ-J1rnjlimzxnDb7KHLQiyCa_xUCBcQGLgyK-EPY687ImVQbj0qkQ"};

    requester({url:host,headers:headers,method:'GET'},function(err,response,body)
 {
     if (err) {console.log(err); return;}

     console.log(body);
 });

});

router.get('/', function (req,res) {
    var token="bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI1MTA4OTljMi1kOTQ2LTQ4MWYtOTBlZC0yYzdjY2ZhZDY0NzgiLCJzdWIiOiI3NDFlMDc0ZS02YzZiLTQ2YWEtOTYzZS04YTMyZThiMTRmYjAiLCJzY29wZSI6WyJwYXNzd29yZC53cml0ZSIsIm9wZW5pZCIsImNsb3VkX2NvbnRyb2xsZXIud3JpdGUiLCJjbG91ZF9jb250cm9sbGVyLnJlYWQiXSwiY2xpZW50X2lkIjoiY2YiLCJjaWQiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI3NDFlMDc0ZS02YzZiLTQ2YWEtOTYzZS04YTMyZThiMTRmYjAiLCJ1c2VyX25hbWUiOiJtYXhpbWlsaWFuLmhvY2hAc2llbWVucy5jb20iLCJlbWFpbCI6Im1heGltaWxpYW4uaG9jaEBzaWVtZW5zLmNvbSIsImlhdCI6MTQzODE1MDE0MSwiZXhwIjoxNDM4MTkzMzQxLCJpc3MiOiJodHRwczovL3VhYS5zeXMuc2FnaWNzZm1vLmNmLmNhbm9weS1jbG91ZC5jb20vb2F1dGgvdG9rZW4iLCJhdWQiOlsic2NpbSIsIm9wZW5pZCIsImNsb3VkX2NvbnRyb2xsZXIiLCJwYXNzd29yZCJdfQ.KGiVc8G4AKDN7x3t1QXmPo3pnK9PfFs5f8KV778bM4rVp67GLfqVPx48wDZA3dym3BMdrEwx4l8Ry2gLttt0x1l-8d58afh1PoaIPKhRVX4O2z6vt3tvQTYvq5cCwwtcIM2Mc83yrNUWrxYMjSZY5wN9_6SHhYHrWh5SBWsKCTi40NLe7Wv9ORyaeJuyI2WCodHiZS1HjsoRMtvofNCOgmy1nkjiKfGvTayjgDwOYB8_-KOKs6Oe9Ti1_-BgTGm9al9kMGB76ewFFIoagaLglpvCQVALRVcqrZ-J1rnjlimzxnDb7KHLQiyCa_xUCBcQGLgyK-EPY687ImVQbj0qkQ";
    var cf_api=new cf(config.cf_endpoint,{token: token });


    cf_api.apps.list({
            paging: {
                'results-per-page': 1
            },
            filter: {
                name: "instances",
                value: ">1"
            }},
        function (err, page) {
            if (err) {return console.log(err);}

            console.log(page.data);

            if (page.hasNextPage()) {
                page.getNextPage(function (err, next_page) {

                });
            }
        }
    );

});

module.exports=router;