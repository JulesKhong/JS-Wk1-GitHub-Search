var apiKey = require('./../.env').apiKey;
function Search() {
}

Search.prototype.search = function(user, displayResults) {
  $.get('https://api.github.com/users/' + user + '?access_token=' + apiKey ).then( function(response) {
    console.log(response);
    console.log(displayResults);
    getRepoInfo(user, displayResults, response.repos_url);
  }).fail(function(error) {
    $('#showResults').text(error.responseJSON.message);
  });
};

function getRepoInfo(user, displayResults, repoLink) {
  $.get(repoLink).then(function(response) {
    console.log(response);
    displayResults(user, response);
  }).fail(function(error) {
    $('#showResults').text(error.responseJSON.message);
  });
}


exports.searchModule = Search;
