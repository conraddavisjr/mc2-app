// AJAX_JSON_Req('hosts.json').done(function (q) {
//   vinilla js req, save for later imp. no jquery
// });
var classrooms;

$.getJSON( 'hosts.json', function() {
}).done(function(data) {
  buildMap(data.classrooms);
})

function buildMap(classrooms){

  var style = null;
  var markerClusterer = null;
  var map = null;

  var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&' +
      'chco=FFFFFF,008CFF,000000&ext=.png';

  function refreshMap() {
    if (markerClusterer) {
      markerClusterer.clearMarkers();
    }

    var markers = [];

    var markerImage = new google.maps.MarkerImage(imageUrl,
      new google.maps.Size(24, 32));
    for (var i = 0; i < classrooms.length; ++i) {
      console.log('classrooms i: ', classrooms[i].latitude);
      var latLng = new google.maps.LatLng(classrooms[i].latitude,
          classrooms[i].longitude)
      var marker = new google.maps.Marker({
        position: latLng,
        draggable: false,
        icon: markerImage
      });
      markers.push(marker);
    }

    zoom = 15
    size = 80
    markerClusterer = new MarkerClusterer(map, markers, {
      maxZoom: zoom,
      gridSize: size,
      imagePath: 'images/m'
    });
  }

  function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(37.779422, -122.410748),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    refreshMap();
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    })
  }

  function clearClusters(e) {
    e.preventDefault();
    e.stopPropagation();
    markerClusterer.clearMarkers();
  }

  google.maps.event.addDomListener(window, 'load', initialize);
}