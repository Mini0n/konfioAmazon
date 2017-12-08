//amazon require
var amazon  = new require('./amazon/amazon');
var express = require('express');
var dbUse   = require('./db/dbUse');

const front = __dirname +'/front/';

var app = express();

app.get('/', function(req, res){
  res.sendFile(front+'index.html');
});

app.get('/search', function(req, res){
  res.sendFile(front+'search.html');
});

app.get('/detail', function(req, res){
  res.sendFile(front+'detail.html');
});

app.get('/list', function(req, res){
  // res.sendFile(front+'search.html');
  res.redirect('/search?t=catalog');
});

var searchResults = null;
app.get('/API/search/:keywords', function(req, res){
  searchResults = null;
  // amazon.doSearch(req.params.keywords, returnResultsJSON, [res]);
  amazon.doSearch(req.params.keywords, (results) => { res.json(results) } );
});

app.get('/API/detail', function(req, res){
  // res.sendFile(front+'detail.html');
  dbUse.readAllProducts((results) => { res.json(results) });
});


app.get('/API/detail/:ASIN', function(req, res){
  dbUse.readProductASIN(req.params.ASIN, (results) => { res.json(results) } );
});


//--- statics ----
app.use("/front", express.static(__dirname + '/front'));


app.listen(8000);
console.log('server starded');

function returnResultsJSON(results, res){
  // console.log(results);
  searchResults = results;
  // dbUse.writeProduct(results[0]);
  res.json(results);
}





// amazon.doSearch('chamoy', logInfo);


