(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "7ec433f22eadf23e47c49f490c0cedb851a10eff";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
// var Map = require('./../js/map.js').mapModule;
//
// var displayMap = function() {
//
// };

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

},{"./../js/search.js":2}]},{},[3]);
