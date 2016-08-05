var Search = require('./../js/search.js').searchModule;


$(document).ready( function() {

  var displayResults = function(user, results) {
    console.log(results);
    $('#userName').text(user);
    $('#userRepo').text(user + " has " + results.length + " respositories available:");
    $('#showResults').empty();
    var counter = 0;
    results.forEach(function(repo){
      $('#counter').text(counter += 1);
      $('#showResults').append("<div class='col-sm-3 each_repo'><div id='counter'>" + counter + "</div><div class='li-div'><li><b><a href=" + repo.clone_url + ">" + repo.name +"</a></b></li><ul><li>" + repo.description + "</li><li>" + repo.created_at + "</li></ul></div></div>");
    });
    counter = 0;
  };

  var displayPhoto = function(photoUrl) {
    $('#showPhoto').empty();
    $('#showPhoto').prepend("<img src='" + photoUrl + "'/>");
  };

  var newSearch = new Search();
  $('#search-form').submit( function(event) {
    event.preventDefault();
    var user = $('#username').val();
    newSearch.search(user, displayPhoto, displayResults);
  });

  $('#previous').click(function(event){
    event.preventDefault();
    newSearch.searchPrevious(zip, radius, displayStolen);
  });
});
