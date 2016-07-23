var React = require('react');
var ReactDOM = require('react-dom');


import 'bootstrap/dist/css/bootstrap.css';
import './styles.scss';
import App from './components/app/App';
import calle from './components/app/calle';
L.mapbox.accessToken = 'pk.eyJ1IjoiamF2aWVyMyIsImEiOiJjaXFzcDYzZHowMnhnZm5ubndxdWo0anJoIn0.3ANHMEByhAl7OFnMlwwSrA';
 var map = L.mapbox.map('map', 'mapbox.streets').setView([38.9, -77], 12);
      
 var countriesLayer = L.geoJson(calle).addTo(map);
 map.fitBounds(countriesLayer.getBounds());

ReactDOM.render(<App map={map} />, document.getElementById('map'));
