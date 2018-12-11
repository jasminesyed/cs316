const Run = require("../../models/run.js").Run
const User = require("../../models/User.js").User
const UserSession = require("../../models/UserSession").UserSession
module.exports = (app) => {
  app.get('/api/getrun', (req,res,next)=>{
    Run.find({active:true}, (err, list)=>{
      if(err){
        console.log("activerun get error", err)
        return res.send({
          success:true,
          list: list});
      }
        return res.send({
          success:true,
          list: list});
    //  })
      })
    })
  app.post('/api/endrun', (req, res, next)=>{
    const { body } = req;
    const { sessionId } = body;
    UserSession.findOne({
      _id:sessionId, isDeleted:false},(err,session)=>{
        return session.userId
      }).then((session)=>{
        var runnerId= session.userId;
        User.findById(runnerId, (err,user)=>{
          if(err){
            console.log(err)
          }

        Run.findOneAndUpdate({runner:user.email, active: true},{$set:{active:false}}, {new:true}, (err, run )=>{
          if(err){
            console.log(err);
          }
          else{
            return res.send({
              success: true,
              message: 'lets run'})}
        })
      })
  })
});

  app.post('/api/run', (req, res, next) => {
    const { body } = req;
    let {eatery, sessionId, itemLimit } = body;
    if (!eatery) {
      return res.send({
        success: false,
        message: 'Error: You must select an eatery'
      });
    }
    if(!sessionId){
      return res.send({
        success: false,
        message: "you must log in"
      });
    }
    UserSession.findOne({
      _id:sessionId, isDeleted:false},(err,session)=>{
        return session.userId
      }).then((session)=>{
        User.findById(session.userId, (err, user)=>{
          if(err){
            console.log(err)
          }
          var newRun = new Run();
          newRun.eatery=eatery;
          newRun.itemLimit=itemLimit;
          newRun.active=true;
          newRun.runner=user.email;
          console.log(newRun)
          newRun.save((err, run)=>{
            if (err) {
              console.log(err)
              return res.send({
                success: false,
                message: 'Error: Server error'
              });
            }else{
              return res.send({
                success: true,
                message: 'Signed up',
                runId:run._id
              });
            }
          })
        })

      })

  })
}
