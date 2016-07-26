// Pintando el mapa Mapbox
L.mapbox.accessToken = 'pk.eyJ1IjoiamVuYWxlYnJlcmEiLCJhIjoiY2lxdGRiNjNvMDA0OGZ4bmhpem5vNW04aSJ9.KtxaiY3UMU55gYgTv-34uw';
var map = L.mapbox.map('map', 'mapbox.streets', {
  zoomControl: true
}).setView([10.488824641652126,-66.87480926513672], 14);
  
// Pintando titulos del Mapa
// var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//   layer = new L.TileLayer(tileUrl,
//     {
//         attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
//         maxZoom: 18
//     });

// map.addLayer(layer);

// var countriesLayer = L.geoJson(routing).addTo(map);
// map.fitBounds(countriesLayer.getBounds());



// obeneter coordenadas del GeoJson
// var geo = GeojsonCoords(routing);
// for (var i in geo) {
//   var index = geo[i][0]
//   geo[i][0] = geo[i][1]
//   geo[i][1] = index
// }

// console.log(geo)
// var radius = [];

// var marker2 = L.Marker.movingMarker(geo,
//     30000, {autostart: true}).addTo(map);
// radioTraffic = setInterval(() => {
//   radius.push(L.circle([marker2._currentLine[0].lat, marker2._currentLine[0].lng], 300).addTo(map))
//   console.log(radius)
//   if (count++ >= 2) {
//     reloadCircle(radius[count-3]);
//   }
// }, 5000);
// setTimeout(() => {clearInterval(radioTraffic), console.log('end')}, 31000);

// var reloadCircle = (radius) => {
//   if (radius) {
//     map.removeLayer(radius)
//   } else {
//     console.log('error')
//   }
// }

// Pintando geojson del Api 
// var countriesLayer = L.geoJson(routing).addTo(map);
// map.fitBounds(countriesLayer.getBounds());

// **** Inicio de Animacion global **** //

// Obtener punto de origen 

init();
var c, fixedMarker, count = true, x = true, origin = [], coord= [], geojson;

function init(){
  
  map.on('click', function(ev) {
    
      if (count == true && x== true) {
        origin = [ev.latlng.lat, ev.latlng.lng];
        coordinates(origin);
        count = false;
      }
      else if ( count == false && x== true ) {
        map.removeLayer(fixedMarker)
        map.removeLayer(fixedCircle)
        origin = [ev.latlng.lat, ev.latlng.lng];
        coordinates(origin);
        
        
      }
  });
};
// coloca el marker y el radio en el punto de origen
function coordinates(){
   fixedMarker = L.marker(new L.LatLng(origin[0],origin[1]), {
    icon: L.mapbox.marker.icon({
      'marker-color': 'ff8888'
    })
  }).bindPopup('Punto de Origen').addTo(map);
  fixedCircle = L.circle(origin, 300).addTo(map)
  console.log(origin);
  return fixedMarker;
};

function myFunction() {
  
  
  if (confirm("¿Desea confirmar el punto actual?") == true) {
    text();
    x = false;
    // var b = origin[0];
    // origin[0] = origin[1];
    // origin[1] = b;
    change(origin);
    
    coord.push(origin.toString());
    console.log(coord);

  } else {
    init();

  }

}

function change(argument) {

  var index = argument[0];
  argument[0] = argument[1];
  argument[1] = index;
  return argument;
  };

function text(){
  var fc = fixedMarker.getLatLng();
  
  // Create a featureLayer that will hold a marker and linestring.
  var featureLayer = L.mapbox.featureLayer().addTo(map);
  if(x){
    
    destination(fc, featureLayer);
    console.log('si');
    x = false;
  }
  else if(!x){
    console.log('false');
    movie(fc, featureLayer);
    }
  
};

function destination(fc,featureLayer){
  console.log(fc + ' ' + featureLayer);
  
    map.on('click', function (ev) {
      // ev.latlng gives us the coordinates of
      // the spot clicked on the map.

      c = ev.latlng;
      final = [ev.latlng.lat, ev.latlng.lng];
      geojson = [
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
      end(fc,geojson,final);
  });

};

function end(fc,geojson){

  if (!count){
    $("#button-wrapper").append(
          $('<button>',{id:"input",type:"button"}).html('Final Destination').click(function(){
              map.off("click");
              if (confirm("Do you wish to continue?") == true) {
                
                change(final);
                coord.push(final.toString());
                console.log(coord);
                text();               
              } else {
                end();

              }
          })
          );
    count=true;
  }
};

function movie(fc, featureLayer){
  // var fc = fc;
  // var c = c;
  $("#map").unbind("click");

  featureLayer.setGeoJSON(geojson);
  var coord1=[[10.50387,-66.90679,],[10.50504,-66.90656,],[10.50504,-66.90656,],
  [10.50562,-66.90646],[10.50582, -66.90643],[10.50596,-66.90641],[10.50631,-66.90631,],
  [10.50631,-66.90631],[10.5065,-66.90764,],[10.5065,-66.90764],[10.5067,-66.90891],
  [10.5067,-66.90891],[10.50686,-66.90889,],[10.50777,-66.90872],[10.50789,-66.90875],
  [10.50789,-66.90875],[10.5077,-66.90741],[10.5077,-66.90741],[10.50738,-66.90747],
  [10.50712,-66.90751],[10.5069,-66.90755],[10.50674,-66.90758],[10.50661,-66.9076],
  [10.5065,-66.90764]]
  var parisKievLL = coord1 ;

  //========================================================================
  var marker1 = L.Marker.movingMarker(parisKievLL, [1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000
    ,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000]).addTo(map);
  // L.polyline(parisKievLL).addTo(map);
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
