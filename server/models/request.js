var mongoose = require('mongoose');
var requestSchema = mongoose.Schema({
  runId: {
    type: String,
    required: true
  },
  orders: {
    type: Object,
    required: true
  },
  requester: {
    type: String,
    required:true
  },
});



  var Request = mongoose.model("Request", requestSchema);
  module.exports={
    Request: Request
  };
