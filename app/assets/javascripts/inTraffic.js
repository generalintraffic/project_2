// Pintando el mapa Mapbox
L.mapbox.accessToken = 'pk.eyJ1IjoiamVuYWxlYnJlcmEiLCJhIjoiY2lxdGRiNjNvMDA0OGZ4bmhpem5vNW04aSJ9.KtxaiY3UMU55gYgTv-34uw';
var map = L.mapbox.map('map', 'mapbox.streets', {
  zoomControl: true
}).setView([10.488824641652126,-66.87480926513672], 14);

// Variables necesarias para la App

var c, pointB, markB = true,
    fixedMarker, count = true, 
    x = true, origin = [], 
    final = [], coord= [], 
    dataCoord, radius = [],
    aCount = 0, marker2,
    trackLayer, radioLayer, 
    radioChek = true, flag;

// iniciando APP!
init();

// Punto de origen

function init(){
  map.on('click', function(ev) {
    if (count == true && x== true) {
      origin = [ev.latlng.lat, ev.latlng.lng];

      coordinates();
      count = false;
    }
    else if ( count == false && x== true ) {
      map.removeLayer(fixedMarker)
      map.removeLayer(fixedCircle)
      origin = [ev.latlng.lat, ev.latlng.lng];
      coordinates();
    }
  });
}

// coloca el marker y el radio en el punto de origen

function coordinates(){
   fixedMarker = L.marker(new L.LatLng(origin[0],origin[1]), {
    icon: L.icon({
      iconUrl: 'assets/market.png',
      iconSize: [40, 40]
    })
  }).bindPopup('Punto de Origen').addTo(map);
  fixedCircle = L.circle(origin, 300, {color: "rgba(158, 158, 158, 0.53)"}).addTo(map)
  console.log(origin, true);
  change(origin, true);
};

// Invierte las posiciones del Array para que el API de InTraffic los reciba
// como lo esta necesitando

function change(points, Porigin = false) {
  var index = points[0];
  points[0] = points[1];
  points[1] = index;
  if (Porigin == true) {
    radioTraffic(points);
  }
};

// Ajax que obtiene el trafico del Radio

radioTraffic = (points) => {
  $.ajax({
    url:'http://localhost:3000/neighbour',
    method:"POST",
    dataType:"json",
    data: {coordinates: 
      {pointRadio: [points.toString(),'0.002']}
    },
    success: (data) => {
      if (data.error) {
        getToken(true);
      } else {
        console.log(data)
        if (radioChek == true) {
          radioLayer = L.geoJson(data, {
            style: (feature) => {
              switch (feature.properties.rt_traffic_status) {
                case 1: return {color: "#84ca50"}
                case 2: return {color: "#f07d02"}
                case 3: return {color: "#e60000"}
                case 4: return {color: "#9e1313"}
              }
            }
          }).addTo(map);
          map.fitBounds(radioLayer.getBounds());
        } else {
          map.removeLayer(radioLayer)
          radioLayer = L.geoJson(data, {
            style: (feature) => {
              switch (feature.properties.rt_traffic_status) {
                case 1: return {color: "#84ca50"}
                case 2: return {color: "#f07d02"}
                case 3: return {color: "#e60000"}
                case 4: return {color: "#9e1313"}
              }
            }
          }).addTo(map);
          map.fitBounds(radioLayer.getBounds());
        }
        radioChek = false;
      }
    },
    error: (xhr, status, err) => {  
      console.log(status, err.toString());
    }  
  });
}

// Recarga el token para su nuevo uso

getToken = (check) => {
  $.ajax({
    url:'http://localhost:3000/token.json',
    method:"get",
    dataType:"json",
    success: (data) => {
      if (check == true) {
        console.log(3);
        // routing();
      }
    },
    error: (xhr, status, err) => {  
      console.log(status, err.toString());
    }  
  });
}

// Boton para confirmar Punto A

selectedPoint();

function selectedPoint() {
  $('#continue').on('click', () => {
    if (confirm("¿Desea confirmar el punto actual?") == true) {
      text();
      x = false;
      coord.push(origin.toString());
      var container = document.getElementById('sms');
      container.innerHTML = "<p>Escoja punto destino</p>"
    }
  });
}

// Bolquea el punto A y continua para colocar el punto B

function text(){
  if(x){
    destination();
    x = false;
  }
  else if(!x){


    routing();



    var container = document.getElementById('loading');
    container.innerHTML = "<h4>Cagando su ruta</h4>";
  }
};

// Captura el punto B

function destination(){
  map.on('click', function (ev) {
    final = [ev.latlng.lat, ev.latlng.lng];
    if (markB == true) {
      pointB = L.marker([ev.latlng.lat, ev.latlng.lng]).addTo(map);
    } else {
      map.removeLayer(pointB)
      pointB = L.marker([ev.latlng.lat, ev.latlng.lng]).addTo(map);
    }
    markB = false
    end();
  });
};

// Boton para confirmar el Punto B

function end(){
  if (!count){
    $("#circulo1").append(
      $('<button>',{class:"btn btn-success ta" ,type:"button"}).html('Destino').click(function(){
        map.off("click");
        if (confirm("Destino") == true) {
           flag = L.icon({
           iconUrl: 'assets/flag.png',
           iconSize: [40, 50],
         });
          marker = L.marker(final,{icon:flag,title:'destino'}).addTo(map);

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

// Ajax para pedir la ruta que hay entre el punto A y B

routing = () => {
  $.ajax({
    url:'http://localhost:3000/pointers',
    method:"POST",
    dataType:"json",
    data: {coordinates: 
      {points: coord}
    },
    success: (data) => {
      if (data.error) {
        getToken(true);
      } else {
        printingTrack(data);
      }
    },
    error: (xhr, status, err) => {  
      console.log(status, err.toString());
    }  
  });
}

// Pintando el GeoJson en el Mapa

printingTrack = (data) => {
  trackLayer = L.geoJson(data).addTo(map);
  map.fitBounds(trackLayer.getBounds());
  if (data) {
    parsingCoord(data);
  }
}

// obeneter coordenadas del GeoJson

parsingCoord = (data) => {
  dataCoord = GeojsonCoords(data);
  for (var i in dataCoord) {
    var index = dataCoord[i][0]
    dataCoord[i][0] = dataCoord[i][1]
    dataCoord[i][1] = index
  }
  animation();
}

// Comienzo de la animacion 

animation = () => {
  marker2 = L.Marker.movingMarker(dataCoord,
      30000, {autostart: true}).addTo(map);
  radioAnimationTraffic = setInterval(() => {
    radius.push(L.circle([marker2._currentLine[0].lat, marker2._currentLine[0].lng], 300, {color: "rgba(158, 158, 158, 0.53)"}).addTo(map))
    radioAjax = [marker2._currentLine[0].lat, marker2._currentLine[0].lng]
    change(radioAjax, true)
    console.log(radius)
    if (aCount++ >= 0) {
      map.removeLayer(fixedCircle);
      reloadCircle(radius[aCount-2]);
    }
  }, 5000);
  setTimeout(() => {clearInterval(radioAnimationTraffic), console.log('end')}, 31000);
  reloadCircle = (radius) => {
    if (radius) {
      map.removeLayer(radioLayer)
      map.removeLayer(radius)
    } else {
      console.log('this not :)')
    }
  }
}

// Reiniciar la App cuando el usuario lo desee

$('#restart').on('click', () => {
  restart();
})

restart = () => {
  map.removeLayer(fixedMarker)
  map.removeLayer(marker2)
  map.removeLayer(trackLayer)
  map.removeLayer(radius[radius.length-1])
  map.removeLayer(pointB)
  map.removeLayer(radioLayer)
  map.removeLayer(flag)
  c = null, pointB = null, markB = true,
    fixedMarker = null, count = true, 
    x = true, origin = [], 
    final = [], coord= [], 
    dataCoord = null, radius = [],
    aCount = 0, marker2 = null,
    trackLayer = null, radioLayer = null,
    radioChek = true, flag = null;
  init();
}
