var Search = require('./../js/search.js').searchModule;


$(document).ready( function() {

  var newSearch = new Search();
  $('#search-form').submit( function(event) {
    event.preventDefault();
    var user = $('#username').val();
    newSearch.search(user, displayResults);
  });

    $('#previous').click(function(event){
      event.preventDefault();
      newSearch.searchPrevious(zip, radius, displayStolen);
    });
  });
});





var displayResults = function(user, results) {
  console.log(results.user);
  $('#showResults').empty();
  results.user.forEach(function(bike){
    if (user.thumb){
      $('#showResults').append("<div class='col-sm-3 each_bike'><img src=" + user.thumb + "><div class='li-div'><li>" + user.title +"</li></div></div>");
    }
    $('#searchCriteria').text("Bikes made by " + manufacturer + ":");
  });
};
//
user
