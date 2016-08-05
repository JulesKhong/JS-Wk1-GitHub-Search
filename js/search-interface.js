var Search = require('./../js/search.js').searchModule;


$(document).ready( function() {

  var displayResults = function(user, results) {
    $('#userName').text(user + "'s respositories:");
    $('#results').append('<img src=' + user.avatar_url + '>');
    $('#showResults').empty();
    $('#searchNumber').text(results.length);
    results.forEach(function(repo){
      $('#showResults').append("<div class='col-sm-3 each_repo'><div class='li-div'><li>" + repo.name +"</li></div></div>");
      console.log(repo.description);
      console.log(repo.created_at);
    });
  };

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
