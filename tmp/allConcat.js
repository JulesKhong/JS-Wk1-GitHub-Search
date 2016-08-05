var Map = require('./../js/map.js').mapModule;

var displayMap = function() {

};

var Search = require('./../js/search.js').searchModule;

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

$(document).ready( function() {

  var newSearch = new Search();
  $('#search-man').submit( function(event) {
    event.preventDefault();
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

    $('#previous').click(function(event){
      event.preventDefault();
      newSearch.searchPrevious(zip, radius, displayStolen);
    });
  });
});
