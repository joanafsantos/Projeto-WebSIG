
var Map = L.map(document.getElementById('mapDIV'), {center:[41.860654, -8.116274], zoom: 10 });

var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {});

var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});

var ortofotomapa = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{ attribution:'<a href="https://www.esri.com/en-us/home"</a>©️ESRI_Imaginary' });

var baseMaps = {
    "Mapa Base - OpenStreetMap": osm,
    "Mapa Base - Curvas de Nível": baserelief,
    "Mapa Base - Satélite": ortofotomapa
};

var quedas_mgeral = L.geoJSON(quedas_mgeral, {   
    onEachFeature: function (feature, layer){
    layer.on('click', function (){document.getElementById('caixa_imgs').innerHTML='<h5>' + feature.properties.Nome + '</h5>' + '<img src ="' + feature.properties.Img + '" width= 60% height= 60% >' + '<p><strong>Coordenadas:</strong>' + feature.geometry.coordinates[1] + ' / ' + feature.geometry.coordinates[0] + '</p>' + '<p><strong>Concelho: </strong>' + feature.properties.Concelho + '</p>' + '<p><strong>Fonte:</strong>' + feature.properties.Fonte + '</p>'})}}).addTo(Map);

var pnpg = L.geoJSON(pnpg, {fillColor:"#484A1E", fillOpacity:0.5, color:"#000000", weight: 1,}).bindPopup('Parque Nacional Peneda-Gerês');pnpg.addTo(Map);

var concelhos_pnpg = L.geoJSON(concelhos_pnpg, { 
    color: 'black', weight: 1, fillColor:'black',
    onEachFeature: function(feature,layer){
        layer.bindPopup(layer.feature.properties.Concelho)
    }
}).addTo(Map);

var trilhos = L.geoJSON(trilhos, {color: 'red', weight: 2,
    onEachFeature: function(feature,layer){
        layer.bindPopup(layer.feature.properties.FolderPath)}}).addTo(Map);

var rede = L.geoJSON(rede, {color:'blue', weight: 0.5,}).bindPopup('Rede Hidrográfica').addTo(Map);

var overlays =  {//add any overlays here
    "Quedas de Água": quedas_mgeral,
    "PNPG":pnpg,
    "Concelhos": concelhos_pnpg,
    "Trilhos": trilhos,
    "Rede Hidrográfica": rede,
    //"Mapa de Calor": heatMap
};

L.control.layers(baseMaps,overlays, {position: 'topright'}).addTo(Map);

baseMaps["Mapa Base - OpenStreetMap"].addTo(Map);
