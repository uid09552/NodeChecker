/**
 * Created by Max on 30.05.15.
 */
var express=require('express');
var router=express.Router();
var discspace = require('diskspace');
var njds = require('nodejs-disks');

router.get('/',function(req,res){
    var alldiscstatus = [];
    var discstatus;
    var status;
    njds.drives(
        function (err, drives) {
            njds.drivesDetail(
                drives,
                function (err, data) {
                    if (err) {
                        console.error(err);
                    }
                    for (var i = 0; i < data.length; i++) {

                        discstatus = {
                            "mountpoint": data[i].mountpoint, "Total": data[i].total, "Used": data[i].used,
                            "available": data[i].available,
                            "Name": data[i].drive, "FreePerc": data[i].freePer
                        };
                        alldiscstatus.push(discstatus);
                    }
                    console.log(alldiscstatus);
                    res.status(201);
                    res.send(alldiscstatus);
                }
            );
        }
    );



});


module.exports=router;