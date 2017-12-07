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


function writeProduct(amazonProduct){
 //
}

// var employees = null;
// function getEmployees(){
//   con.query("SELECT * FROM Employees", function (err, res, fields) {
//     if (err) throw err;
//     employees = res;
//   });
// }
// //-------------------------------------------------------------------------------------------------------------
// function preTxt(txt){
//   return '<pre>'+txt+'</pre>';
// }

// function readEmployees(req, res){
//   getEmployees();
//   var r = '';
//   var timer = setTimeout(function(){
//     clearTimeout(timer);
//     // console.log(employees);
//     employees.forEach(el => {
//       var s = el.name + ' | ' + el.position + ' | ' + el.mail + '<br>';
//       r += s;
//     });
//     res.send(r);
//   },1000);
// }
