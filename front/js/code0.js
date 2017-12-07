console.log('code0');

const amazonURL  = '/search';
const catalogURL = '/detail';

//some global var to make all smoother
var currentTab = 'amazon';
var lastAmazonSearch  = 'shoegaze';
var lastCatalogSearch = '';

function setActiveLink(tab){
  $('#links').children().removeClass('active');
  $(event.target).parent().addClass('active');
  currentTab = tab; //just check where we are so we know what to do
  setTab(currentTab);
}

function setTab(currentTab){
  if (currentTab === 'catalog'){
    loadCatalog();
  } else {
    searchAmazon(lastAmazonSearch);
  }
}

function search(){
  var val = $('#search-input').val();
  if (currentTab === 'amazon'){ searchAmazon(val); } else { searchTable(val); }
}

function searchAmazon(what){
  loading(true);
  lastAmazonSearch = what;
  $.get(amazonURL+'/'+what, function(data, status){
    loading(false);
    drawProduct(data);
  }); 
}

function loadCatalog(){
  loading(true);
  $.get(catalogURL, function(data, status){
    loading(false);
    drawProduct(data);
  });
}

function loading(loading){
  $('#table-body').html('');
  if (loading){ $('#loading-div').show(); } else { $('#loading-div').hide(); }
}

function drawProduct(amazonData){
  var tBody = $('#table-body');
  amazonData.forEach((prod) => {    
    var tr = tBody.append('<tr id="prod-'+prod.ASIN+'"></tr> ').children().last();
    tr.append('<td><img src="'+prod.MediumImage+'" alt="[]" height="42" width="42"></td>');
    tr.append('<td>'+prod.ASIN+'</td> ');
    tr.append('<td>'+prod.Title+'</td> ');
    tr.append('<td>'+prod.Label+'</td> ');
    tr.append('<td>'+prod.ProductTypeName+'</td> ');
    tr.append('<td><a href="'+prod.DetailPageURL+'" target="_blank">@Amazon</a></td> ');
  });
}

function searchTable(what){
  var catalog = $('#table-body').children();
  catalog.each((ind, el) => {
    var str = $(el).text().replace('@Amazon','').toLowerCase();
    if (str.includes(what.toLowerCase())){ $(el).show(); } else { $(el).hide(); }  
  });

}

currentTab = 'catalog';
setTab(currentTab);