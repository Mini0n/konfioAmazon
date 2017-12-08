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
  // $(event.target).parent().addClass('active');
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
    // console.log('búsqueda Amazon');
    searchAmazon(val); 
  } else { 
    // console.log('búsqueda Catalogo');
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

function loadCatalog(){
  loading(true);
  $.get(catalogURL, function(data, status){
    loading(false);
    tempCatalogArray = data;
    drawProduct(data);
    search();
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
    var tr = tBody.append('<tr id="prod-'+prod.ASIN+'" ondblclick="rowdblClick(this)"></tr> ').children().last();
    tr.append('<td><img src="'+prod.MediumImage+'" alt="[]" height="42" width="42" class="item-img"></td>');
    tr.append('<td>'+prod.ASIN+'</td> ');
    if (String(currentTab)==='amazon'){
      tr.append('<td>'+saveBtn+prod.Title+'</td> ');
    } else {
      tr.append('<td>'+deleBtn+prod.Title+'</td> ');
    }
    tr.append('<td>'+prod.Label+'</td> ');
    tr.append('<td>'+prod.ProductTypeName+'</td> ');
    tr.append('<td><a href="'+prod.DetailPageURL+'" target="_blank">@Amazon</a></td> ');
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

function rowdblClick(row){
  // console.dlog(row);
  var product = null;
  var ASIN = $(row).attr('id').replace('prod-','');

  
  if (String(currentTab) === 'amazon'){ 
    product = searchAmazonObject(ASIN);
    showAmazonDetails(product);
  } else { 
    product = searchCatalogObject(ASIN);
    showCatalogDetails(product); 
  }

  var detDiv = $('#details-div').fadeIn('slow');
  
}

function detsdblClick(){
  var detDiv = $('#details-div').fadeOut('slow');
}

function showAmazonDetails(product){
  var detDiv = $('#details-div');
  $(detDiv).text(JSON.stringify(product));
}

function showCatalogDetails(product){
  var detDiv = $('#details-div');
  $(detDiv).text(JSON.stringify(product));
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
  tempAmazonOArray.forEach((prod) => {
    if (String(prod.ASIN) === String(ASIN)){ res = prod; }
  });
  return res;
}

// currentTab = 'catalog';
var url = new URL(window.location.href);
var tab = url.searchParams.get('t');
currentTab = (String(tab) === 'catalog') ? String(tab) : currentTab;

$('#'+currentTab).click();