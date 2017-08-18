var userJson = require('./User.json');
var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
var userSchema = new Schema(userJson.schema,{ runSettersOnQuery: userJson.runSettersOnQuery });
// var userSchema = mongoose.Schema(userJson.schema,{ runSettersOnQuery: userJson.runSettersOnQuery });
// var User = mongoose.model('Users', userSchema);
module.exports = mongoose.model('User', userSchema);