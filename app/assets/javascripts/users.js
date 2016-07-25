require 'babel/transpiler'


L.mapbox.accessToken = 'pk.eyJ1IjoiamVuYWxlYnJlcmEiLCJhIjoiY2lxdGRiNjNvMDA0OGZ4bmhpem5vNW04aSJ9.KtxaiY3UMU55gYgTv-34uw';
var map = L.mapbox.map('map', 'mapbox.streets', {
  zoomControl: true
}).setView([40, -74.50], 9);

var routing =
 {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.90679,
            10.50387
          ],
          [
            -66.90656,
            10.50504
          ]
        ]
      },
      "properties": {
        "id": 1000004423,
        "distance": 131.8,
        "free_travel_time": 8,
        "rt_travel_time": 81.7,
        "rt_conf": 0.49,
        "rt_quality": 0.01,
        "rt_accuracy_min": 19.57,
        "rt_accuracy_max": 19.57,
        "updated_at": "2016-07-22 13:13:23-04:30",
        "speed": "5.8",
        "speed_c": "0.0",
        "cardinality": "2",
        "cardinality_c": "1",
        "direction": true
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.90656,
            10.50504
          ],
          [
            -66.90646,
            10.50562
          ],
          [
            -66.90643,
            10.50582
          ],
          [
            -66.90641,
            10.50596
          ],
          [
            -66.90631,
            10.50631
          ]
        ]
      },
      "properties": {
        "id": 1000004427,
        "distance": 143.3,
        "free_travel_time": 8.6,
        "rt_travel_time": 100.8,
        "rt_conf": 0.49,
        "rt_quality": 0.01,
        "rt_accuracy_min": 21.08,
        "rt_accuracy_max": 21.08,
        "updated_at": "2016-07-22 13:13:23-04:30",
        "speed": "4.9",
        "speed_c": "1.6",
        "cardinality": "2",
        "cardinality_c": "1",
        "direction": true
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.90631,
            10.50631
          ],
          [
            -66.90764,
            10.5065
          ]
        ]
      },
      "properties": {
        "id": 1000127521,
        "distance": 147.1,
        "free_travel_time": 8.8,
        "rt_travel_time": 65.8,
        "rt_conf": 1,
        "rt_quality": 0.08,
        "rt_accuracy_min": 30.45,
        "rt_accuracy_max": 30.45,
        "updated_at": "2016-07-22 14:20:11-04:30",
        "speed": "10.0",
        "speed_c": "17.3",
        "cardinality": "3",
        "cardinality_c": "2",
        "direction": true
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.90764,
            10.5065
          ],
          [
            -66.90891,
            10.5067
          ]
        ]
      },
      "properties": {
        "id": 1000127513,
        "distance": 140.8,
        "free_travel_time": 8.4,
        "rt_travel_time": 60.5,
        "rt_conf": 1,
        "rt_quality": 0.03,
        "rt_accuracy_min": 27.93,
        "rt_accuracy_max": 27.93,
        "updated_at": "2016-07-22 14:18:56-04:30",
        "speed": "10.4",
        "speed_c": "25.6",
        "cardinality": "5",
        "cardinality_c": "2",
        "direction": true
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.90891,
            10.5067
          ],
          [
            -66.90889,
            10.50686
          ],
          [
            -66.90872,
            10.50777
          ],
          [
            -66.90875,
            10.50789
          ]
        ]
      },
      "properties": {
        "id": 1000351350,
        "distance": 133.9,
        "free_travel_time": 8.1,
        "rt_travel_time": 297,
        "rt_conf": 1,
        "rt_quality": 0.68,
        "rt_accuracy_min": 103.44,
        "rt_accuracy_max": 103.44,
        "updated_at": "2016-07-22 14:09:26-04:30",
        "speed": "1.4",
        "speed_c": "0.0",
        "cardinality": "1",
        "cardinality_c": "1",
        "direction": true
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.90875,
            10.50789
          ],
          [
            -66.90741,
            10.5077
          ]
        ]
      },
      "properties": {
        "id": 1000153610,
        "distance": 148.2,
        "free_travel_time": 8.9,
        "rt_travel_time": 66.4,
        "rt_conf": 0.46,
        "rt_quality": 0.68,
        "rt_accuracy_min": 30.35,
        "rt_accuracy_max": 30.35,
        "updated_at": "2016-07-22 12:35:00-04:30",
        "speed": "9.9",
        "speed_c": "0.0",
        "cardinality": "1",
        "cardinality_c": "1",
        "direction": true
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.90741,
            10.5077
          ],
          [
            -66.90747,
            10.50738
          ],
          [
            -66.90751,
            10.50712
          ],
          [
            -66.90755,
            10.5069
          ],
          [
            -66.90758,
            10.50674
          ],
          [
            -66.9076,
            10.50661
          ],
          [
            -66.90764,
            10.5065
          ]
        ]
      },
      "properties": {
        "id": 1000066252,
        "distance": 135.3,
        "free_travel_time": 8.2,
        "rt_travel_time": 66.3,
        "rt_conf": 0.9,
        "rt_quality": 0.68,
        "rt_accuracy_min": 23.25,
        "rt_accuracy_max": 23.25,
        "updated_at": "2016-07-22 14:00:39-04:30",
        "speed": "8.0",
        "speed_c": "2.8",
        "cardinality": "1",
        "cardinality_c": "1",
        "direction": true
      }
    }
  ]
}
  
var geo = GeojsonCoords(routing);
console.log(geo)
var countriesLayer = L.geoJson(routing).addTo(map);
map.fitBounds(countriesLayer.getBounds());
// var animation = L.Marker.movingMarker([[-66.90679,10.50387],[-66.90656,10.50504]], 15000, {autostart: true}).addTo(map);
L.marker([-66.90679,10.50387]).addTo(map)
