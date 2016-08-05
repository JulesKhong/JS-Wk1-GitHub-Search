(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "7ec433f22eadf23e47c49f490c0cedb851a10eff";

},{}],2:[function(require,module,exports){
// var apiKey ="AIzaSyDzTF4SoosZIatiVL5mqMSBBdRpogR0yJQ";
var apiKey = require('./../.env').apiKey;

function Map() {
}

Map.prototype.initialize = function(address) {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(53.3496, -6.3263);
  var mapOptions =
  {
    zoom: 8,
    center: latlng
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  codeAddress(address);//call the function
}

  function codeAddress(address) {
    geocoder.geocode( {address:address}, function(results, status)
    {
      if (status == google.maps.GeocoderStatus.OK)
      {
        map.setCenter(results[0].geometry.location);//center the map over the result
        //place a marker at the location
        var marker = new google.maps.Marker(
        {
            map: map,
            position: results[0].geometry.location
        });
        callbackFunction(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
     }
    });
  }

  function callbackFunction(location) {
    console.log(location.lat(), location.lng());
  }

Map.prototype.variable = function(input) {
  search = input;
}


Map.prototype.initMap = function initMap() {
  var bikeShop = {lat: 45.558967, lng: -122.6476023};
  var coordinates = {lat: 45.5207049, lng: -122.6795911};
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 8
  });
  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });
  var request = {
    destination: bikeShop,
    origin: coordinates,
    travelMode: 'BICYCLING'
  };
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
};
exports.mapModule = Map;

// lat: 45.5207049, lng: -122.6795911

},{"./../.env":1}],3:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
function Search() {
}

Search.prototype.searchManufacturer = function(user, displayResult) {
  $.get('https://bikeindex.org:443/api/v2/bikes_search/non_stolen?page=1&manufacturer=' + user ).then( function(response) {
    displayResult(manu, response);
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

},{"./../.env":1}],4:[function(require,module,exports){
var Map = require('./../js/map.js').mapModule;

var displayMap = function() {

};

var Search = require('./../js/search.js').searchModule;
var Map = require('./../js/map.js').mapModule;

var displayResults = function(manufacturer, results) {
  console.log(results.bikes);
  $('#showResults').empty();
  results.bikes.forEach(function(bike){
    if (bike.thumb){
      $('#showResults').append("<div class='col-sm-3 each_bike'><img src=" + bike.thumb + "><div class='li-div'><li>" + bike.title +"</li></div></div>");
    }
    $('#searchCriteria').text("Bikes made by " + manufacturer + ":");
  });
};

var displayStolen = function(zip, radius, results) {
  $('#showResults').empty();
  results.bikes.forEach(function(bike) {
    if (bike.thumb){
      $('#showResults').append("<div class='col-sm-3 each_bike'><img src=" + bike.thumb + "><div class='li-div'><li>" + bike.title +"</li></div></div>");
    }
    $('#searchCriteria').text('There are  ' + results.bikes.length + ' bikes stolen within ' + radius + ' miles of the zipcode ' + zip + '.');
  });
};

// var displayNext = function() {
//   $('#showResults').empty();
//   results.bikes.forEach(function(bike) {
//     if (bike.thumb){
//       $('#showResults').append("<div class='col-sm-3 each_bike'><img src=" + bike.thumb + "><div class='li-div'><li>" + bike.title +"</li></div></div>");
//     }
//   });
// };

$(document).ready( function() {

  var newMap = new Map();
  newMap.initMap();
  $('#search-man').submit( function(event) {
    event.preventDefault();
    newSearch = new Search();
    var manu = $('#manufacturer').val();
    newSearch.searchManufacturer(manu, displayResults);
    $('#map').append(newMap);
  });

  $('#search-location').submit(function(event){
    event.preventDefault();
    var search = $('#current-location').val();
    // var newMap = new Map();
    newMap.initialize(search);
  });

  $('#search_stolen').submit( function(event) {
    event.preventDefault();
    newArea = new Search();
    var radius = parseInt($('#radius').val());
    var zip = parseInt($('#zip').val());
    newArea.searchStolen(zip, radius, displayStolen);
    $('#next').show();
    $('#next').click(function(event){
      $('#previous').show();
      event.preventDefault();
      newSearch = new Search();
      newSearch.searchNext(zip, radius, displayStolen);
    });
    $('#previous').click(function(event){
      event.preventDefault();
      newSearch = new Search();
      newSearch.searchPrevious(zip, radius, displayStolen);
    });
  });
});

},{"./../js/map.js":2,"./../js/search.js":3}]},{},[4]);
