var mysql   = require('mysql');

//--- MySQL Connection stuff ----------------------------------------------------------------------------------
//mysql require on top with the other requires
//localhost test db settings
var konfioDB    = 'Konfio';
var konfioTable = 'konfio_prods';

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5648Kabu',
  database: konfioDB
});

function connect(dbName){ 
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to "+konfioDB);
  });
}

connect(); //start connection

exports.con = con;