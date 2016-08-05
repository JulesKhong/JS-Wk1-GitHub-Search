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

var displayResults = function(user, results) {
  $('#userName').text(user + "'s respositories:");
  console.log(user.avatar_url);
  $('#results').append('<img src=' + user.avatar_url + '>')
  $('#showResults').empty();
  // results.user.forEach(function(bike){
  //   if (user.thumb){
  //     $('#showResults').append("<div class='col-sm-3 each_bike'><img src=" + user.thumb + "><div class='li-div'><li>" + user.title +"</li></div></div>");
  //   }
    $('#searchCriteria').text(user);
  // });
};

// var displayStolen = function(zip, radius, results) {
//   $('#showResults').empty();
//   results.bikes.forEach(function(bike) {
//     if (bike.thumb){
//       $('#showResults').append("<div class='col-sm-3 each_bike'><img src=" + bike.thumb + "><div class='li-div'><li>" + bike.title +"</li></div></div>");
//     }
//     $('#searchCriteria').text('There are  ' + results.bikes.length + ' bikes stolen within ' + radius + ' miles of the zipcode ' + zip + '.');
//   });
// };
