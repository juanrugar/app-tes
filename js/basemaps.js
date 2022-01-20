

var map, osm, OpenTopoMap, Esri_WorldImagery, muniLim, muniName, comarLim, comarName, municipis, comarques;  // basic map variables declaration

var baseMaps, overlayMaps, layerControl, scaleControl, locateControl; // leaflet map with controls variable declaration

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
    //Imagery map
    Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
   

    //OVERLAYS layers instantiation

     //layer caps de municipi
    municipis = L.layerGroup();

    muniLim = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '1',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    }).addTo(municipis);
    
    muniName = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '2',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    }).addTo(municipis);

    //layer comarques
    comarques = L.layerGroup();

    comarLim = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '4',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    }).addTo(comarques);
    
    comarName =
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
    
        
   //parameters for layerControl
    baseMaps = {
        "OSM bàsic":osm,
        "OSM Topogràfic": OpenTopoMap,
        "Esri Satèl·lit" : Esri_WorldImagery
    };

    overlayMaps = {"Fotos històriques": photoHist,
                      "Municipis":municipis,
                     "Comarques":comarques}; 
    
    //plugins' CONTROLS
    //layer control 
    layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:true}).addTo(map); 
    //scale control
    scaleControl = L.control.scale().addTo(map);

    //geolocation plugin (https://github.com/domoritz/leaflet-locatecontrol)
    
    locateControl = L.control.locate({
        position : 'topleft',
        strings: {
            title: "La teua localització",
            popup: "Et trobes aproximadament a {distance} {unit} d'aquest punt" //Reference to control.locate options: https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/src/L.Control.Locate.js#L31

        }
    }).addTo(map); 
    
        
    //map class locate method (https://leafletjs.com/examples/mobile/#geolocation)
    /*map.locate({setView:true, watch: true, maxZoom:16}). 
   
    function onLocationFound(e) {
        var radius = e.accuracy;
        L.marker(e.latlng).addTo(map)
            .bindPopup("Et trobes aproximadament a " + radius + " metres d'aquest punt").openPopup();
    
        L.circle(e.latlng, radius).addTo(map);
    }
    
    map.on('locationfound', onLocationFound);
    
    function onLocationError(e) {
        alert(e.message);
    }
    
    map.on('locationerror', onLocationError);       */

   
};