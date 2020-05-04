var mysql = require('mysql');
var host = "localhost";
var user = "umair";
var password="123456789";
var port = "786";

// viewProductTableRecords(host,user,password,port)
// viewAdminTableRecords(host,user,password,port)
// createProductTable(host,user,password,port)
// createDatabase(host,user,password,port)
// createAdminTable(host,user,password,port)
// init_populate_Admin(host,user,password,port)
// init_populate_Product(host,user,password,port)


function createProductTable(host,user,password,port){
var con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  port: port,
  database:"Product_Db"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE Product (id int NOT NULL AUTO_INCREMENT,ProductName varchar(255) NOT NULL, PRIMARY KEY (id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Product Table created");
  });
});

}



function createDatabase(host,user,password,port){

    
var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    port: port,
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE Product_Db", function (err, result) {
      if (err) throw err;
      console.log("Product_Db Database created");
    });
  });
}

function createAdminTable(host,user,password,port){

    var con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        port: port,
        database:"Product_Db"
      });
      
      
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE Admin (Email varchar(255) NOT NULL,Password varchar(255) NOT NULL, PRIMARY KEY (email))";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Admin Table created");
        });
      });


}

function init_populate_Admin(host,user,password,port){


    var con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: "Product_Db",
        port: port
      });
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO Admin (email,Password ) VALUES ('admin@admin.com', 'admin')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });

}


function init_populate_Product(host,user,password,port){


    var con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: "Product_Db",
        port: port
      });
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO Product (ProductName) VALUES ? ";
        var values = [
            ['Fan'],
            ['Iphone X'],
            ['Samsung Galaxy S20'],
            ['Intel COre i5'],
            ['Mi AirDots'],
          ];
        con.query(sql, [values],function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows+" records inserted");
        });
      });

}

function viewAdminTableRecords(host,user,password,port){


    var con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: "Product_Db",
        port: port
      });
      
      con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM Admin", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });

}

function viewProductTableRecords(host,user,password,port){


    var con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: "Product_Db",
        port: port
      });
      
      con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM Product", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });

}
