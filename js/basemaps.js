

var map, osm, OpenTopoMap, municipis, comarques;  // basic map variables declaration

var layerControl, scaleControl; // leaflet map with controls variable declaration

function init () {      //init function
    map = L.map("map",      //map object instantation 
    {center:[39.47, -0.376389],
    zoom:9});
    
    //BASEMAP layers instantiation; leaflet providers: "https://leaflet-extras.github.io/leaflet-providers/preview/"
    //basemap osm
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            minZoom: 1,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"/>OpenStreetMap</a>'
        }).addTo(map);
    //Topographic map
    OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
    //
   

    //Overlays layers instantiation

     //layer caps de municipi
    municipis = L.layerGroup();

    var muniLim = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '1',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    }).addTo(municipis);
    
    var muniName = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '2',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    }).addTo(municipis);

    //layer comarques
    comarques = L.layerGroup();
    var comarLim = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '4',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    }).addTo(comarques);
    
    var comarName =
        L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '5',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    }).addTo(comarques);
    
    //Historical imagery 1956-57 layer
    var photoHist =
        L.tileLayer.wms('https://www.ign.es/wms/pnoa-historico?', {
        layers: 'AMS_1956-1957',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    });
    
        
   //parameters to controlCapas
    var baseMaps = {
        "OSM bàsic":osm,
        'OSM Topogràfic': OpenTopoMap,
                      
    };

   var overlayMaps = {"Fotos històriques": photoHist,
                      "Municipis":municipis,
                     "Comarques":comarques}; 
    
    layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:true}).addTo(map); 
    
    scaleControl = L.control.scale().addTo(map);
    
};