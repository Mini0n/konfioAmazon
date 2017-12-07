console.log('code0');

const currentTab = 'amazon';
const amazonURL  = '/search';

function setActiveLink(tab){
  $('#links').children().removeClass('active');
  $(event.target).parent().addClass('active');
  currentTab = tab; //just check where we are so we know what to do
}

function search(){
  var val = $('#search-input').val();
  console.log(val);
  if (currentTab === 'amazon'){ searchAmazon(val); } else { searchTable(val); }
}

function searchAmazon(what){
  loading(true);
  $.get(amazonURL+'/'+what, function(data, status){
    console.log(data);
    drawAmazon(data);
    loading(false);
  }); 
}

function loading(loading){
  $('#table-body').html('');
  if (loading){ $('#loading-div').show(); } else { $('#loading-div').hide(); }
}

function drawAmazon(amazonData){
  var tBody = $('#table-body');
  amazonData.forEach(prod => {
    
    // <tr>
    // <td>algo  </td>
    // <td>algo2 </td>
    // <td>algo3 </td>
    // <td>algo4 </td>
    // <td>algo5 </td>
    // <td>algo6 </td>
    // </tr>

    var tr = tBody.append($('tr'));
    console.log(tr);

  });
}

function searchTable(what){

}