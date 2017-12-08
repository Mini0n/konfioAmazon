var dbKonfio = require('./dbConfig'); //DB initialization paramenters and connection object
var con = dbKonfio.con;               //DB connection object

/* -------------------------------------------------------
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
---------------------------------------------------------- */

//write an AmazonProduct object to the DB
function writeProduct(amazonProduct){
  var sql = 'INSERT INTO '+dbKonfio.konfioTable+' '; 
  sql += '(ASIN, DetailPageURL, MediumImage, LargeImage, Title, Studio, Label, ProductTypeName) VALUES ';
  sql += '("'+amazonProduct.ASIN+'", ';
  sql +=  '"'+amazonProduct.DetailPageURL+'", ';
  sql +=  '"'+amazonProduct.MediumImage+'", ';
  sql +=  '"'+amazonProduct.LargeImage+'", ';
  sql +=  '"'+amazonProduct.Title+'", ';
  sql +=  '"'+amazonProduct.Studio+'", ';
  sql +=  '"'+amazonProduct.Label+'", ';
  sql +=  '"'+amazonProduct.ProductTypeName+'" ';
  sql += ')';
  console.log(sql);
  con.query(sql, function(err, res){
    if (err) throw err;
    console.log('Amazon Object has beed added to the table');
  });
}

function deleteProduct(ASIN){
  var sql = 'DELETE FROM '+dbKonfio.konfioTable+' WHERE ASIN = '+ASIN+'"';
  con.query(sql, function(err, res){
    if (err) throw err;
    console.log('Product has been deleted');
  });
}

//read an AmazonProduct by its ASIN
function readProductASIN(ASIN, callback){
  var sql = 'SELECT * FROM '+dbKonfio.konfioTable+' WHERE ASIN = "'+ASIN+'"';
  // console.log(sql);
  con.query(sql, function(err, res, fields){
    if (err) throw err;
    // console.log(res);
    if (res.length < 1) { //an array is returned 
      res = {}; 
    }  else {
      res = res[0];
    }
    // console.log(res);
    callback(res);
  });
}

//read all Amazon Products as an array
function readAllProducts(callback){
  sql = 'SELECT * FROM '+dbKonfio.konfioTable;
  con.query(sql, function(err, res, fields){
    if (err) throw err;
    callback(res);
  });
}

// ASIN            = ASIN[0],
// DetailPageURL   = DetailPageURL[0],
// MediumImage     = MediumImage[0].URL[0],
// LargeImage      = LargeImage[0].URL[0],
// Title           = ItemAttributes[0].Title[0],
// Studio          = ItemAttributes[0].Studio[0],
// Label           = ItemAttributes[0].Label[0],
// ProductTypeName = ItemAttributes[0].ProductTypeName[0]

function compareTwoProducts(prod1, prod2){
  var r = false;
  r = (prod1.ASIN === prod2.ASIN) && (prod1.DetailPageURL === prod2.DetailPageURL);
  r = r && (prod1.MediumImage === prod2.MediumImage) && (prod1.LargeImage && prod2.LargeImage);
  r = r && (prod1.Title === prod2.Title) && (prod1.Studio && prod2.Studio) && (prod1.Label === prod2.Label);
  r = r && (prod1.ProductTypeName === prod2.ProductTypeName);
  r = (r === undefined) ? false : r; //if objects are empty or corrupted
  return r;
}

function checkIfProductExists(ASIN, callback){
  // console.log('checking for: '+ASIN);
  readProductASIN(ASIN, function(res){
    var exists = !(isEmpty(res));
    callback(exists);
  });
}

function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return true;
}

// console.log('checkiiing');
// var r = checkIfProductExists('1518894461', function(res){
//   if (res==true){ console.log('existe') } else { console.log('no existe') }
// });


//Exports
exports.writeProduct = writeProduct;
exports.readProductASIN = readProductASIN;
exports.readAllProducts = readAllProducts;
exports.compareTwoProducts = compareTwoProducts;

