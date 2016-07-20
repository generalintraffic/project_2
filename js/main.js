
L.mapbox.accessToken = 'pk.eyJ1IjoiamF2aWVyMyIsImEiOiJjaXFzcDYzZHowMnhnZm5ubndxdWo0anJoIn0.3ANHMEByhAl7OFnMlwwSrA';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38.9, -77], 12);

init();
var fixedMarker, count = true, x = true;

function init(){
	
	map.on('click', function(ev) {
		var coord= [];
			if (count == true && x== true) {
				coord = [ev.latlng.lat, ev.latlng.lng];
				console.log(coord);
				coordinates(coord);
				count = false;
			}
			else if ( count == false && x== true ) {
				map.removeLayer(fixedMarker)
				coord = [ev.latlng.lat, ev.latlng.lng];
				coordinates(coord);
				console.log(coord);
				
			}
	});
};

function coordinates(coord){
	var coord = coord;
	console.log('coord ' + coord);
	fixedMarker = L.marker(new L.LatLng(coord[0],coord[1]), {
		icon: L.mapbox.marker.icon({
		  'marker-color': 'ff8888'
		})
	}).bindPopup('Mapbox DC').addTo(map);
	return fixedMarker;
};

function myFunction() {
	
	
	if (confirm("Do you wish to continue?") == true) {
		text();
		x = false;
	} else {
		init();

	}

}

function text(){
	console.log(fixedMarker);
	var fc = fixedMarker.getLatLng();
	// Create a featureLayer that will hold a marker and linestring.
	var featureLayer = L.mapbox.featureLayer().addTo(map);
	console.log(fc);
	end(fc, featureLayer);
};

function end(fc,featureLayer){
	console.log(fc + ' ' + featureLayer);
	map.on('click', function(ev) {
    // ev.latlng gives us the coordinates of
    // the spot clicked on the map.

    var c = ev.latlng;
    console.log(c);
    var geojson = [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [c.lng, c.lat]

        },
        "properties": {
          "marker-color": "#ff8888"
        }
      }, {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [fc.lng, fc.lat],
            [c.lng, c.lat]
          ]
        },
        "properties": {
          "stroke": "#000",
          "stroke-opacity": 0.5,
          "stroke-width": 4
        }
      }
    ];

    featureLayer.setGeoJSON(geojson);

    // Finally, print the distance between these two points
    // on the screen using distanceTo().
    var container = document.getElementById('distance');
    container.innerHTML = (fc.distanceTo(c)).toFixed(0) + 'm';
});

};