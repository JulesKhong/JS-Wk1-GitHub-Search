(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "7ec433f22eadf23e47c49f490c0cedb851a10eff";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
function Search() {
}

Search.prototype.search = function(user, displayResults) {
  $.get('https://api.github.com/users/' + user + '?access_token=' + apiKey ).then( function(response) {
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

},{"./../.env":1,"./../js/search.js":2}]},{},[3]);
