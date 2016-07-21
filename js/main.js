
L.mapbox.accessToken = 'pk.eyJ1IjoiamF2aWVyMyIsImEiOiJjaXFzcDYzZHowMnhnZm5ubndxdWo0anJoIn0.3ANHMEByhAl7OFnMlwwSrA';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([10.488824641652126,-66.87480926513672], 14);
var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	layer = new L.TileLayer(tileUrl,
		{
		    attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
		    maxZoom: 18
		});
map.addLayer(layer);


init();
var c, fixedMarker, count = true, x = true;

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
				map.removeLayer(fixedCircle)
				coord = [ev.latlng.lat, ev.latlng.lng];
				coordinates(coord);
				console.log(coord);
				
			}
	});
};

function coordinates(coord){
	console.log('coord ' + coord);
	fixedMarker = L.marker(new L.LatLng(coord[0],coord[1]), {
		icon: L.mapbox.marker.icon({
		  'marker-color': 'ff8888'
		})
	}).bindPopup('Punto de Origen').addTo(map);
	fixedCircle = L.circle(coord, 300).addTo(map)
	return fixedMarker;
};

function myFunction() {
	
	
	if (confirm("¿Desea confirmar el punto actual?") == true) {
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
	destination(fc, featureLayer);
};

function destination(fc,featureLayer){
	console.log(fc + ' ' + featureLayer);
	
		map.on('click', function(ev) {
	    // ev.latlng gives us the coordinates of
	    // the spot clicked on the map.

	    c = ev.latlng;
	    
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
	    end(fc,geojson);
	});

};

function end(fc,geojson){

  if (!count){
	  $("#button-wrapper").append(
	        $('<button>',{id:"input",type:"button"}).html('Final Destination').click(function(){
		       		if (confirm("Do you wish to continue?") == true) {
								movie(fc);
								map.removeAttribute("onclick");
								
							} else {
								end();

							}
	       	})
	        );
	  count=true;
	}
};

function movie(fc){
	// var fc = fc;
	// var c = c;
	console.log(fc.lng+" "+fc.lat);
	console.log(c.lng+" "+c.lat);

	var parisKievLL = [[fc.lat, fc.lng],[c.lat,c.lng]];

	//========================================================================
	var marker1 = L.Marker.movingMarker(parisKievLL, [10000]).addTo(map);
	L.polyline(parisKievLL).addTo(map);
	marker1.once('click', function () {
	    marker1.start();
	    marker1.closePopup();
	    marker1.unbindPopup();
	    marker1.on('click', function() {
	        if (marker1.isRunning()) {
	            marker1.pause();
	        } else {
	            marker1.start();
	        }
	    });
	    setTimeout(function() {
	        marker1.bindPopup('<b>Click me to pause !</b>').openPopup();
	    }, 2000);
	});

	marker1.bindPopup('<b>Click me to start !</b>', {closeOnClick: false});
	marker1.openPopup();





};