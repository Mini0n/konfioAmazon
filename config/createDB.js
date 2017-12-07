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
CREATE TABLE `Intelisis`. 
  ( `id` INT NOT NULL AUTO_INCREMENT , 
    `code` VARCHAR NOT NULL , 
    `used` BOOLEAN NOT NULL DEFAULT FALSE , 
    `created` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP , 
     PRIMARY KEY (`id`)) 
    ENGINE = InnoDB;

    ASIN[0], 
    DetailPageURL[0], 
    MediumImage[0].URL, 
    LargeImage[0].URL, 
    ItemAttributes.Title
    ItemAttributes.Studio
    ItemAttributes.ProductTypeName
    ItemAttributes.Label 
---------------------------------------------------------- */
function createCodesTable(tableName){
 var sql = '';
 sql += 'CREATE TABLE '+tableName+' '; 
 sql += '(id INT NOT NULL AUTO_INCREMENT,';
 sql += 'code VARCHAR(20) NOT NULL,';
 sql += 'used BOOLEAN NOT NULL DEFAULT FALSE,';
 sql += 'created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,';
 sql += ' PRIMARY KEY (`id`))';
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

