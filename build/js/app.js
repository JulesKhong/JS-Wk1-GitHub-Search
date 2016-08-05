(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "7ec433f22eadf23e47c49f490c0cedb851a10eff";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
// var Map = require('./../js/map.js').mapModule;
//
// var displayMap = function() {
//
// };

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

},{"./../js/search.js":2}]},{},[3]);
