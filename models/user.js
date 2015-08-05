/**
 * Created by Max on 06.06.15.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;



module.exports=mongoose.model('User',new Schema({
   name:{type:String,select:true,unique:true},
   password: {type:String,select:true},
   scope: String

}));

