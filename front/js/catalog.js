var catsURL = 'http://localhost:3000/catalogs/';
var catalogsArray = null;
var catalogItem = null;
var everythingArray = null;


function getEverything(){
  $.get(catsURL, function(data, status){
    everythingArray = data;
    console.log('getEverything');
    console.log(data);
    everythingArray.forEach(cat => {
      getAreasEverything(cat.id, cat);
    });
  });  
}

function getCatalogs(){
  $.get(catsURL, function(data, status){
    catalogsArray = data;
  });
}

function getCatalog(id){
  $.get(catsURL+id, function(data, status){
    catalogItem = data;
  });
}

function createCatalog(name){
  $.post(catsURL,
    { name: ''+name },
  function(data, status){
      console.log(data);
      console.log(status);
  }); 
}

function updateCatalog(id, newName){
  $.ajax({
    url: catsURL + id,
    type: 'PUT',
    data: { name: newName },
    success: function(result) {
      console.log('catalog '+id+' updated');
    },
    error: function(result){
      console.log('algo no funcionó');
    }
  });
}


function deleteCatalog(id){
  $.ajax({
    url: catsURL + id,
    type: 'DELETE',
    success: function(result) {
      console.log('catalog '+id+' deleted');
    }
  });
}

// getCatalogs();

// getCatalogs();
// getCatalog(1);
// createCatalog('Pupe');
// deleteCatalog(8);
// updateCatalog(7, 'new Catalog');