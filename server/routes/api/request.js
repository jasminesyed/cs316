const Run = require("../../models/run.js").Run
const User = require("../../models/User.js").User
const UserSession = require("../../models/UserSession").UserSession
const Request = require("../../models/request").Request
module.exports = (app) => {
  app.get("/api/requests", (req, res, next)=>{
    const {query} =req;
    const {runid} = query;
    Request.find({runId:runid}, (err, reqs)=>{
      if(err){
        console.log(err)
      }else{
        console.log(reqs)
        res.send(reqs)
      }
    })
  })
  app.post("/api/sendrequest", (req,res,next)=>{
    const { body } = req;
    const { runId, requesterToken, items } = body;
    UserSession.findById(requesterToken, (err, userS)=>{
      if(err){
        console.log(err)
      }else{
        User.findById(userS.userId, (err, user)=>{
          //console.log(user)
          if(err){
            console.log(err)
          }else{
            var newReq = new Request();
            newReq.runId= runId;
            newReq.orders=items;
            console.log(items)
            newReq.requester=user.email
            newReq.save((err, req)=>{
              if (err) {
                console.log(err)
                return res.send({
                  success: false,
                  message: 'Error: Server error'
                });
              }else{
                return res.send({
                  success: true,
                  message: 'sent'
                });
              }
            })
          }
        })
      }

    })

  })
}
