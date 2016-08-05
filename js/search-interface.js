var Search = require('./../js/search.js').searchModule;

$(document).ready( function() {

  var displayResults = function(user, results) {
    $('#userName').text(user);
    $('#userRepo').text(user + " has " + results.length + " respositories available:");
    $('#showResults').empty();
    var counter = 0;
    results.forEach(function(repo){
      $('#counter').text(counter += 1);
      if(repo.description){
        $('#showResults').append("<div class='col-sm-3 each_repo'><div id='counter'>" + counter + "</div><div class='li-div'><li><b><a href=" + repo.clone_url + ">" + repo.name.toLowerCase() +"</a></b></li><li>" + repo.description + "</li><hr><li>Created:<br><em>" + moment(repo.created_at).format("MMMM Do, YYYY") + "</em></li></div></div>");
      } else {
          $('#showResults').append("<div class='col-sm-3 each_repo'><div id='counter'>" + counter + "</div><div class='li-div'><li><b><a href=" + repo.clone_url + ">" + repo.name.toLowerCase() +"</a></b></li><li>A development exercise</li><hr><li>Created:<br><em>" + moment(repo.created_at).format("MMMM Do, YYYY") + "</em></li></div></div>");
        }
    });
    counter = 0;
  };

  var displayPhoto = function(photoUrl) {
    $('#showPhoto').empty();
    $('#showPhoto').prepend("<img src='" + photoUrl + "'/>");
  };

  var newSearch = new Search();
  $('#search-form').submit( function(event) {
    $('#banner').hide();
    event.preventDefault();
    var user = $('#username').val();
    newSearch.search(user, displayPhoto, displayResults);
  });

  $('#refresh').click(function(event){
    location.reload();
  });

});
