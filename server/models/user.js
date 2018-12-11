var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number
  },
  contacts:{
    type: Array
  }});


  userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  var User = mongoose.model("User", userSchema);
  module.exports={
    User: User
  };
