
var express = require("express")
const app = express();
var bodyParser = require('body-parser')
var mysql = require("mysql")
var logger = require('morgan');
var cors = require("cors");
var path = require('path');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// app.use(function(err){

// console.log(err);

// })
var setpermission = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}
app.use(cors())


app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/Dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/login',function(req,res){
    console.log(req.body.Password+" = body");
    var email = req.body.email;
    var password=req.body.Password;
    console.log(password+" | "+email);
    var con = mysql.createConnection({
      host: "localhost",
      user: "umair",
      password: "123456789",
      database: "Product_Db",
      port:"786"
    });
    con.query("SELECT * FROM Admin WHERE email = '" + email+"'" ,function(err,rows){
			if (err)
            console.log(err);
			else if (!rows.length) {
            res.json({status:0,message:"No Admin Found"}) ;  
        
            } 
			else if (!( rows[0].Password == password))
                res.json({status:0,message:"Wrond Password"}) 
          
      else res.json({status:1,message:"Successfull Login",details:rows[0]})			
		
		});}
);

app.post('/product',function(req,res){

  var con = mysql.createConnection({
    host: "localhost",
    user: "umair",
    password: "123456789",
    database: "Product_Db",
    port:"786"
  });
  if(!req.body.ProductName){
    res.json({status:0,message:"Please Enter ProductName"})

  }
  else{
  con.connect(function(err) {
    if (err) res.json({status:0,message:err});;
    console.log("Connected!");
    var sql = "INSERT INTO Product (ProductName) VALUES ? ";
    var values = [
        [''+req.body.ProductName]];
    con.query(sql, [values],function (err, result) {
      if (err) res.json({status:0,message:err});
      else res.json({statuse:1,message:"Successfully Added"})
    });
  });
  }

}

);


app.get('/product',function(req,res){
  var con = mysql.createConnection({
    host: "localhost",
    user: "umair",
    password: "123456789",
    database: "Product_Db",
    port:"786"
  });
  con.connect(function(err) {
      if (err) res.json({status:0,message:err});
       con.query("SELECT * FROM Product", function (error, result, fields) {
      if (error) res.json({status:0,message:error});
      else res.json({statuse:1,message:"Successfully Fetched",result:result})
    });
  });

})


app.delete('/product/:id',function(req,res){
  var id = req.params.id;

  var con = mysql.createConnection({
    host: "localhost",
    user: "umair",
    password: "123456789",
    database: "Product_Db",
    port:"786"
  });
  con.connect(function(err) {
    if (err) res.json({status:0,message:err});
    var sql = "DELETE FROM Product WHERE id = '"+id+"'";
    con.query(sql, function (err, result) {
      if (err) res.json({status:0,message:err});
      else if (result.affectedRows!=0)res.json({status:1,message:"Successfully Deleled",result:result.affectedRows});
      else if(result.affectedRows==0) res.json({status:1,message:"No Product of given id",result:result.affectedRows});
    });
  });


});

app.put('/product/:id',function(req,res){
var ProductName = req.body.ProductName;
var id = req.params.id;
var con = mysql.createConnection({
  host: "localhost",
  user: "umair",
  password: "123456789",
  database: "Product_Db",
  port:"786"
});
con.connect(function(err) {
  if (err) res.json({status:0,message:err});
  var sql = "UPDATE Product SET ProductName = '"+ProductName+"'"+" WHERE id = '"+id+"'";
  con.query(sql, function (err, result) {
    if (err) res.json({status:0,message:err});
    else res.json({status:1,message:"Successfully Updated",result:result.affectedRows});
  });
});

});







app.listen(3000, () => console.log(`Example app listening at http://localhost:${3000}`))
