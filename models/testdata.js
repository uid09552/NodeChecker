/**
 * Created by Max on 22.06.15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('testdata', new Schema({
    mytestdata: String
}));

