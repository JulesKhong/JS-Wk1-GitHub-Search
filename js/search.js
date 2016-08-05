var apiKey = require('./../.env').apiKey;
function Search() {
}

Search.prototype.search = function(user, displayResult) {
  $.get('https://api.github.com/users/' + user + '?access_token=' + apiKey ).then( function(response) {
    console.log(response);
    displayResult(user, response);
  }).fail(function(error) {
    $('#showResults').text(error.responseJSON.message);
  });
};

// Search.prototype.searchNext = function(zip, radius, displayStolen) {
//   page += 1;
//   $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page='+ page +'&per_page=25&proximity= '+ zip +'&proximity_square=' + radius).then( function(response) {
//     displayStolen(zip, radius, response);
//   }).fail(function(error) {
//     $('#showResults').text(error.responseJSON.message);
//   });
// };
// Search.prototype.searchPrevious = function(zip, radius, displayStolen) {
//   page -= 1;
//   $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page='+ page +'&per_page=25&proximity= '+ zip +'&proximity_square=' + radius).then( function(response) {
//     displayStolen(zip, radius, response);
//   }).fail(function(error) {
//     $('#showResults').text(error.responseJSON.message);
//   });
// };

exports.searchModule = Search;
