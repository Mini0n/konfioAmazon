/*==============================================
  Creates konfio_prods table

  Run from terminal: 
  > node createDB.js

==============================================*/

var mysql = require('mysql');

//localhost test db settings
var dbName = 'Konfio';
var tableName = 'konfio_prods';

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5648Kabu',
  database: dbName
});

//Establish connection
con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to DB '+dbName+'!');
  checkIfTableExists(tableName); //check if table exists, if it doesnt it creates it.
});

/*-- Table definition taken from myphpadmin -----------------
-------------------------------------------------------------
Amazon product object to be used: definition
AmazonProduct = {
  ASIN            = ASIN[0],
  DetailPageURL   = DetailPageURL[0],
  MediumImage     = MediumImage[0].URL[0],
  LargeImage      = LargeImage[0].URL[0],
  Title           = ItemAttributes[0].Title[0],
  Studio          = ItemAttributes[0].Studio[0],
  Label           = ItemAttributes[0].Label[0],
  ProductTypeName = ItemAttributes[0].ProductTypeName[0]
}
-------------------------------------------------------------
CREATE TABLE konfio_prods
(id INT NOT NULL AUTO_INCREMENT, 
ASIN VARCHAR NOT NULL, 
DetailPageURL VARCHAR NOT NULL, 
MediumImage VARCHAR NOT NULL, 
LargeImage VARCHAR NOT NULL, 
Title VARCHAR NOT NULL, 
Studio VARCHAR NOT NULL, 
Label VARCHAR NOT NULL, 
ProductTypeName VARCHAR NOT NULL, 
created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
PRIMARY KEY (id));
---------------------------------------------------------- */
function createCodesTable(tableName){
 var sql = '';

 sql += 'CREATE TABLE '+tableName+' ';
 sql += '(id INT NOT NULL AUTO_INCREMENT,';
 sql += 'ASIN VARCHAR(255) NOT NULL,';
 sql += 'DetailPageURL VARCHAR(255) NOT NULL,';
 sql += 'MediumImage VARCHAR(255) NOT NULL,';
 sql += 'LargeImage VARCHAR(255) NOT NULL,';
 sql += 'Title VARCHAR(255) NOT NULL,';
 sql += 'Studio VARCHAR(255) NOT NULL,';
 sql += 'Label VARCHAR(255) NOT NULL,';
 sql += 'ProductTypeName VARCHAR(255) NOT NULL,';
 sql += 'created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,';
 sql += 'PRIMARY KEY (id))';

 console.log('> '+tableName+' creation query: ');
 console.log(sql);
 con.query(sql, function(err, res){
  if (err) throw err;
  console.log(tableName + ' created');
  process.exit();
 });
}

/* -- Check if table has been already created -------------
SHOW TABLES LIKE 'yourtable';
-------------------------------------------------------- */
function checkIfTableExists(tableName){
 var sql = 'SHOW TABLES LIKE "'+tableName+'"';
 con.query(sql, function(err, res){
  if (err) throw err;
  if (res.length === 0){
    createCodesTable(tableName);
  } else {
    console.log(tableName + ' already exists');
    process.exit();
  }
 });
}

//-------------------------------------------------------------------------------------------------------------

