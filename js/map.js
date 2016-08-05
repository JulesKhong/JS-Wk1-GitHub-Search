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
