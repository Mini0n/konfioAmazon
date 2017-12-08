console.log('code0');

const amazonURL  = '/API/search';
const catalogURL = '/API/detail';
const removePURL = '/API/remove';
const addProdURL = '/API/add';

//some global var to make all smoother
var currentTab = 'amazon';
var lastAmazonSearch  = 'shoegaze';
var lastCatalogSearch = '';
var tempAmazonOArray = [];  //temporal Amazon Objects Arrays
var tempCatalogArray = [];  //temporal Catalog Arrays

function setActiveLink(tab){
  $('#links').children().removeClass('active');
  $('#'+tab).parent().addClass('active');
  currentTab = tab; //just check where we are so we know what to do
  setTab(currentTab);
}

function setTab(currentTab){
  var val = $('#search-input');
  if (String(currentTab) === 'catalog'){
    val.val(lastCatalogSearch);
    loadCatalog();
  } else {
    val.val(lastAmazonSearch);
    searchAmazon(lastAmazonSearch);
  }
}

function search(){
  var val = $('#search-input').val();
  if (String(currentTab) === 'amazon'){
    searchAmazon(val); 
  } else { 
    searchTable(val); 
  }
}

function searchAmazon(what){
  loading(true);
  lastAmazonSearch = what;
  $.get(amazonURL+'/'+what, function(data, status){
    loading(false);
    tempAmazonOArray = data;
    drawProduct(data);
  }); 
}

function loadCatalog(callback){
  loading(true);
  $.get(catalogURL, function(data, status){
    loading(false);
    tempCatalogArray = data;
    drawProduct(data);
    search();
    if (callback !== undefined){ callback(); }
  });
}

function loading(loading){
  $('#table-body').html('');
  if (loading){ $('#loading-div').show(); } else { $('#loading-div').hide(); }
  // showAlert('L o a d i n g . . .');
}

function drawProduct(amazonData){
  var saveBtn = '<div id="saveBtnDiv"><button type="button" class="btn table-dark" onclick="prodBtn(this)"> + </button></div>';
  var deleBtn = '<div id="saveBtnDiv"><button type="button" class="btn table-dark" onclick="prodBtn(this)"> - </button></div>'  
  var tBody = $('#table-body');
  amazonData.forEach((prod) => {    
    var tr = tBody.append('<tr id="prod-'+prod.ASIN+'" ondblclick="rowDblClick(this)"></tr> ').children().last();
    tr.append('<td><img src="'+prod.MediumImage+'" alt="[]" height="42" width="42" class="item-img"></td>');
    tr.append('<td>'+prod.ASIN+'</td> ');
    if (String(currentTab)==='amazon'){
      tr.append('<td>'+saveBtn+prod.Title+'</td> ');
    } else {
      tr.append('<td>'+deleBtn+prod.Title+'</td> ');
    }
    tr.append('<td>'+prod.Label+'</td> ');
    tr.append('<td>'+prod.ProductTypeName+'</td> ');
    tr.append('<td><a href="'+prod.DetailPageURL+'" target="_blank">Amazon</a></td> ');
  });
}

function searchTable(what){
  lastCatalogSearch = what;
  var catalog = $('#table-body').children();
  catalog.each((ind, el) => {
    var str = $(el).text().replace('@Amazon','').toLowerCase();
    if (str.includes(what.toLowerCase())){ $(el).show(); } else { $(el).hide(); }  
  });

}

function rowDblClick(row){
  // console.dlog(row);
  var product = null;
  var ASIN = $(row).attr('id').replace('prod-','');
  
  if (String(currentTab) === 'amazon'){
    product = searchAmazonObject(ASIN);
  } else {
    product = searchCatalogObject(ASIN);
  }
  showProductDetails(product);
}

function detsDblClick(){
  var detLay = $('#details-div-overlay').fadeOut('slow');
  var detDiv = $('#details-div').fadeOut('slow');
}

function showProductDetails(product){
  var detDiv = $('#details-div');
  if (product === null){
    showAlert('Product NOT FOUND. Check ASIN.');
  } else {
    fillDetails(product);
    var detLay = $('#details-div-overlay').fadeIn('slow');
    var detDiv = $('#details-div').fadeIn('slow');
  }
}

function fillDetails(product){
  var img = $('#foto-div').css('background-image','url('+product.LargeImage+')');
  var details = $('#info-div');
  details.html('');
  details.append('<p><a href="'+product.DetailPageURL+'" target="_blank">'+product.ASIN+'</a>&nbsp;&nbsp;['+product.ProductTypeName+']</p>');
  details.append('<p class="label-p">Title</p>');
  details.append('<p>'+product.Title+'</p>');
  details.append('<p class="label-p">Studio</p>');
  details.append('<p>'+product.Studio+'</p>');
  details.append('<p class="label-p">Label</p>');
  details.append('<p>'+product.Label+'</p>');
  var button = $('#detailButton');
  if (String(currentTab) === 'amazon'){
    button.text('Save');
  } else { 
    button.text('Remove'); 
  }
  button.attr('onclick','detailButtonClick(\''+product.ASIN+'\')');
}

function prodBtn(prod){
  var ANSI = $(prod).parent().parent().parent()[0].id.replace('prod-','');
  if (currentTab === 'amazon'){ 
    addProd(ANSI); 
  } else {0
    delProd(ANSI);
  }
}

function addProd(ANSI){
  console.log('adding '+ANSI);
  $.get(addProdURL+'/'+ANSI, function(data, status){
    // console.log('added');
    showAlert('Product Added to your Catalog');
  });  
}

function delProd(ANSI){
  console.log('removing '+ANSI);
  loading(true);
  $.get(removePURL+'/'+ANSI, function(data, status){
    showAlert('Product Removed from your Catalog');
    loadCatalog();
  });
}

function showAlert(alertText){
  var alert = $('#alert-div');
  $(alert).text(alertText);
  $(alert).fadeIn(1000).fadeOut(2000);
}

function searchAmazonObject(ASIN){
  var res = null;
  tempAmazonOArray.forEach((prod) => {
    if (String(prod.ASIN) === String(ASIN)){ res = prod; }
  });
  return res;
}

function searchCatalogObject(ASIN){
  var res = null;
  tempCatalogArray.forEach((prod) => {
    if (String(prod.ASIN) === String(ASIN)){ res = prod; }
  });
  return res;
}

function detailButtonClick(ASIN){
  if (ASIN === undefined){ detsDblClick(); }
  if (String(currentTab) === 'amazon'){ 
    addProd(ASIN);
  } else {0
    delProd(ASIN);
  }
  detsDblClick();
}

function loadURL(){
  var url = new URL(window.location.href);
  var tab = url.searchParams.get('t'); //get tab paramenter
  var pro = url.searchParams.get('p'); //get product paramenter
  
  currentTab = (String(tab) === 'catalog') ? String(tab) : currentTab;
  setActiveLink(currentTab);
  if ((pro !== null) && (pro != '')){
    loadCatalog(function(){
      product = searchCatalogObject(pro);
      showProductDetails(product);
    });
  }

}

loadURL();
