// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map').setView([36.173357,-120.585937], 7);

// Add base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);
// Initialize Carto
var client = new carto.Client({
  apiKey: '624f9f417b56c45f823a89da9ca8de39f32202c6',
  username: 'faroz206'
});

// Initialze source data

var source = new carto.source.SQL('SELECT *FROM cpad_2015');

// Create style for the data
var style = new carto.style.CartoCSS(`
#layer {
  polygon-fill: ramp([access_typ], (#b6ffdf, #ffc400, #ff2424, #cfcfcf), ("Open Access", "Restricted Access", "No Public Access", "Unknown Access"), "=");
  polygon-opacity: 1;
}
#layer::outline {
  line-width: 0;
  line-color: #d1d1d1;
  line-opacity: 0.5;
}  
`);

// Add style to the data
var layer = new carto.layer.Layer(source, style);

// Add the data to the map as a layer
client.addLayer(layer);
client.getLeafletLayer().addTo(map);
var accesstypeButton = document.querySelector('.accesstype-button');

accesstypeButton.addEventListener('click', function (e) {
  source.setQuery("SELECT * FROM cpad_2015 WHERE access_typ = 'Open Access'");
  
   console.log('Accesstype was clicked');
});


