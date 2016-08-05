var Search = require('./../js/search.js').searchModule;
var apiKey = require('./../.env').apiKey;


$(document).ready( function() {

  var displayResults = function(user, results) {
    $('#userName').text(user + " has " + results.length + " respositories:");
    $('#showResults').empty();
    console.log(results.avatar_url);
    $('#showPhoto').prepend("<img src='" + results.avatar_url + "'/>");
    results.forEach(function(repo){
      $('#showResults').append("<div class='col-sm-3 each_repo'><div class='li-div'><li><b><a href=" + repo.clone_url + ">" + repo.name +"</a></b></li><ul><li>" + repo.description + "</li><li>" + repo.created_at + "</li></ul></div></div>");
    });
  };

  var displayPhoto = function(photo) {
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
