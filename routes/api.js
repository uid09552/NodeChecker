/**
 * Created by Max on 09.07.15.
 */

var rest=require('connect-rest');

var options = {
    context: '/api',
    domain: require('domain').create()
};


module.exports=function(app){
app.use(rest.rester(options));
rest.get('/filesystem',function(req,content,cb){
   return {
            test:"test",
            test2:"test"
        };


});

rest.get('/filesystem/:id',function(req,content,cb){

  return cb(null,function(){
       var ret={
           ret:req.params.id
       };
       return ret;
   });
});
};