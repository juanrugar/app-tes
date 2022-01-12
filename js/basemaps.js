

var map;  // basic Leaflet map variable declaration
var osm;         // leaflet map default basemap
var controlCapas, controlEscala; // leaflet map with controls variable declaration

function init () {      //init function
    map = L.map("map",      //map object instantation 
    {center:[39.47, -0.376389],
    zoom:9});
    
    //BASEMAP layers instantiation; leaflet providers: "https://leaflet-extras.github.io/leaflet-providers/preview/"
    
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            minZoom: 1,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"/>OpenStreetMap</a>'
        }).addTo(map);

    var OpenStreetMap_DE =
        L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"/>OpenStreetMap</a>'
        });

    var OpenStreetMap_HOT = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"/>OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank"/>Humanitarian OpenStreetMapTeam</a>'
    });

    var Stamen_Toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com"/>Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0"/>CC BY 3.0</a> &mdash; Map data &copy;<a href="http://www.openstreetmap.org/copyright"/>OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20
    });

    var Stamen_Watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com"/>Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0"/>CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright"/>OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16
    });

    var Esri_WorldStreetMap =
        L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS,Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom,2012'
    });

    var Esri_WorldTopoMap =
        L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap,iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, EsriChina (Hong Kong), and the GIS User Community'
    });

    var Esri_WorldImagery =
        L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX,GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var Esri_WorldShadedRelief =
        L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
                maxZoom: 13
    });

    var Esri_OceanBasemap =
        L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH,CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
                maxZoom: 13
    });

    //Overlays layers instantiation
     //layer caps de municipi
    var muniLim = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '1',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    });
    var muniName = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '2',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    });
    //layer comarques
    var comarLim = L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '4',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    });
    
    var comarName =
        L.tileLayer.wms('http://carto.icv.gva.es/arcgis/services/tm_otros/limites_administrativos/MapServer/WMSServer', {
        layers: '5',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    });
    
    var photoHist =
        L.tileLayer.wms('https://www.ign.es/wms/pnoa-historico?', {
        layers: 'AMS_1956-1957',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    });
    
    var ignUniAdmin =
        L.tileLayer.wms('https://www.ign.es/wms-inspire/unidades-administrativas?', {
        layers: 'Muni',
        format: 'image/png',
        transparent: true,
        attribution: 'Límits administratius: CV05 2012 CC BY 4.0 © Institut Cartogràfic Valencià, Generalitat <a href="https://catalogo.icv.gva.es/geonetwork/srv/spa/catalog.search#/metadata/spaicvMunicipiosCVIGNLimites">IDEV</a>',
    });
    
   //parameters to controlCapas
    var baseMaps = {
        "OpenStreetMap":osm,
        'OpenStreetMap_DE': OpenStreetMap_DE,
        'OpenStreetMap_HOT': OpenStreetMap_HOT,
        'Stamen_Toner': Stamen_Toner,
        'Stamen_Watercolor': Stamen_Watercolor,
        'Esri_WorldStreetMap': Esri_WorldStreetMap,
        'Esri_WorldTopoMap': Esri_WorldTopoMap,
        'Esri_WorldImagery': Esri_WorldImagery,
        'Esri_WorldShadedRelief': Esri_WorldShadedRelief,
        'Esri_OceanBasemap': Esri_OceanBasemap
    };

   var overlayMaps = {"Unitats administratives": ignUniAdmin,
                    "Fotos històriques": photoHist,
                      "Límit municipal":muniLim,
                     "Municipi":muniName,
                     "Límit comarcal":comarLim,
                     "Comarca":comarName}; 
    
    controlCapas = L.control.layers(baseMaps, overlayMaps, {collapsed:true}).addTo(map); // controlCapas = L.control.layers(baseMaps, overlayMaps, {collapsed:true}).addTo(map);

    controlEscala = L.control.scale().addTo(map);


};