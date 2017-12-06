console.log('amazon itemSearch');
//amazon-product-api package from npm 
var amazon = require('amazon-product-api');

//amazon client with my ID settings
var client = amazon.createClient({
  awsId: "AKIAJ3F7FX3TCJMIXP7Q",
  awsSecret: "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",
  awsTag: "konfiotest-20"
});

//searchQuery object
var searchQuery = {
  keywords: 'fpga', //default value
  responseGroup: 'ItemAttributes,Images',
  domain: 'webservices.amazon.com.mx'
}

//execute searchQuery object through itemSearch API
function doSearchKeywords(keywords, callback, callbackParams){
  searchQuery.keywords = keywords;  
  client.itemSearch(searchQuery, function(err, results, response) {
    if (err) {
      console.log('error');
      console.log(err);
      console.log(err[0].Error);
    } else {
      // console.log(results);  // products (Array of Object) 
      // console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.) 
      // logInfo(results);
      if (callbackParams !== undefined){
        if (Object.prototype.toString.call(callbackParams) === '[object Array]'){
          callbackParams.unshift(results);
        } else {
          callbackParams = [results];  
        }
      } else {
        callbackParams = [results];
      }
      // console.log('last callbackParams ------');
      // console.log(callbackParams);
      // console.log('--------------------------');
      callback.apply(null, callbackParams);
    }
  });
}

function logInfo(info){
  info.forEach((prod, i) => {
    console.log(i + ' ASIN: '+prod.ASIN);
  });
}



//Simple search function to be exported
var doSearch = function(keywords, callback, callbackParams){
  doSearchKeywords(keywords, callback, callbackParams);
};


exports.doSearch = doSearch;