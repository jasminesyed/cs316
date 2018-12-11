const mysql = require("mysql")
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  insecureAuth : true
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
const getItemsSql='select megatable.name, size, item_id, price from coffeebud.eatery join coffeebud.megatable on eatery.eatery_id=megatable.eatery_id where eatery.name='
module.exports = (app) => {
  app.get('/api/getitems', (req,res,next)=>{
    const { query } = req;
    const { eatery } = query;
    console.log(eatery)
    con.query(getItemsSql+"'"+eatery+"';", function(err, result, fields){
      if(err){
        console.log(err)
      }
      var items = result.map(a=>{
        var o = {}
        o.size=a.size;
        o.name=a.name;
        o.item_id=a.item_id;
        o.price=a.price;
        return o;
      })
      res.send(items)
    })
  })
  app.get('/api/geteateries', (req,res,next)=>{
    con.query("select * from coffeebud.eatery;", function (err, result) {
      if (err) throw err;
        res.send(result)
      });
  })



}
