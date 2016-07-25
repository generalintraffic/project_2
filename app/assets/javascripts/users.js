
// Pintando el mapa Mapbox
L.mapbox.accessToken = 'pk.eyJ1IjoiamVuYWxlYnJlcmEiLCJhIjoiY2lxdGRiNjNvMDA0OGZ4bmhpem5vNW04aSJ9.KtxaiY3UMU55gYgTv-34uw';
var map = L.mapbox.map('map', 'mapbox.streets', {
  zoomControl: true
}).setView([10.488824641652126,-66.87480926513672], 14);
  
// Pintando titulos del Mapa
var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  layer = new L.TileLayer(tileUrl,
    {
        attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
        maxZoom: 18
    });

map.addLayer(layer);

// obeneter coordenadas del GeoJson
// var geo = GeojsonCoords(routing);
// console.log(geo)

// Pintando geojson del Api 
// var countriesLayer = L.geoJson(routing).addTo(map);
// map.fitBounds(countriesLayer.getBounds());

// **** Inicio de Animacion global **** //

// Obtener punto de origen 
init();
var c, fixedMarker, count = true, x = true, coord = [];

function init(){
  
  map.on('click', function(ev) {
      if (count == true && x== true) {
        coord.push([ev.latlng.lat, ev.latlng.lng]);
        coordinates(coord);
        count = false;
      }
      else if ( count == false && x== true ) {
        map.removeLayer(fixedMarker)
        map.removeLayer(fixedCircle)
        coord.push([ev.latlng.lat, ev.latlng.lng]);
        coordinates(coord);
      }
  });
};


// coloca el marker y el radio en el punto de origen
function coordinates(coord){
  console.log('coord ' + coord);
  fixedMarker = L.marker([coord[0][0], coord[0][1]])
  .bindPopup('Punto de Origen').addTo(map);
  fixedCircle = L.circle(coord[0], 300).addTo(map)
  return fixedMarker;
};

// Botom para continuar
function myFunction() {  
  console.log(1)
  if (confirm("¿Desea confirmar el punto actual?") == true) {
    text();
    x = false;
  } else {
    init();

  }

}


// Bloquea el punto de origen
function text(){
  console.log(fixedMarker);
  var fc = fixedMarker.getLatLng();
  // Create a featureLayer that will hold a marker and linestring.
  var featureLayer = L.mapbox.featureLayer().addTo(map);
  destination(fc, featureLayer);
};



function destination(fc,featureLayer){
  // console.log(fc + ' ' + featureLayer);
  console.log('coord ' + coord);
  
    map.on('click', function(e) {
      coord.push(["-66.9067352,10.5047266", "-66.9067352,10.5047266"]);
      console.log(coord)
      // ev.latlng gives us the coordinates of
      // the spot clicked on the map.

      // c = e.latlng;
      
      // var geojson = 'a'
      // featureLayer.setGeoJSON(geojson);
      
      
      // var container = document.getElementById('distance');
      // container.innerHTML = (fc.distanceTo(c)).toFixed(0) + 'm';
      // end(fc,geojson);
  });

};

function end(fc,geojson){

  if (!count){
    $("#button-wrapper").append(
          $('<button>',{id:"input",type:"button"}).html('Final Destination').click(function(){
              if (confirm("Do you wish to continue?") == true) {
                movie(fc);
                // map.removeAttribute("onclick");
                
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
  var coord=[[10.50387,-66.90679,],[10.50504,-66.90656,],[10.50504,-66.90656,],
  [10.50562,-66.90646],[10.50582, -66.90643],[10.50596,-66.90641],[10.50631,-66.90631,],
  [10.50631,-66.90631],[10.5065,-66.90764,],[10.5065,-66.90764],[10.5067,-66.90891],
  [10.5067,-66.90891],[10.50686,-66.90889,],[10.50777,-66.90872],[10.50789,-66.90875],
  [10.50789,-66.90875],[10.5077,-66.90741],[10.5077,-66.90741],[10.50738,-66.90747],
  [10.50712,-66.90751],[10.5069,-66.90755],[10.50674,-66.90758],[10.50661,-66.9076],
  [10.5065,-66.90764]]
  var parisKievLL = coord ;

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