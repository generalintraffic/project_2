
L.mapbox.accessToken = 'pk.eyJ1IjoiamF2aWVyMyIsImEiOiJjaXFzcDYzZHowMnhnZm5ubndxdWo0anJoIn0.3ANHMEByhAl7OFnMlwwSrA';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38.9, -77], 12);

init();
var fixedMarker, count = true;

function init(){
	
	map.on('click', function(ev) {
		var coord= [];
			if (count == true) {
				coord = [ev.latlng.lat, ev.latlng.lng];
				console.log(coord);
				coordinates(coord);
				count = false;
			}
			else if ( count == false ) {
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
	var x;
	if (confirm("Do you wish to continue?") == true) {
		text();
	
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
	end(fc);
};

