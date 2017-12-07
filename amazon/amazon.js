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
function createAmazonProduct(amazonProductResponse){
  // console.log(amazonProductResponse);
  var aR = amazonProductResponse; //changed for shorter code, left parameter name for Intelisis
  var aP = {}; //Empty object
  aP.ASIN            = (aR.ASIN                              === undefined) ? 'N/A' : aR.ASIN[0];
  aP.DetailPageURL   = (aR.DetailPageURL                     === undefined) ? 'N/A' : aR.DetailPageURL[0];
  aP.MediumImage     = (aR.MediumImage[0].URL                === undefined) ? 'N/A' : aR.MediumImage[0].URL[0];
  aP.LargeImage      = (aR.LargeImage[0].URL                 === undefined) ? 'N/A' : aR.LargeImage[0].URL[0];
  aP.Title           = (aR.ItemAttributes[0].Title           === undefined) ? 'N/A' : aR.ItemAttributes[0].Title[0];
  aP.Studio          = (aR.ItemAttributes[0].Studio          === undefined) ? 'N/A' : aR.ItemAttributes[0].Studio[0];
  aP.Label           = (aR.ItemAttributes[0].Label           === undefined) ? 'N/A' : aR.ItemAttributes[0].Label[0];
  aP.ProductTypeName = (aR.ItemAttributes[0].ProductTypeName === undefined) ? 'N/A' : aR.ItemAttributes[0].ProductTypeName[0];
  return aP;
}

function generateAmazonProductsObjects(amazonResults){
  var tempo = [];
  if (Object.prototype.toString.call(amazonResults) === '[object Array]'){ 
    amazonResults.forEach(prod => {
      tempo.push(createAmazonProduct(prod));
    });
  }
  return tempo;
}

//execute searchQuery object through itemSearch API
function doSearchKeywords(keywords, callback, callbackParams){
  searchQuery.keywords = keywords;  
  client.itemSearch(searchQuery, function(err, results, response) {
    if (err) {
      console.log('error');
      console.log(err);
      // console.log(err[0].Error);
    } else {
      // console.log(results);  // products (Array of Object) 
      // console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.) 
      // logInfo(results);
      var amazonObjects = generateAmazonProductsObjects(results);
      // if (Object.prototype.toString.call(callbackParams) === '[object Array]'){
      //   callbackParams.unshift(amazonObjects);
      // } else {
      //   callbackParams = [amazonObjects];  
      // }
      // callback.apply(null, callbackParams);
      callback(amazonObjects);
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