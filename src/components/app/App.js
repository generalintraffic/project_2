
import React from "react";
import $ from "jquery";
import calle from './calle'
//Mapa de ejemplo de Mapbox





L.mapbox.accessToken = 'pk.eyJ1IjoiamF2aWVyMyIsImEiOiJjaXFzcDYzZHowMnhnZm5ubndxdWo0anJoIn0.3ANHMEByhAl7OFnMlwwSrA';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38.9, -77], 12);
    
var countriesLayer = L.geoJson(
  calle
  // {
  //   style: countriesStyle
  //   // onEachFeature: countriesOnEachFeature
  // }
).addTo(map);
map.fitBounds(countriesLayer.getBounds());





export default App;