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

var searchResults = null;
app.get('/search/:keywords', function(req, res){
  searchResults = null;
  amazon.doSearch(req.params.keywords, returnResultsJSON, [res]);
});

app.get('/list', function(req, res){
  res.sendFile(front+'list.html');
});

app.get('/detail', function(req, res){
  res.sendFile(front+'detail.html');
});

app.listen(8000);
console.log('server starded');

function returnResultsJSON(results, res){
  searchResults = results;
  // dbUse.writeProduct(results[0]);
  res.json(results);
}






// amazon.doSearch('chamoy', logInfo);


