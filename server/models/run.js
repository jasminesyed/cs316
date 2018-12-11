var mongoose = require('mongoose');
var runSchema = mongoose.Schema({
  eatery: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  itemLimit: {
    type: Number,
    required:true
  },
  runner:{
    type:String,
    required:true
  }
});



  var Run = mongoose.model("Run", runSchema);
  module.exports={
    Run: Run
  };
